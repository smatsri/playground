import { model, Schema } from "mongoose";

const PazzleSchema = new Schema({
  input: [Number],
  title: String,
  pazzleId: Number
});
const Pazzle = model('pazzles', PazzleSchema, "pazzles");

export const getPazzleById = async (id: any) => {
  const doc = await Pazzle.findOne({ pazzleId: +id }).exec();
  const model = doc.toObject();
  delete model._id;
  delete model.__v;
  return model;
}

export const savePazzle = async (pazzle: any) => {
  const exists = await Pazzle.exists({ pazzleId: +pazzle.id });
  if (!exists) {
    var doc = { ...pazzle, pazzleId: pazzle.id };
    await Pazzle.create(doc);
  }
}