import { Types } from "mongoose";

export interface IUser {
  email: string;
  password: string;
}

export interface ILoginUser extends Document {
  userId: Types.ObjectId;
  email: string;
  password: string;
}
