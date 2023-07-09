import { Schema, model, Document } from 'mongoose';
import jwt from 'jsonwebtoken';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  generateAuthToken: (userId: string) => string;
}

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.methods.generateAuthToken = function (userId: string) {
  const token = jwt.sign({ userId: userId }, process.env.JWT_SCRET);
  return token;
};

const User = model<IUser>('User', userSchema);

export default User;
