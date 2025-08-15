import { Router } from "express";
import { createPlayerAddEvent, updatePlayer, deletePlayer } from "../controllers/playerController.js";
const routes = Router();

routes.post("/:id", createPlayerAddEvent);
routes.put("/", updatePlayer);
routes.delete("/:id", deletePlayer);
export default routes;