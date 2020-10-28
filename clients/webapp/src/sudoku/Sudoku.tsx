import React, { useState, useEffect } from "react";
import { OnInputChange, useSudoku } from "./useSudoku";
import { blocksIndexs } from "./helpers";
import { Pazzle, SudokuState } from "./types";
import { getPazzle, getUserState, setUserState } from "./api";


type AvailableProps = {
  visible: number[];
  onClick: (n: number) => void;
};
const Available = ({ visible, onClick }: AvailableProps) => {
  const cels = Array(9)
    .fill(0)
    .map((_, i) => (
      <div key={i} onClick={() => onClick(i + 1)}>
        {visible.includes(i + 1) ? i + 1 : ""}
      </div>
    ));
  return <>{cels}</>;
};

type CellProps = {
  state: SudokuState;
  index: number;
};

const Cell = ({ state, index }: CellProps) => {
  const value = state.values[index];
  let className = "cell";
  if (value && value === state.selected) {
    className += " selected";
  }
  const isFixed = state.fixed.includes(index);
  if (isFixed) {
    className += " fixed";

    return <div className={className}>{value}</div>;
  }
  const visible = state.visibleOptions[index];

  if (value !== 0) {
    className += " filled";

    return (
      <div className={className} onClick={() => state.setCell(index)}>
        {value}
      </div>
    );
  }

  className += " empty";

  const onSelectOption = (n: number) => {
    if (state.selected === 0) {
      state.setVisible(index, n);
    } else {
      state.setCell(index);
    }
  };
  return (
    <div className={className}>
      <Available visible={visible} onClick={onSelectOption} />
    </div>
  );
};

type BoardProps = {
  state: SudokuState;
};
const Board = ({ state }: BoardProps) => {
  const blocks = blocksIndexs.map((block, blockI) => {
    const cells = block.map(i => {
      return <Cell key={i} index={i} state={state} />;
    });
    return (
      <div key={blockI} className="block">
        {cells}
      </div>
    );
  });
  return (
    <div className="board">
      <div className="blocks">{blocks}</div>
    </div>
  );
};
type Number = {
  count: number;
  value: number;
};
type NumberSelectionProps = {
  numbers: Number[];
  selected: number;
  select: (n: number) => void;
};
const NumberSelection = ({
  numbers = [],
  selected = 0,
  select
}: NumberSelectionProps) => {
  const buttons = numbers.map(num => {
    const { value, count } = num;
    let className = "cell";
    if (value === selected) {
      className += " selected";
    }
    return (
      <button key={value} className={className} onClick={() => select(value)}>
        {value}({count})
      </button>
    );
  });
  return <div className="numbers">{buttons}</div>;
};

function pad(num: number, size: number) {
  var s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}
type TimerProps = {
  totalSec: number;
  isRunning: boolean;
  start: () => void;
  stop: () => void;
};
const Timer = ({ totalSec, isRunning, start, stop }: TimerProps) => {
  const sec = totalSec % 60;
  const min = ~~(totalSec / 60);

  const toggle = () => {
    if (isRunning) {
      stop();
    } else {
      start();
    }
  };

  return (
    <div onClick={toggle}>
      {pad(min, 2)}:{pad(sec, 2)}
    </div>
  );
};

type SudokuProps = {
  input: number[];
  pazzleId: number;
  onChange?: OnInputChange
  onNewGame?: () => void
};
const Sudoku = (sudoku: SudokuProps) => {
  const state = useSudoku(sudoku.input, sudoku.onChange);

  return (
    <div className="sudoku">
      <Board state={state} />
      <div className="controls">
        <NumberSelection
          numbers={state.numbers}
          selected={state.selected}
          select={state.setSelected}
        />
        <button onClick={() => state.undo()}>UNDO</button>
        <Timer
          isRunning={state.timerIsRunning}
          totalSec={state.totalSec}
          start={state.startTimer}
          stop={state.stopTimer}
        />
        <div>{sudoku.pazzleId}</div>
        <button onClick={sudoku.onNewGame}>New Game</button>
      </div>
    </div>
  );
};

const SudokuWrapper = () => {
  const [pazzle, setPazzle] = useState<Pazzle>();

  useEffect(() => {
    const fn = async () => {
      const userState = await getUserState()
      if (userState.pazzles.length > 0) {
        setPazzle(userState.current);
      } else {
        const pazzle = await getPazzle();
        await setUserState(pazzle)
        setPazzle(pazzle);
      }

    }
    fn();
  }, [])

  const onChange = async (input: number[]) => {
    if (!pazzle) return;
    await setUserState({ pazzleId: pazzle.pazzleId, input })
    console.log('userstate saved');
  }

  const onNewGame = async () => {
    setPazzle(undefined);
    const p = await getPazzle();
    await setUserState(p)
    setPazzle(p);
  }

  return pazzle ? (
    <Sudoku input={pazzle.input}
      pazzleId={pazzle.pazzleId}
      onChange={(a) => onChange(a)}
      onNewGame={onNewGame} />
  ) : (
      <div>loading</div>
    );
};

export default SudokuWrapper;
