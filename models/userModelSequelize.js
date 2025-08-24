import { DataTypes } from "sequelize";
import sequelize from "../config/dbSequelize.js";
import Event from "./eventModelSequelize.js";

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
User.hasMany(Event);
Event.belongsTo(User);
export default User;