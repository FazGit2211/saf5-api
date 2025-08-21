import { Router } from "express";
import { getEvent, createEvent, updateEvent, deleteEvent } from "../controllers/eventController.js";
const routes = Router();
routes.post("/api/event/", createEvent);
routes.get("/api/event/:id", getEvent);
routes.delete("/api/event/:id", deleteEvent);
routes.put("/api/event/:id", updateEvent);
export default routes;