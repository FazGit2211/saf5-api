import express from "express";
import cors from "cors";
import routesEvents from "./routes/eventRoutes.js";
import routesStadiums from "./routes/stadiumRoutes.js";
import routesPlayer from "./routes/playerRoutes.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routesEvents);
app.use(routesStadiums);
app.use(routesPlayer);


app.listen(port, () => {
    console.log(`API listen in port ${port}`);
})