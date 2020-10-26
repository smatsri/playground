import { model, Schema, Document } from "mongoose";
import { savePazzle as updatePazzle, emptyState, Pazzle, UserData } from "./model";

type UserDoc = Document & UserData

const UserDataSchema = new Schema({
  username: String,
  pazzles: [{
    input: [Number],
    lastUpdate: Date,
    pazzleId: Number
  }]
});
const UserData = model<UserDoc>('user-data', UserDataSchema, "user-data");

export const getUserStateDoc = async (username: string) => {
  const exists = await UserData.exists({ username })
  if (exists) {
    return await UserData.findOne({ username }).exec();
  } else {
    return await UserData.create(emptyState(username));
  }
}

export const savePazzle = async (username: string, pazzle: Pazzle) => {
  const doc = await getUserStateDoc(username);
  updatePazzle(doc, pazzle)
  await doc.save();
}

export const getUserState = async (username: string) => {
  const doc = await getUserStateDoc(username);
  return {
    username: doc.username,
    pazzles: doc.pazzles
  }
}

