import { Router } from "express";
import { userRoutes } from "./user.routes";

const router = Router();

router.get("/health", (_req, res) => {
  return res.status(200).json({ ok: true, message: "API is running" });
});

router.use("/users", userRoutes);

export { router };