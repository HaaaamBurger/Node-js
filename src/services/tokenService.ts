import * as jwt from "jsonwebtoken";

import { configs } from "../configs/configs";
import { IToken, ITokenPayload } from "../interfaces/token.interface";
import {ApiError} from "../errors/apiError";

class TokenService {
  public generateTokens(payload: ITokenPayload): IToken {
    const accessToken = jwt.sign(payload, configs.JWT_ACCESS_SECRET!, {
      expiresIn: "10s",
    });
    const refreshToken = jwt.sign(payload, configs.JWT_REFRESH_SECRET!, {
      expiresIn: "30s",
    });
    return {
      accessToken,
      refreshToken,
    };
  }
  public checkToken(token: string, type: "access" | "refresh"): ITokenPayload {
    try {
      let secret: string;

      switch (type) {
        case "access":
          secret = configs.JWT_ACCESS_SECRET!;
          break;
        case "refresh":
          secret = configs.JWT_REFRESH_SECRET!;
          break;
      }

      return jwt.verify(token, secret) as ITokenPayload;
    } catch (e) {
      throw new ApiError("Token not valid!", 401);
    }
  }
}

export const tokenService = new TokenService();
