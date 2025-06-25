import { Router } from "express";
import PlayerSequelizeController from "../controllers/playerSequelizeController.js";

const routes = Router();
const playerController = new PlayerSequelizeController();
routes.get("/players",playerController.getAll);
routes.post("/player",playerController.createNew);
routes.get("/player/:id",playerController.getById);
routes.put("/player/:id",playerController.update);
routes.delete("/player/:id",playerController.delete);
export default routes;