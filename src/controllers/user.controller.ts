import { NextFunction, Request, Response } from "express";

import { IUser } from "../interfaces/user.interface";
import { userService } from "../services/user.service";

class UserController {
  public async getList(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.getList();
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as IUser;
      const result = await userService.create(dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }
  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.userId;
      const result = await userService.getById(id);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }
  public async changeUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.userId;
      const dto = req.body;
      const result = await userService.changeUser(id, dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }
  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.userId;
      await userService.delete(id);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
