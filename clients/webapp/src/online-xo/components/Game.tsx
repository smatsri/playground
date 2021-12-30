import React, { useEffect } from "react"
import * as hub from "../services/hub"

type GameProps = {
  gameId: number
}
const Game = ({ gameId }: GameProps) => {

  useEffect(() => {
    const sub = hub.events.subscribe(e => {
      switch (e.type) {
        case "GameWasReset":
          break;
      }
    });

    hub.start(gameId).then(() => {
      hub.getGame(gameId).then(a => {
        console.log(a);
      });
    })



    return () => {
      sub.unsubscribe();
    }
  }, [])

  const onJoin = () => {
    hub.join(gameId, 1)
  }

  const onReset = () => {
    hub.reset(gameId)
  }



  return (
    <div>
      <div>Game</div>
      <div>
        <button type="button" onClick={onReset}>Reset</button>
        <button type="button" onClick={onJoin}>Join</button>
      </div>
    </div>
  )

}

export default Game;