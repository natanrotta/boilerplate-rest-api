import { Router } from "express";
import controller from "./controller";
import { validateRequest } from "../../http/validate";
import { asyncHandler } from "../../http/async-handler";
import { UserIdParamsSchema, CreateUserSchema, UpdateUserSchema } from "./model";

const r = Router();

r.get(
  "/:id",
  validateRequest({ params: UserIdParamsSchema }),
  asyncHandler(controller.findUnique.bind(controller))
);

r.get(
  "/all",
  asyncHandler(controller.findAll.bind(controller))
);


r.post(
  "/",
  validateRequest({ body: CreateUserSchema }),
  asyncHandler(controller.create.bind(controller))
);

r.put(
  "/:id",
  validateRequest({ params: UserIdParamsSchema, body: UpdateUserSchema }),
  asyncHandler(controller.update.bind(controller))
);

export default r;
