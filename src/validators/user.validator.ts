import joi from "joi";

import { EGender } from "../enums/gender.enum";
export class UserValidator {
  static update = joi.object({
    name: joi.string().min(2).max(12).trim(),
    age: joi.number().min(18).max(99),
    gender: joi.valid(...Object.values(EGender)),
  });
}
