import mongoose from "mongoose";

import { IUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";
import { UserValidator } from "../validators/user.validator";

class UserServices {
  public async getUsers(): Promise<IUser[]> {
    return await User.find();
  }
  public async postUser(user: IUser): Promise<void> {
    await User.create(user);
  }
  public async deleteById(id: string) {
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
