import { Router } from "express";
import { getAll, createNew, getById, update, deleteById } from "../controllers/eventController.js";

const routes = Router();

routes.get("/api/event", getAll);
routes.post("/api/event", createNew);
routes.get("/api/event/:id", getById);
routes.put("/api/event/:id", update);
routes.delete("/api/event/:id", deleteById);
export default routes;