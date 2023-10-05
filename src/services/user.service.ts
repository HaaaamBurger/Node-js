import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getAll(): Promise<IUser[]> {
    return await userRepository.getAll();
  }
  public async deleteById(id: string): Promise<void> {
    await userRepository.deleteById(id);
  }
}
export const userService = new UserService();
