import { Router } from "express";
import { createPlayerAddEvent, updatePlayer, deletePlayer } from "../controllers/playerController.js";
const routes = Router();
routes.post("/api/player/:id", createPlayerAddEvent);
routes.put("/api/player/", updatePlayer);
routes.delete("/api/player/:id", deletePlayer);
export default routes;