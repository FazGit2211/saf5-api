import sequelize from "../config/dbSequelize.js";
import User from "../models/userModelSequelize.js"

export default class UserService {
    loginUser = async (user) => {
        try {
            return await User.findOne({ where: { username: user.username } });
        } catch (error) {
            throw { status: 500, message: "Error user" };
        }
    };

    userSignin = async (user) => {
        try {
            const transactionCreate = await sequelize.transaction();
            const userCreated = await User.create({ username: user.username, hashedPassword: user.password }, { transaction: transactionCreate });
            await transactionCreate.commit();
            return { created: true, user: userCreated };
        } catch (error) {
            throw { status: 500, message: "Error user create" };
        };
    };
}