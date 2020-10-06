import { useState, useEffect } from "react";
import { IXO, CellState, Player, GameResult } from "./types";
import { getNextPlayer, getResult } from "./utils";

export default function useXO(): IXO {
  const [board, setBoard] = useState<CellState[]>(() => Array(9).fill("Empty"));
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [result, setResult] = useState<GameResult>("NoResult");

  useEffect(() => {
    let newResult = getResult(board);
    setResult(newResult);
  }, [board]);

  useEffect(() => {
    if (result !== "NoResult") {
      setGameOver(true);
    }
  }, [result]);

  return {
    board,
    gameOver,
    result,
    currentPlayer,
    setCell(index) {
      if (gameOver || board[index] !== "Empty") {
        return;
      }
      let newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);

      let nextPlayer = getNextPlayer(currentPlayer);
      setCurrentPlayer(nextPlayer);
    }
  };
}
