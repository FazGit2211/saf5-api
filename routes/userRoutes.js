import { Router } from "express";
import { login, signin, getUser } from "../controllers/userController.js";
const routes = Router();
routes.post("/api/user/signin", signin);
routes.post("/api/user/login", login);
routes.get("/api/user/:id", getUser);
export default routes;