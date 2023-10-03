import { NextFunction, Request, Response } from "express";

import { authService } from "../services/auth.service";

class AuthController {
  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const tokensPair = await authService.loginUser(req.body);
      res.json(tokensPair);
    } catch (e) {
      next(e);
    }
  }
  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      await authService.registerUser(req.body);
      return res.sendStatus(201);
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
