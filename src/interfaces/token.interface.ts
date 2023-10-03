import { Types } from "mongoose";

export interface ITokenPayload {
  userId: Types.ObjectId;
}
export interface ITokenPair {
  accessToken: string;
  refreshToken: string;
}
