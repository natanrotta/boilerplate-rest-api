import { z } from "zod";

// Params
export const UserIdParamsSchema = z.object({
  id: z.string().uuid("id must be a valid UUID"),
});

// Body
export const CreateUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().min(5),
  document: z.string().min(3),
});

export const UpdateUserSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  phone: z.string().min(5).optional(),
  document: z.string().min(3).optional(),
});

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;
export type UpdateUserDTO = z.infer<typeof UpdateUserSchema>;

export interface IDInput {
  id: string;
}

export interface CreateInput {
  input: CreateUserDTO;
}

export interface UpdateInput {
  id: string;
  input: UpdateUserDTO;
}
