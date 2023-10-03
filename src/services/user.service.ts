import { IUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserService {
  public async getAll(): Promise<IUser[]> {
    return await User.find();
  }
}
export const userService = new UserService();
