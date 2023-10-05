import * as jwt from "jsonwebtoken";

import { configs } from "../configs/configs";
import { IToken, ITokenPayload } from "../interfaces/token.interface";

class TokenService {
  public generateTokens(payload: ITokenPayload): IToken {
    const accessToken = jwt.sign(payload, configs.JWT_ACCESS_SECRET!, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(payload, configs.JWT_REFRESH_SECRET!, {
      expiresIn: "2h",
    });
    return {
      accessToken,
      refreshToken,
    };
  }
}

export const tokenService = new TokenService();
