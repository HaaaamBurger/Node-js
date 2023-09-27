import { model, Schema } from "mongoose";

import { EGenders } from "../enums/gender.enum";

const userScheme = new Schema({
  name: {
    type: String,
  },
  age: {
    type: Number,
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
    type: "String",
    require: true,
  },
});

export const User = model("user", userScheme);
