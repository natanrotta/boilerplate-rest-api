import { Request, Response } from "express";
import { container } from "tsyringe";
import {
  CreateUserUseCase,
  GetUserUseCase,
  ListUsersUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
} from "../../../application/use-cases";

export class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    const createUserUseCase = container.resolve(CreateUserUseCase);
    const user = await createUserUseCase.execute(req.body);

    return res.status(201).json({ ok: true, data: user });
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const getUserUseCase = container.resolve(GetUserUseCase);
    const user = await getUserUseCase.execute(id!);

    return res.status(200).json({ ok: true, data: user });
  }

  async findAll(_req: Request, res: Response): Promise<Response> {
    const listUsersUseCase = container.resolve(ListUsersUseCase);
    const users = await listUsersUseCase.execute();

    return res.status(200).json({ ok: true, data: users });
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const updateUserUseCase = container.resolve(UpdateUserUseCase);
    const user = await updateUserUseCase.execute(id!, req.body);

    return res.status(200).json({ ok: true, data: user });
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deleteUserUseCase = container.resolve(DeleteUserUseCase);
    await deleteUserUseCase.execute(id!);

    return res.status(204).send();
  }
}