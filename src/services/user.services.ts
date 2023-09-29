import { IUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserServices {
  public async getUsers(): Promise<IUser[]> {
    return await User.find();
  }
}

export const userServices = new UserServices();
