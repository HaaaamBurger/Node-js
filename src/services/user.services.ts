import mongoose from "mongoose";

import { IUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";
import { UserValidator } from "../validators/user.validator";

class UserServices {
  public async getUsers(): Promise<IUser[]> {
    return await User.find();
  }
  public async postUser(user: IUser): Promise<void> {
    const { value, error } = UserValidator.create.validate(user);
    if (error) {
      throw new Error(error.message);
    }
    await User.create(value);
  }
  public async deleteById(id: string) {
    if (!mongoose.isObjectIdOrHexString(id)) {
      throw new Error("Not valid ID");
    }
    const findUser = User.findById(id);
    if (!findUser) {
      throw new Error("No such a user!");
    }
    await User.deleteOne({ _id: id });
  }
  public async updateUser(id: string, updateUser: IUser) {
    if (!mongoose.isObjectIdOrHexString(id)) {
      throw new Error("Not valid ID");
    }
    const { error, value } = UserValidator.update.validate(updateUser);
    if (error) {
      throw new Error(error.message);
    }
    const user = await User.findByIdAndUpdate(id, value, {
      returnDocument: "after",
    });
    if (!user) {
      throw new Error("No such a user!");
    }
  }
}

export const userServices = new UserServices();
