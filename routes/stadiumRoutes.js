import { Router } from "express";
import { getAll, createNew, getById, update, deleteById } from "../controllers/stadiumController.js";
const routes = Router();

routes.get("/api/stadium", getAll);
routes.post("/api/stadium", createNew);
routes.get("/api/stadium/:id", getById);
routes.put("/api/stadium/:id", update);
routes.delete("/api/stadium/:id", deleteById);
export default routes;