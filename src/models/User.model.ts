import { model, Schema } from "mongoose";

import { EGenders } from "../enums/gender.enum";

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    age: {
      type: Number,
      min: [1, "Age minimum 1"],
      max: [199, "Maximum age 199"],
    },
    genders: {
      type: String,
      enum: EGenders,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const User = model("user", userSchema);
