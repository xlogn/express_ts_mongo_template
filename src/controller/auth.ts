import { Router, Request, Response } from "express";
import { Common } from "../constant/common";

export class AuthController {
  private static instance: AuthController;
  private readonly _router: Router;

  private constructor() {
    this._router = Router();

    this._router.post("/signUp", async (req: Request, res: Response) => {
      res.json({ signup: 1 });
    });
  }

  public static getInstance() {
    if (Common.isNullOrUndefinedOrEmpty(this.instance)) {
      this.instance = new AuthController();
    }

    return this.instance;
  }

  public getRouter() {
    return this._router;
  }
}
