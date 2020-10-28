import { model, Schema, Document } from "mongoose";
import { emptyState, addPazzleId, UserPazzle, UserData } from "./model";

type UserDoc = Document & UserData

type PazzleDoc = Document & UserPazzle

const PazzleDocSchema = new Schema({
  input: [Number],
  lastUpdate: Date,
  pazzleId: Number,
  username: String
})
const PazzleDoc = model<PazzleDoc>('user-pazzle', PazzleDocSchema, "user-pazzle");

const UserDataSchema = new Schema({
  username: String,
  pazzles: [Number],
  currentPazzleId: Schema.Types.ObjectId
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

export const savePazzle = async (pazzle: UserPazzle) => {
  const doc = await getUserStateDoc(pazzle.username);
  const pazzleDoc = await updatePazzle(pazzle)
  doc.currentPazzleId = pazzleDoc._id;
  addPazzleId(doc, pazzle.pazzleId);
  await doc.save();

}

export const getUserState = async (username: string) => {
  const doc = await getUserStateDoc(username);
  let current: any = null;
  if (doc.currentPazzleId) {
    var currentDoc = await PazzleDoc.findById(doc.currentPazzleId)
    current = {
      input: currentDoc.input,
      pazzleId: currentDoc.pazzleId
    }
  }

  return {
    current,
    pazzles: doc.pazzles
  }
}

const updatePazzle = async (pazzle: UserPazzle) => {
  const exists = await PazzleDoc.exists({ username: pazzle.username, pazzleId: pazzle.pazzleId })
  if (exists) {
    const doc = await PazzleDoc.findOne({ username: pazzle.username, pazzleId: pazzle.pazzleId }).exec();
    await doc.update(pazzle);
    return doc;
  } else {
    return await PazzleDoc.create(pazzle);
  }
}

