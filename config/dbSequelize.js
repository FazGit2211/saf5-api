import { Sequelize } from "sequelize"

const sequelize = new Sequelize('saf5', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export default sequelize;