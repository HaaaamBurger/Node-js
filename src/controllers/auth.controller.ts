import { NextFunction, Request, Response } from "express";

import { ITokenPayload } from "../interfaces/token.interface";
import { authService } from "../services/auth.service";

class AuthController {
  public async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const tokensPair = await authService.login(req.body);
      res.json(tokensPair);
    } catch (e) {
      next(e);
    }
  }
  public async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      await authService.register(req.body);
      res.status(200).json("User registered!");
    } catch (e) {
      next(e);
    }
  }
  public async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenPayload = res.locals.tokenPayload as ITokenPayload;
      const refreshToken = res.locals.refreshToken as string;

      const tokensPair = await authService.refresh(tokenPayload, refreshToken);
      res.status(201).json(tokensPair);
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
