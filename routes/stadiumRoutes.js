import { Router } from "express";
import { getAll, createNew, getById, update, deleteById } from "../controllers/stadiumController.js";
const routes = Router();

routes.get("/stadiums", getAll);
routes.post("/stadium", createNew);
routes.get("/stadium/:id", getById);
routes.put("/stadium/:id", update);
routes.delete("/stadium/:id", deleteById);
export default routes;