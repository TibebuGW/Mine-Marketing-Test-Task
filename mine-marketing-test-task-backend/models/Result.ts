import { Schema, model, Document, ObjectId } from "mongoose";

export interface IResult extends Document {
  userEmail: string;
  phoneCode: string;
  capitalCity: string;
  code: string;
  currencyCode: string[];
  name: string;
}

const resultSchema = new Schema<IResult>(
  {
    userEmail: { type: String, required: true },
    code: { type: String, required: true },
    phoneCode: { type: String, required: true },
    capitalCity: { type: String, required: true },
    currencyCode: { type: [String], required: true },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

const Result = model<IResult>('Result', resultSchema);

export default Result;