import joi from "joi";

export class CarValidation {
  static create = joi.object({
    brand: joi.string().min(2).max(12).trim().required(),
    price: joi.number().min(0).max(1000000).required(),
    year: joi.number().min(1990).max(new Date().getFullYear()).required(),
  });
}
