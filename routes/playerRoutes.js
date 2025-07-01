import { Router } from "express";
import { getAll, createNew, getById, update, deleteById } from "../controllers/playerControlller.js";
const routes = Router();

routes.get("/api/player", getAll);
routes.post("/api/player", createNew);
routes.get("/api/player/:id", getById);
routes.put("/api/player/:id", update);
routes.delete("/api/player/:id", deleteById);
export default routes;