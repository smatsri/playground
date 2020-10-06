declare module "MyTypes" {
  export interface Person {
    name: string;
    age: number;
    getName(): string;
  }
}

declare module "PG" {
  export type ITimer = {
    totalSec: number;
    isRunning: boolean;
    stop(): void;
    start(): void;
    reset(): void;
  };

  export interface IStopwatch {
    start;
    stop;
    reset;
    subscribe;
  }
  export type Player = "X" | "O";
  export type CellState = "Empty" | Player;
  export type GameResult = "NoResult" | "Tie" | Player;
  export interface IXO {
    board: CellState[];
    currentPlayer: Player;
    setCell(index: number);
    gameOver: boolean;
    result: GameResult;
  }
}
