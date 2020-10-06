import React from "react";
import Style from "./style";
import useXO from "./useXO";

const XO = () => {
  let xo = useXO();
  const status = xo.gameOver
    ? xo.result === "Tie"
      ? "Tie"
      : "Winner " + xo.result
    : "";
  return (
    <div className="xo">
      <div className="board">
        {xo.board.map((c, i) => (
          <div key={i} onClick={() => xo.setCell(i)}>
            {c === "Empty" ? "" : c}
          </div>
        ))}
      </div>
      {!xo.gameOver && (
        <div className="players">
          {["X", "O"].map(p => (
            <div key={p} className={p === xo.currentPlayer ? "selected" : ""}>
              {p}
            </div>
          ))}
        </div>
      )}
      <div>{status}</div>
    </div>
  );
};

export default function StyledXO() {
  return (
    <Style>
      <XO />
    </Style>
  );
}
