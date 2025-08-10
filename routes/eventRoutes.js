import { Router } from "express";
import { getAll, createNew, getById, deleteById, updateById } from "../controllers/eventController.js";

const routes = Router();

routes.get("/", getAll);
routes.post("/", createNew);
routes.get("/:id", getById);
routes.delete("/:id", deleteById);
routes.put("/:id", updateById);
export default routes;