import joi from "joi";

import { regexConstants } from "../constants/regex.constants";
import { EGender } from "../enums/gender.enum";
export class UserValidator {
  static firstName = joi.string().min(2).max(12).trim();
  static age = joi.number().min(18).max(99);
  static gender = joi.valid(...Object.values(EGender));
  static email = joi.string().regex(regexConstants.EMAIL).trim().required();
  static password = joi
    .string()
    .regex(regexConstants.PASSWORD)
    .trim()
    .required();
  static update = joi.object({
    name: this.firstName,
    age: this.age,
    gender: this.gender,
  });

  static create = joi.object({
    name: this.firstName.required(),
    age: this.age.required(),
    gender: this.gender,
    email: this.email,
    password: this.password,
  });
}
