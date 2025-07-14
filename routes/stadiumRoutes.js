import { Router } from "express";
import { getAll, createNew, getById, update, deleteById } from "../controllers/stadiumController.js";
const routes = Router();

routes.get("/", getAll);
routes.post("/", createNew);
routes.get("/:id", getById);
routes.put("/:id", update);
routes.delete("/:id", deleteById);
export default routes;