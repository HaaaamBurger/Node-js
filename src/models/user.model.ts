import { model, Schema } from "mongoose";

import { EGender } from "../enums/gender.enum";

const userSchema = new Schema({
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
    enum: EGender,
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
});

export const User = model("user", userSchema);
