import { DataTypes } from "sequelize";
import sequelize from "../config/dbSequelize.js";
import { Player } from "./playerModelSequelize.js";

const Event = sequelize.define('Evento', {
    fecha: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});
Event.Players = Event.hasMany(Player);
Player.belongsTo(Event);
sequelize.sync();
export { Event };