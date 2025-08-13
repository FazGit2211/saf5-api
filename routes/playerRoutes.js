import { Router } from "express";
import { getPlayers, getPlayer, createPlayer, createPlayerAddEvent, updatePlayer, deletePlayer } from "../controllers/playerControlller.js";
const routes = Router();

routes.get("/", getPlayers);
routes.post("/", createPlayer);
routes.post("/:id", createPlayerAddEvent);
routes.get("/:id", getPlayer);
routes.put("/:id", updatePlayer);
routes.delete("/:id", deletePlayer);
export default routes;