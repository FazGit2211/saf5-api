import { DataTypes } from "sequelize";
import sequelize from "../config/dbSequelize.js";
const Stadium = sequelize.define('Estadio', {
    stadiumId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    }
    ,
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    eventId: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false
    }
});


export { Stadium };