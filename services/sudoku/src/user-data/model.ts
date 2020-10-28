export interface UserPazzle {
  input: number[]
  lastUpdate: Date
  pazzleId: number
  username: string
}

export interface UserData {
  username: string
  pazzles: number[]
  currentPazzleId?: number
}

export const emptyState = (username: string): UserData => ({
  username,
  pazzles: [],
})

export const addPazzleId = (user: UserData, pazzleId: number) => {
  const exists = user.pazzles.includes(pazzleId);
  if (!exists) {
    user.pazzles.push(pazzleId);
  }
}
// export const savePazzle = (doc: UserData, pazzle: Pazzle) => {
//   const pazzles = (doc.pazzles || [])

//   const index = doc.pazzles.findIndex(p => p.pazzleId === pazzle.pazzleId);
//   if (index > -1) {
//     pazzles[index] = pazzle;
//   } else {
//     pazzles.push(pazzle)
//   }

//   doc.pazzles = pazzles;
// }
