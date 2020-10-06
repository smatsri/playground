export type Num = {
  value: number;
  count: number;
};

export type SudokuState = {
  values: number[];
  fixed: number[];
  selected: number;
  numbers: Num[];
  visibleOptions: number[][];
  totalSec: number;
  timerIsRunning: boolean;
  setCell: (index: number) => void;
  setSelected: (n: number) => void;
  setVisible: (index: number, n: number) => void;
  undo: () => void;
  stopTimer: () => void;
  startTimer: () => void;
};

export type OnTick = (totalSec: number) => void;
export type Dispose = () => void;
export type Stopwatch = {
  start: () => void;
  stop: () => void;
  reset: () => void;
  subscribe: (onTick: OnTick) => Dispose;
};

export type StatItem = {
  time: number;
  values: number[];
};
