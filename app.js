import express from "express";
import cors from "cors";
import helmet from "helmet";
import routesEvents from "./routes/eventRoutes.js";
import routesStadiums from "./routes/stadiumRoutes.js";
import routesPlayer from "./routes/playerRoutes.js";
import routesUser from "./routes/userRoutes.js";
import session from "express-session";
import sequelize from "./config/dbSequelize.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routesUser);
app.use(routesEvents);
app.use(routesStadiums);
app.use(routesPlayer);
//sequelize.sync({ force: true })

app.listen(port, () => {
    console.log(`API listen in port ${port}`);
});