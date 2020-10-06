import { useState, useEffect } from "react";
import useTimer from "../hooks/useTimer";

export default function useSevenBoom() {
  const [score, setScore] = useState(0);
  const [numFailed, setNumFails] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const timer = useTimer();

  useEffect(() => {
    if (numFailed === 3) {
      timer.stop();
      setGameOver(true);
    }
  }, [numFailed, timer]);

  return {
    score,
    currnetNum: timer.totalSec,
    numFailed,
    gameOver,
    boom() {
      if (timer.totalSec % 7 === 0) {
        setScore(score + 1);
      } else {
        setNumFails(numFailed + 1);
      }
    },
    restart() {
      setScore(0);
      setNumFails(0);
      setGameOver(false);
      timer.reset();
      timer.start();
    }
  };
}
