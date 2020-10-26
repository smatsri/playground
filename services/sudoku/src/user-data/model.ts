export interface Pazzle {
  input: number[]
  lastUpdate: Date
  pazzleId: number
}

export interface UserData {
  username: string
  pazzles: Pazzle[]
}

export const emptyState: UserData = {
  username: "guest",
  pazzles: []
}

export const addPazzle = (doc: UserData, pazzle: Pazzle) => {
  const pazzles = (doc.pazzles || [])
  pazzles.push(pazzle)
  doc.pazzles = pazzles;
}
