import { IUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
  public async getAll(): Promise<IUser[]> {
    return await User.find();
  }
  public async getById(id: string) {
    return await User.findById(id);
  }
  public async create(user: IUser): Promise<void> {
    await User.create(user);
  }
}
export const userRepository = new UserRepository();
