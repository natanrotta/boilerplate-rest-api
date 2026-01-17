import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../../domain/repositories";
import { NotFoundError } from "../../../shared/errors";

@injectable()
export class DeleteUserUseCase {
  constructor(
    @inject("UserRepository")
    private readonly userRepository: IUserRepository
  ) { }

  async execute(id: string): Promise<void> {
    const existingUser = await this.userRepository.findById(id);

    if (!existingUser) {
      throw new NotFoundError("User not found");
    }

    await this.userRepository.delete(id);
  }
}