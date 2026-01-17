import { z } from "zod";

export const CreateUserDTOSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().min(5, "Phone must be at least 5 characters"),
  document: z.string().min(3, "Document must be at least 3 characters"),
});

export const UpdateUserDTOSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  phone: z.string().min(5).optional(),
  document: z.string().min(3).optional(),
});

export const UserIdParamSchema = z.object({
  id: z.string().uuid("Invalid user ID format"),
});

export type CreateUserDTO = z.infer<typeof CreateUserDTOSchema>;
export type UpdateUserDTO = z.infer<typeof UpdateUserDTOSchema>;
export type UserIdParam = z.infer<typeof UserIdParamSchema>;

export interface UserResponseDTO {
  id: string;
  name: string;
  email: string;
  phone: string;
  document: string;
  createdAt: Date;
  updatedAt: Date;
}