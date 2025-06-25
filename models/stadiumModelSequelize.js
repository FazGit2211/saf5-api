import { DataTypes } from "sequelize";
import sequelize from "../config/dbSequelize.js";
import { Event } from "./eventModelSequelize.js";

const Stadium = sequelize.define('Estadio', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    direccion:{
        type: DataTypes.STRING,
        allowNull: false,
    }
});
Stadium.hasOne(Event);
Event.belongsTo(Stadium);
export {Stadium};