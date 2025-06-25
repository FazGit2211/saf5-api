import { Router } from "express";
import StadiumSequelizeController from "../controllers/stadiumSequelizeController.js";

const routes = Router();
const stadiumController = new StadiumSequelizeController;
routes.get("/stadiums", stadiumController.getAll);
routes.post("/stadium", stadiumController.createNew);
routes.get("/stadium/:id", stadiumController.getById);
routes.put("/stadium/:id", stadiumController.update);
routes.delete("/stadium/:id", stadiumController.delete);
export default routes;