import joi from "joi";

import { regexpConstants } from "../constants/regexp.constants";
import { EGenders } from "../enums/gender.enum";

export class UserValidator {
  static firstName = joi.string().min(2).max(12).trim();
  static age = joi.number().min(18).max(121);
  static genders = joi.valid(...Object.values(EGenders));
  static email = joi.string().regex(regexpConstants.email);
  static password = joi
    .string()
    .regex(regexpConstants.password)
    .trim()
    .required();

  static create = joi.object({
    name: this.firstName.required(),
    age: this.age.required(),
    genders: this.genders.required(),
    email: this.email.required(),
    password: this.password.required(),
  });
  static update = joi.object({
    name: this.firstName,
    age: this.age,
    genders: this.genders,
  });
}
