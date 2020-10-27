import { useEffect, useState, useRef } from "react";

import { getAvailable } from "./helpers";
import { SudokuState, Num } from "./types";
import { Stopwatch } from "./stopwatch";

const defaultAvailable = Array(81)
  .fill(0)
  .map(_ =>
    Array(81)
      .fill(0)
      .map((_, i) => i + 1)
  );


export type OnInputChange = (input: number[]) => void

export function useSudoku(input: number[], onChange?: OnInputChange): SudokuState {
  const SW = useRef(Stopwatch());
  const [states, setStates] = useState<Partial<SudokuState>[]>([]);
  const [values, setValues] = useState(input);
  const [selected, setSelected] = useState(0);
  const [fixed, setFixed] = useState<number[]>([]);
  const [numbers, setNumbers] = useState<Num[]>([]);
  const [available, setAvailable] = useState<number[][]>(defaultAvailable);

  const [visibleOptions, setVisibleOptions] = useState<number[][]>(
    defaultAvailable
  );
  const [totalSec, setTotalSec] = useState(0);
  const [timerIsRunning, setTimerIsRunning] = useState(false);

  useEffect(() => {
    SW.current.start();
    setTimerIsRunning(true);
    let dispose = SW.current.subscribe(tic => {
      setTotalSec(tic);
    });

    const stop = () => {
      dispose();
      SW.current.stop();
    }
    return stop;
  }, []);

  useEffect(() => {
    const f = input
      .map((a, i) => [a, i])
      .filter(([a]) => !!a)
      .map(([_, i]) => i);
    setFixed(f);
  }, [input, onChange]);

  useEffect(() => {
    const nums = Array(9)
      .fill(0)
      .map((_, i) => {
        const value = i + 1;
        const count = 9 - values.filter(a => a === value).length;
        return {
          value,
          count
        };
      });
    setNumbers(nums);
    let available_ = [];
    for (let i = 0; i < 81; i++) {
      available_[i] = getAvailable(values, i);
    }
    setAvailable(available_);
  }, [values]);

  useEffect(() => {
    let visible_ = [...visibleOptions].map((a, cId) =>
      a.filter(n => available[cId].includes(n))
    );
    setVisibleOptions(visible_);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [available]);

  const saveState = () => {
    let states_ = [...states];
    states_.push({ values, visibleOptions });
    setStates(states_);
  };

  return {
    values,
    selected,
    fixed,
    numbers,
    visibleOptions,
    totalSec,
    timerIsRunning,
    setCell(index) {
      if (selected && available[index].includes(selected)) {
        const newValues = [...values];
        newValues[index] = selected;
        setValues(newValues);
        saveState();
        if (onChange)
          onChange(newValues);
      }
    },
    setVisible(index, value) {
      let visibleOptions_ = [...visibleOptions].map(a => [...a]);
      let visible_ = visibleOptions_[index];
      if (visible_.includes(value)) {
        let index = visible_.indexOf(value);
        if (index !== -1) {
          visible_.splice(index, 1);
        }
      } else {
        visible_.push(value);
      }

      setVisibleOptions(visibleOptions_);
      saveState();
    },
    setSelected(num) {
      num = num === selected ? 0 : num;
      setSelected(num);
    },
    undo() {
      let _states = [...states];
      let state = _states.pop();
      if (state) {
        if (state.values) {
          setValues(state.values);
        }
        if (state.visibleOptions) {
          setVisibleOptions(state.visibleOptions);
        }
      }

      setStates(_states);
    },
    startTimer() {
      SW.current.start();
      setTimerIsRunning(true);
    },
    stopTimer() {
      SW.current.stop();
      setTimerIsRunning(false);
    }
  };
}
