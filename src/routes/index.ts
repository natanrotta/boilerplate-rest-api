import { Router } from "express";

import User from "../modules/user/route";

const routes = Router();

routes.get("/", (req, res) => res.status(200).json({ message: "API OK" }));

routes.use("/user", User);

export default routes;
