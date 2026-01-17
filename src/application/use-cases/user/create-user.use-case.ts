import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../../domain/repositories";
import { IHashProvider } from "../../../domain/providers";
import { CreateUserDTO, UserResponseDTO } from "../../dtos";
import { ConflictError } from "../../../shared/errors";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private readonly userRepository: IUserRepository,

    @inject("HashProvider")
    private readonly hashProvider: IHashProvider
  ) { }

  async execute(data: CreateUserDTO): Promise<UserResponseDTO> {
    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new ConflictError("Email already registered");
    }

    const hashedPassword = await this.hashProvider.hash(data.password);

    const user = await this.userRepository.create({
      ...data,
      password: hashedPassword,
    });

    return user.toJSON();
  }
}