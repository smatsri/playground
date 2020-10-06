import React from "react";
import useSevenBoom from "./useSevenBoom";

export default function SevenBoom() {
  const game = useSevenBoom();

  return (
    <div>
      <div>
        <div>Score: {game.score}</div>
        <div>Fails: {game.numFailed}</div>
      </div>
      {game.gameOver ? (
        <div onClick={() => game.restart()}>game over</div>
      ) : (
        <div onClick={() => game.boom()}>{game.currnetNum}</div>
      )}
    </div>
  );
}
