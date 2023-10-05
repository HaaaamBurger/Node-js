import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/apiError";
import { tokenRepository } from "../repositories/token.repository";

class AuthMiddleware {
  public async checkForRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const refreshToken = req.get("Authorization");
      if (!refreshToken) {
        throw new ApiError("No Token!", 401);
      }

      const entity = await tokenRepository.findOne({ refreshToken });
      if (!entity) {
        throw new ApiError("No Token!", 401);
      }

      res.locals.tokenPayload = payload;
      res.locals.tokenEntity = entity;
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const authMiddleware = new AuthMiddleware();
