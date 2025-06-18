import { Router } from "express";
import EventController from "../controllers/eventController.js";

const routes = Router();
const eventController = new EventController();
routes.get("/events",eventController.getAll);
export default routes;