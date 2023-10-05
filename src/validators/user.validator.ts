import joi from "joi";
export class UserValidator {
  static email = joi
    .string()
    .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    .required();
  static password = joi
    .string()
    .regex(/^(?=.*[\d])(?=.*[!@#$%^&*])[\w!@#$%^&*]{6,16}$/)
    .required();

  static register = joi.object({
    email: this.email,
    password: this.password,
  });
}
