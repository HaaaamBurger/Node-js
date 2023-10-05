import { NextFunction, Request, Response } from "express";

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
      // const tokensPair = await authService.refresh();
      // res.status(201).json(tokensPair);
      console.log("Refresh Token!");
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
