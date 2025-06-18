import { Router } from "express";
import StadiumController from "../controllers/stadiumController.js";

const routes = Router();
const stadiumController = new StadiumController();
routes.get("/stadiums",stadiumController.getAll);
export default routes;