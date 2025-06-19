import { Router } from "express";
import PlayerController from "../controllers/playerControlller.js";

const routes = Router();
const playerController = new PlayerController();
routes.get("/players",playerController.getAll);
routes.post("/player",playerController.postPlayer);
routes.get("/player/:id",playerController.getById);
routes.put("/player/:id",playerController.editPlayer);
routes.delete("/player/:id",playerController.deletePlayer);
export default routes;