import sequelize from "../config/dbSequelize.js";
import Event from "../models/eventModelSequelize.js";
import User from "../models/userModelSequelize.js";
import bcryp from "bcrypt";

export default class UserService {
    loginUser = async (user) => {
        try {
            const userExist = await User.findOne({ where: { username: user.username }, include: [Event] });
            if (userExist !== null) {
                const isMatch = await bcryp.compare(user.password, userExist.password);
                if (!isMatch) {
                    return null;
                } else {
                    return userExist;
                };
            } else {
                return null;
            };
        } catch (error) {
            throw { status: 500, message: "Error user" };
        }
    };

    userSignin = async (user) => {
        try {
            const transactionCreate = await sequelize.transaction();
            const hashedPassword = await bcryp.hash(user.password, 10);
            const userCreated = await User.create({ username: user.username, password: hashedPassword }, { transaction: transactionCreate });
            await transactionCreate.commit();
            return { created: true, user: userCreated };
        } catch (error) {
            throw { status: 500, message: "Error user create" };
        };
    };

    getByIdUser = async (userId) => {
        try {
            return await User.findByPk(userId, { include: [Event] });
        } catch (error) {
            throw { status: 500, message: "Error user" };
        };
    };
}