import { DataTypes } from "sequelize";
import sequelize from "../config/dbSequelize.js";
import Player from "./playerModelSequelize.js";

const Event = sequelize.define('Event', {
    date: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

Event.hasMany(Player, { foreignKey: 'eventId' });
Player.belongsTo(Event, { foreignKey: 'eventId' });
export default Event;