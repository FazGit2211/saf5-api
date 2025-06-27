import { Router } from "express";
import { getAll, createNew, getById, update, deleteById } from "../controllers/playerControlller.js";
const routes = Router();

routes.get("/players", getAll);
routes.post("/player", createNew);
routes.get("/player/:id", getById);
routes.put("/player/:id", update);
routes.delete("/player/:id", deleteById);
export default routes;