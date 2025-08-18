import { DataTypes } from "sequelize";
import sequelize from "../config/dbSequelize.js";

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    hashedPassword: {
        type: DataTypes.STRING(64),
        validate: {
            is: /^[0-9a-f]{64}$/i,
        },
        allowNull: false,
    }
}, {  tableName: 'Users' });

export default User;