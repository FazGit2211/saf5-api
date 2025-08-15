import { Router } from "express";
import { update } from "../controllers/stadiumController.js";
const routes = Router();




routes.put("/", update);

export default routes;