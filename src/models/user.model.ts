import { model, Schema } from "mongoose";

import { IUser } from "../interfaces/user.interface";

const userModel = new Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
  },
  {
    versionKey: false,
  },
);

export const User = model<IUser>("user", userModel);
