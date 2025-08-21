import { Router } from "express";
import { update } from "../controllers/stadiumController.js";
const routes = Router();
routes.put("/api/stadium/", update);
export default routes;