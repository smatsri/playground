import { model, Schema, Document } from "mongoose";
import { addPazzle, emptyState, Pazzle, UserData } from "./model";

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

export const savePazzle = async (username: string, pazzle: Pazzle) => {
  const exists = await UserData.exists({ username })
  if (exists) {
    const doc = await UserData.findOne({ username }).exec();
    addPazzle(doc, pazzle)
    await doc.save();
  } else {
    await UserData.create(emptyState);
  }
}

export const getUserState = async (username: string): Promise<UserData> => {
  const doc = await UserData.findOne({ username }).exec();
  if (doc) {
    return {
      pazzles: doc.pazzles,
      username
    }
  }

  return emptyState
}