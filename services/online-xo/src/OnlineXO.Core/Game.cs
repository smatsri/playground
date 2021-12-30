using System.Linq;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace OnlineXO.Core
{
	public enum Player
	{
		X = 0, O = 1
	}

	public abstract record CellState;
	public record EmptyCell : CellState;
	public record Occupied(Player Player) : CellState;

	public abstract record GameResult;
	public record Tie : GameResult;
	public record WonByPlayer(Player Player, int[] Cells) : GameResult;


	public abstract record GameState;

	public record Pending(HashSet<Player> Players) : GameState;
	public record Running(
		Player CurentPlayer,
		CellState[] Board
	) : GameState;

	public record CompletedGame(GameResult Result) : GameState;

	public abstract record Command;
	public record Join(Player Player) : Command;
	public record SetCell(int Index) : Command;
	public record Reset : Command;

	public abstract record Event;
	public record Joined(Player Player) : Event;
	public record GameStarted() : Event;
	public record WaitingOn(Player Player) : Event;
	public record CellSet(int Index, Player Player) : Event;
	public record GameCompleted(GameResult Result) : Event;
	public record GameWasReset : Event;

	public static class Game
	{
		public static GameState Empty() => new Pending(new HashSet<Player>());
		private static readonly EmptyCell[] EmptyBoard = Enumerable.Range(0, 9).Select(a => new EmptyCell()).ToArray();

		private static readonly HashSet<int>[] Winners =
			new int[][]
			{
				new int[] { 0, 1, 2 },
				new int[] { 3, 4, 5 },
				new int[] { 6, 7, 8 },
				new int[] { 0, 3, 6 },
				new int[] { 1, 4, 7 },
				new int[] { 2, 5, 8 },
				new int[] { 0, 4, 8 },
				new int[] { 2, 4, 6 },
			}
			.Select(a => new HashSet<int>(a))
			.ToArray();



		public static (GameState, ICollection<Event>) Apply(
			this GameState state,
			Command command)
		{
			var events = new List<Event>();
			var nextStte = GetState(state, command, events);
			return (nextStte, events);

			static GameState GetState(GameState state, Command command, List<Event> events) =>
				(state, command) switch
				{
					(Pending p, Join j) => p.Join(j, events),
					(Running r, SetCell c) => r.SetCell(c.Index, events),
					(GameState s, Reset _) => s.Reset(events),
					_ => state,
				};
		}

		static GameState Join(this Pending pending, Join join, ICollection<Event> events)
		{
			if (pending.Players.Contains(join.Player))
				return pending;

			pending.Players.Add(join.Player);
			events.Add(new Joined(join.Player));

			if (pending.Players.Count == 1)
				return new Pending(pending.Players);

			events.Add(new GameStarted());

			return new Running(Player.X, EmptyBoard);

		}

		static GameState SetCell(
			this Running state,
			int index,
			ICollection<Event> events)
		{
			var cell = state.Board[index];
			if (cell is Occupied)
				return state;

			var board = state.Board[..];
			board[index] = new Occupied(state.CurentPlayer);
			events.Add(new CellSet(index, state.CurentPlayer));

			var res = GetGameResult(board);

			if (res != null)
			{
				events.Add(new GameCompleted(res));
				return new CompletedGame(res);
			}
			else
			{

				return new Running(state.CurentPlayer.Next(), state.Board);
			}

		}

		static GameState Reset(this GameState gameState,
			ICollection<Event> events)
		{
			events.Add(new GameWasReset());
			return Empty();

		}

		static Player Next(this Player p) => p switch
		{
			Player.X => Player.O,
			Player.O => Player.X,
			_ => Player.X,
		};

		static GameResult GetGameResult(CellState[] board)
		{
			var occupied = new Dictionary<Player, HashSet<int>>()
			{
				{Player.X, new HashSet<int>() },
				{Player.O, new HashSet<int>() }
			};
			var numEmpty = 0;

			for (int i = 0; i < board.Length; i++)
			{
				if (board[i] is Occupied o)
				{
					var set = occupied[o.Player];
					set.Add(i);
				}
				else
				{
					numEmpty++;
				}
			}

			if (numEmpty == 0)
			{
				return new Tie();
			}

			foreach (var player in occupied.Keys)
			{
				if (IsWinner(occupied[player]))
				{
					var cells = occupied[player].ToArray();
					return new WonByPlayer(player, cells);
				}
			}


			return null;
		}

		static bool IsWinner(HashSet<int> indexs) => Winners.Any(a => a.IsProperSubsetOf(indexs));

	}

}
