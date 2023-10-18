import { Document, Types } from "mongoose";

import { IUser } from "./user.interface";

export interface IToken {
  accessToken: string;
  refreshToken: string;
}

export interface ITokenPayload {
  _userId: Types.ObjectId;
}

export interface ITokenDB extends Document {
  accessToken: string;
  refreshToken: string;
  _userId: Types.ObjectId | IUser;
}
