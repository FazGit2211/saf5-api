import express from "express";
import cors from "cors";
import routesEvents from "./routes/eventRoutes.js";
import routesStadiums from "./routes/stadiumRoutes.js";
import routesPlayer from "./routes/playerRoutes.js";
import sequelize from "./config/dbSequelize.js";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/event', routesEvents);
app.use('/api/stadium', routesStadiums);
app.use('/api/player', routesPlayer);
//sequelize.sync({ force: true })

app.listen(port, () => {
    console.log(`API listen in port ${port}`);
});