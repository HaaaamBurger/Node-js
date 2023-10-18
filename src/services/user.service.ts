import { IUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getAll(): Promise<IUser[]> {
    return await userRepository.getAll();
  }
  public async userById(id: string) {
    return await User.findOne({ _id: id });
  }
  public async deleteById(id: string): Promise<void> {
    await userRepository.deleteById(id);
  }
}
export const userService = new UserService();
