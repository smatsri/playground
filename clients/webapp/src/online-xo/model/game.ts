export type GameWasReset = {
  type: "GameWasReset"
}

export type PlayerJoined = {
  type: "PlayerJoined"
}

export type GameEvent = GameWasReset | PlayerJoined