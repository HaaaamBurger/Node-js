import * as jwt from "jsonwebtoken";

import { configs } from "../configs/configs";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";

class TokenService {
  public generateTokenPair(payload: ITokenPayload): ITokenPair {
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
