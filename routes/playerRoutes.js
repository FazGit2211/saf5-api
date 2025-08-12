import { Router } from "express";
import { getPlayers, getPlayer, createPlayer, updatePlayer, deletePlayer } from "../controllers/playerControlller.js";
const routes = Router();

routes.get("/", getPlayers);
routes.post("/", createPlayer);
routes.get("/:id", getPlayer);
routes.put("/:id", updatePlayer);
routes.delete("/:id", deletePlayer);
export default routes;