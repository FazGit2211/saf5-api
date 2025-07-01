import { DataTypes } from "sequelize";
import sequelize from "../config/dbSequelize.js";
import Event from "./eventModelSequelize.js";
const Stadium = sequelize.define('Stadium', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

Stadium.hasOne(Event, { foreignKey: 'stadiumId' });
Event.belongsTo(Stadium, { foreignKey: 'stadiumId' });
export default Stadium;