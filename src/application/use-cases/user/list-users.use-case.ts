import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../../domain/repositories";
import { UserResponseDTO } from "../../dtos";

@injectable()
export class ListUsersUseCase {
  constructor(
    @inject("UserRepository")
    private readonly userRepository: IUserRepository
  ) { }

  async execute(): Promise<UserResponseDTO[]> {
    const users = await this.userRepository.findAll();

    return users.map((user) => user.toJSON());
  }
}