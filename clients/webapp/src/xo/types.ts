export type Player = "X" | "O";
export type CellState = "Empty" | Player;
export type GameResult = "NoResult" | "Tie" | Player;
export interface IXO {
  board: CellState[];
  currentPlayer: Player;
  setCell(index: number): void;
  gameOver: boolean;
  result: GameResult;
}
