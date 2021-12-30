using Microsoft.AspNetCore.SignalR;
using OnlineXO.Core;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading.Tasks;
using System.Collections.Concurrent;
using System.Text.Json;
using System.Linq;

namespace OnlineXO.Hubs.Hubs
{
	public class GameHub : Hub
	{
		static readonly ConcurrentDictionary<int, GameState> games = new();

		public GameHub()
		{
			Debug.WriteLine("GameHub created");
		}

		public Core.GameState Get(int gameId)
		{
			var game = GetGame(gameId);
			return game.State;
		}

		public async Task Subscribe(int gameId)
		{
			var game = GetGame(gameId);
			await Groups.AddToGroupAsync(Context.ConnectionId, game.Name);
		}

		public Task Join(int gameId, Player player) => HandleRequest(gameId, 
			game => game.Join(Context.ConnectionId, player)
		);

		public Task Reset(int gameId) => HandleRequest(gameId, (state) =>
		{
			return state.Reset();
		});

		async Task HandleRequest(int gameId, Func<GameState, IEnumerable<Event>> handle)
		{
			var game = GetGame(gameId);
			var events = handle(game).ToArray();
			var g = Clients.Group(game.Name);
			foreach (var evt in events)
			{
				var gameEvt = evt.ToGameEvent();
				await g.SendAsync("onEvent", gameEvt);
			}
			if (events.Length > 0)
			{
				await g.SendAsync("onEvent", new StateChanged(game.State));
			}
			
		}

		void RemoveGame(int gameId) => games.Remove(gameId, out _);
		void UpdateGame(int gameId, GameState state) => games.AddOrUpdate(gameId, state, (a, b) => state);
		GameState GetGame(int gameId) => games.GetOrAdd(gameId, _ => new GameState(gameId));
	}

	public class GameState
	{
		readonly Dictionary<string, Player> players;

		public GameState(int id)
		{
			State = Game.Empty();
			players = new Dictionary<string, Player>();
			Id = id;
			Name = "game-" + id;
		}

		public string Name { get; }
		public int Id { get; }
		public Core.GameState State { get; private set; }
		public IReadOnlyDictionary<string, Player> Players => players;

		public IEnumerable<Event> Join(string playerId, Player player)
		{
			if (players.ContainsKey(playerId) || players.ContainsValue(player))
			{
				throw new InvalidOperationException("");
			}
			players[playerId] = player;

			return Apply(new Join(player));
		}

		public IEnumerable<Event> Reset()
		{
			players.Clear();
			return Apply(new Reset());
		}

		IEnumerable<Event> Apply(Command command)
		{
			var (newState, events) = State.Apply(command);
			State = newState;
			return events.ToArray();
		}
	}


	public record StateChanged(Core.GameState state) : Event;

	public record GameEvent(string Type, object Data);

	public static class GameEventExt
	{
		public static GameEvent ToGameEvent<T>(this T e)
		{
			var type = e.GetType().Name;
			return new GameEvent(type, e);
		}
	}
}
