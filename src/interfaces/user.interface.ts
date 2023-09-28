import { Document } from "mongoose";

import { EGender } from "../enums/gender.enum";

export interface IUser extends Document {
  name?: string;
  age?: number;
  gender?: EGender;
  email: string;
  password: string;
}
