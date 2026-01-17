import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../../domain/repositories";
import { UserResponseDTO } from "../../dtos";
import { NotFoundError } from "../../../shared/errors";

@injectable()
export class GetUserUseCase {
  constructor(
    @inject("UserRepository")
    private readonly userRepository: IUserRepository
  ) { }

  async execute(id: string): Promise<UserResponseDTO> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return user.toJSON();
  }
}