import { model, Schema } from "mongoose";

const carModel = new Schema(
  {
    brand: {
      type: String,
    },
    price: {
      type: Number,
    },
    year: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

export const Car = model("car", carModel);
