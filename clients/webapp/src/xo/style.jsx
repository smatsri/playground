import styled from "styled-components";

export default styled.div`
  .xo {
    width: 300px;
  }

  .xo > div {
    flex-basis: 25%;
    flex-grow: 0;
  }

  .board {
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2px;
    background-color: black;
    width: 300px;
    height: 300px;
  }

  .board > div {
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 4em;
  }

  .players {
    margin-top: 20px;
    display: flex;
    justify-content: space-evenly;
  }
  .players .selected {
    font-weight: bold;
    color: red;
    font-size: 3em;
  }
`;
