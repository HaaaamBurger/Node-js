import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/apiError";
import { tokenRepository } from "../repositories/token.repository";
import { tokenService } from "../services/tokenService";

class AuthMiddleware {
  public async checkRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const refreshToken = req.get("Authorization");
      if (!refreshToken) {
        throw new ApiError("No token!", 401);
      }
      const payload = tokenService.checkToken(refreshToken, "refresh");
      const entity = await tokenRepository.findOne({ refreshToken });
      if (!entity) {
        throw new ApiError("Token not valid!", 401);
      }

      res.locals.tokenPayload = payload;
      res.locals.refreshToken = refreshToken;
      next();
    } catch (e) {
      next(e);
    }
  }
  public async checkAccessToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const accessToken = req.get("Authorization");
      if (!accessToken) {
        throw new ApiError("No token!", 401);
      }
      const payload = tokenService.checkToken(accessToken, "access");
      const entity = await tokenRepository.findOne({ accessToken });
      if (!entity) {
        throw new ApiError("Token not valid!", 401);
      }

      res.locals.tokenPayload = payload;
      res.locals.refreshToken = accessToken;
      next();
    } catch (e) {
      next(e);
    }
  }
}
export const authMiddleware = new AuthMiddleware();
