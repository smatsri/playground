import { useState } from "react";
import useInterval from "./useInterval";
export type Timer = {
  totalSec: number;
  isRunning: boolean;
  stop(): void;
  start(): void;
  reset(): void;
};

export default function useTimer(start = 0): Timer {
  const [totalSec, setTotalSec] = useState(start);
  const [delay, setDelay] = useState<number | null>(1000);

  useInterval(() => {
    setTotalSec(totalSec + 1);
  }, delay);

  return {
    totalSec,
    isRunning: delay !== null,
    stop() {
      setDelay(null);
    },
    start() {
      setDelay(1000);
    },
    reset() {
      setTotalSec(0);
    }
  };
}
