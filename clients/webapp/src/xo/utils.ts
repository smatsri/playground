import { CellState, Player, GameResult } from "PG";

const winners = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const all = (arr: any[], value: any) =>
  arr.reduce((b, a) => b && a === value, true);

const isWinner = (board: CellState[], player: Player) => {
  return winners.reduce((b, idx) => {
    let values = idx.map(i => board[i]);
    b = b || all(values, player);
    return b;
  }, false);
};

const isTie = (board: CellState[]) => {
  return board.reduce((b, cell) => b && cell !== "Empty", true);
};

export const getResult = (board: CellState[]): GameResult => {
  if (isWinner(board, "X")) {
    return "X";
  }

  if (isWinner(board, "O")) {
    return "O";
  }

  if (isTie(board)) {
    return "Tie";
  }

  return "NoResult";
};

export const getNextPlayer = (player: Player): Player =>
  player === "X" ? "O" : "X";
