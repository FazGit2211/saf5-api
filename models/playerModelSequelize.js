import { DataTypes } from "sequelize";
import sequelize from "../config/dbSequelize.js";

const Player = sequelize.define('Jugadore',{
    nombre:{
        type:DataTypes.STRING,
        allowNull:false
    },
    apellido:{
        type:DataTypes.STRING,
        allowNull:true
    },
    telefono:{
        type:DataTypes.STRING,
        allowNull:true
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    estado:{
        type:DataTypes.STRING,
        allowNull:true
    }
});
export {Player};