import { DataTypes } from "sequelize";
import sequelize from "../config/dbSequelize.js";

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(64),
        allowNull: false,
    }
}, {  tableName: 'Users' });

export default User;