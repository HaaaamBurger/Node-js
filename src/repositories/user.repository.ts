import { IUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
  public async getAll(): Promise<IUser[]> {
    return await User.find();
  }
  public async deleteById(id: string): Promise<void> {
    await User.findByIdAndDelete(id);
  }
}

export const userRepository = new UserRepository();
