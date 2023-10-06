import { ApiError } from "../errors/apiError";
import { IToken, ITokenPayload } from "../interfaces/token.interface";
import { IUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";
import { tokenRepository } from "../repositories/token.repository";
import { passwordService } from "./password.service";
import { tokenService } from "./tokenService";

class AuthService {
  public async login(body: IUser) {
    try {
      const user = await User.findOne({ email: body.email });
      if (!user) {
        throw new ApiError("Invalid email or password!", 401);
      }
      const isMatched = await passwordService.compare(
        body.password,
        user.password,
      );
      if (!isMatched) {
        throw new ApiError("Invalid email or password!", 401);
      }
      const tokensPair = tokenService.generateTokens({ _userId: user._id });

      await tokenRepository.create({ ...tokensPair, _userId: user._id });

      return tokensPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async register(user: IUser): Promise<void> {
    try {
      const hashedPassword = await passwordService.hash(user.password);
      await User.create({ ...user, password: hashedPassword });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async refresh(
    payload: ITokenPayload,
    refreshToken: string,
  ): Promise<IToken> {
    try {
      const tokensPair = tokenService.generateTokens({
        _userId: payload._userId,
      });
      Promise.all([
        tokenRepository.create({ ...tokensPair, _userId: payload._userId }),
        tokenRepository.deleteOne({ refreshToken }),
      ]);
      return tokensPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const authService = new AuthService();
