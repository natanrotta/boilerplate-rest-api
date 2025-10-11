import { Request, Response } from "express";
import userService from "./service";

class UserController {
  async findUnique(req: Request, res: Response) {
    const { id } = req.params;
    const data = await userService.findUnique({ id });
    return res.status(200).json({ ok: true, data });
  }

  async findAll(req: Request, res: Response) {
    const data = await userService.findAll();
    return res.status(200).json({ ok: true, data });
  }

  async create(req: Request, res: Response) {
    const data = await userService.create({ input: req.body });
    return res.status(201).json({ ok: true, data });
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const data = await userService.update({ id, input: req.body });
    return res.status(200).json({ ok: true, data });
  }
}

export default new UserController();
