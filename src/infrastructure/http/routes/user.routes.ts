import { Router } from "express";
import { UserController } from "../controllers";
import { validateRequest, asyncHandler } from "../middlewares";
import {
  CreateUserDTOSchema,
  UpdateUserDTOSchema,
  UserIdParamSchema,
} from "../../../application/dtos";

const userRoutes = Router();
const userController = new UserController();

userRoutes.post(
  "/",
  validateRequest({ body: CreateUserDTOSchema }),
  asyncHandler(userController.create.bind(userController))
);

userRoutes.get(
  "/",
  asyncHandler(userController.findAll.bind(userController))
);

userRoutes.get(
  "/:id",
  validateRequest({ params: UserIdParamSchema }),
  asyncHandler(userController.findById.bind(userController))
);

userRoutes.put(
  "/:id",
  validateRequest({ params: UserIdParamSchema, body: UpdateUserDTOSchema }),
  asyncHandler(userController.update.bind(userController))
);

userRoutes.delete(
  "/:id",
  validateRequest({ params: UserIdParamSchema }),
  asyncHandler(userController.delete.bind(userController))
);

export { userRoutes };