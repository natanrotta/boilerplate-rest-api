import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../../domain/repositories";
import { IHashProvider } from "../../../domain/providers";
import { UpdateUserDTO, UserResponseDTO } from "../../dtos";
import { NotFoundError } from "../../../shared/errors";

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject("UserRepository")
    private readonly userRepository: IUserRepository,

    @inject("HashProvider")
    private readonly hashProvider: IHashProvider
  ) { }

  async execute(id: string, data: UpdateUserDTO): Promise<UserResponseDTO> {
    const existingUser = await this.userRepository.findById(id);

    if (!existingUser) {
      throw new NotFoundError("User not found");
    }

    const updateData = { ...data };

    if (updateData.password) {
      updateData.password = await this.hashProvider.hash(updateData.password);
    }

    const user = await this.userRepository.update(id, updateData);

    return user.toJSON();
  }
}