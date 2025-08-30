import { DataTypes } from "sequelize";
import sequelize from "../config/dbSequelize.js";
import Player from "./playerModelSequelize.js";

const Event = sequelize.define('Event', {
    date: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, { tableName: 'Events' });

Event.hasMany(Player);
Player.belongsTo(Event);
export default Event;