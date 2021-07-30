using System;
using System.Linq;
using System.Collections.Immutable;
using System.Collections.Generic;

namespace OnlineXO.Core.Login
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
	public record WonByPlayer(Player Player, int[] cells) : GameResult;


	public abstract record GameState;
	public record Pending : GameState;
	public record Running(
		Player CurentPlayer,
		CellState[] Board
	) : GameState;

	public record CompletedGame(GameResult Result) : GameState;

	public abstract record Command;

	public record Start : Command;
	public record SetCell(int Index) : Command;

	public static class Game
	{
		public static readonly GameState Empty = new Pending();
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



		public static GameState Apply(this GameState state, Command command) => (state, command) switch
		{
			(Pending, Start) => new Running(Player.X, EmptyBoard),
			(Running r, SetCell c) => r.SetCell(c.Index),
			_ => state,
		};

		static GameState SetCell(this Running state, int index)
		{

			var cell = state.Board[index];
			if (cell is Occupied)
				return state;

			var board = state.Board[..];
			board[index] = new Occupied(state.CurentPlayer);

			var res = GetGameResult(board);
			return res != null 
				? new CompletedGame(res) 
				: new Running(state.CurentPlayer.Next(), state.Board);
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
