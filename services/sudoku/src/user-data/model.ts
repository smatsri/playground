export interface Pazzle {
  input: number[]
  lastUpdate: Date
  pazzleId: number
}

export interface UserData {
  username: string
  pazzles: Pazzle[]
}

export const emptyState = (username: string): UserData => ({
  username,
  pazzles: []
})

export const savePazzle = (doc: UserData, pazzle: Pazzle) => {
  const pazzles = (doc.pazzles || [])

  const index = doc.pazzles.findIndex(p => p.pazzleId === pazzle.pazzleId);
  if (index > -1) {
    pazzles[index] = pazzle;
  } else {
    pazzles.push(pazzle)
  }

  doc.pazzles = pazzles;
}
