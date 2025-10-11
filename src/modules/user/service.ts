import userRepository from "./repository";
import {
  CreateUserSchema,
  UpdateUserSchema,
  IDInput,
  CreateInput,
  UpdateInput,
} from "./model";
import bcrypt from "bcrypt";
import { NotFoundError, ConflictError } from "../../core/errors";


class UserService {
  async findUnique({ id }: IDInput) {
    const user = await userRepository.findUnique({ id });
    if (!user) throw new NotFoundError("User not found");
    return user;
  }

  async findAll() {
    return await userRepository.findAll();
  }

  async create({ input }: CreateInput) {
    const data = CreateUserSchema.parse(input);

    const existingUser = await userRepository.findByEmail({ email: data.email });
    if (existingUser) throw new ConflictError("Email already registered");

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await userRepository.create({
      data: { ...data, password: hashedPassword },
    });
    return user;
  }

  async update({ id, input }: UpdateInput) {
    const data = UpdateUserSchema.parse(input);
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    return await userRepository.update({ id, data });
  }
}

export default new UserService();
