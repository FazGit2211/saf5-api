import { Router } from "express";
import StadiumController from "../controllers/stadiumController.js";

const routes = Router();
const stadiumController = new StadiumController();
routes.get("/stadiums", stadiumController.getAll);
routes.post("/stadium", stadiumController.createNew);
routes.get("/stadium/:id", stadiumController.getById);
routes.put("/stadium/:id", stadiumController.edit);
routes.delete("/stadium/:id", stadiumController.delete);
export default routes;