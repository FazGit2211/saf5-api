import { Sequelize } from "sequelize"

const sequelize = new Sequelize('saef5', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export default sequelize;