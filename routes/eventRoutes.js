import { Router } from "express";
import { getEvents, getEvent, createEvent, updateEvent, deleteEvent } from "../controllers/eventController.js";

const routes = Router();

routes.get("/", getEvents);
routes.post("/", createEvent);
routes.get("/:id", getEvent);
routes.delete("/:id", deleteEvent);
routes.put("/:id", updateEvent);
export default routes;