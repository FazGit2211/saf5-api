import { Router } from "express";
import { login, signin } from "../controllers/userController.js";
const routes = Router();
routes.post("/signin", signin);
routes.get("/login", login);

export default routes;