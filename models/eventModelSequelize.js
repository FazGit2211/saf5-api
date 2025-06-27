import { DataTypes } from "sequelize";
import sequelize from "../config/dbSequelize.js";
import { Stadium } from "./stadiumModelSequelize.js";
import { Player } from "./playerModelSequelize.js";

const Event = sequelize.define('Evento', {
    eventId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    }
    ,
    fecha: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});


Event.hasOne(Stadium, {
    foreignKey: 'eventId'
});

Stadium.belongsTo(Event, {
    foreignKey: 'eventId'
})

Event.hasMany(Player, {
    foreignKey: 'eventId'
});

Player.belongsTo(Event, {
    foreignKey: 'eventId'
});
export { Event };