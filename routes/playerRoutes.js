import { Router } from "express";
import PlayerController from "../controllers/playerControlller.js";

const routes = Router();
const playerController = new PlayerController();
routes.get("/players",playerController.getAll);
export default routes;