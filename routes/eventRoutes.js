import { Router } from "express";
import EventSequelizeController from "../controllers/eventSequelizeController.js";


const routes = Router();
const eventController = new EventSequelizeController;
routes.get("/events", eventController.getAll);
routes.post("/event", eventController.createNew);
routes.get("/event/:id", eventController.getById);
routes.put("/event/:id", eventController.update);
routes.delete("/event/:id", eventController.delete);
export default routes;