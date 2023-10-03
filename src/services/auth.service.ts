import { ApiError } from "../errors/apiError";
import { ITokenPair } from "../interfaces/token.interface";
import { IUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";
import { UserValidator } from "../validators/user.validator";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async loginUser(user: IUser): Promise<ITokenPair> {
    try {
      const findUser = await User.findOne({ email: user.email });
      if (!findUser) {
        throw new ApiError("Invalid credentials provided", 401);
      }
      const isMatched = await passwordService.compare(
        user.password,
        findUser.password,
      );
      if (!isMatched) {
        throw new ApiError("Invalid login or password", 401);
      }
      const tokensPair = await tokenService.generateTokenPair({
        userId: findUser._id,
      });

      return tokensPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async registerUser(user: IUser): Promise<void> {
    try {
      const { error } = UserValidator.register.validate(user);
      if (error) {
        throw new ApiError(error.message, 400);
      }
      const hashedPassword = await passwordService.hash(user.password);
      await User.create({ ...user, password: hashedPassword });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}
export const authService = new AuthService();
