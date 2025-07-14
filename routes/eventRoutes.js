import { Router } from "express";
import { getAll, createNew, getById, update, deleteById } from "../controllers/eventController.js";

const routes = Router();

routes.get("/", getAll);
routes.post("/", createNew);
routes.get("/:codigo", getById);
routes.put("/:id", update);
routes.delete("/:id", deleteById);
export default routes;