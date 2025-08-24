import { Router } from "express";
import { getEvent, createEvent, updateEvent, deleteEvent, getEventByUser } from "../controllers/eventController.js";
const routes = Router();
routes.post("/api/event/", createEvent);
routes.get("/api/event/:id", getEvent);
routes.get("/api/event/user/:id", getEventByUser);
routes.delete("/api/event/:id", deleteEvent);
routes.put("/api/event/:id", updateEvent);
export default routes;