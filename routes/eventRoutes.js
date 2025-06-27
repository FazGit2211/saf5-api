import { Router } from "express";
import { getAll, createNew, getById, update, deleteById } from "../controllers/eventController.js";

const routes = Router();

routes.get("/events", getAll);
routes.post("/event", createNew);
routes.get("/event/:id", getById);
routes.put("/event/:id", update);
routes.delete("/event/:id", deleteById);
export default routes;