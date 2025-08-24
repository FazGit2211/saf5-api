import sequelize from "../config/dbSequelize.js";
import Event from "../models/eventModelSequelize.js";
import User from "../models/userModelSequelize.js";
import bcryp from "bcrypt";

export default class UserService {
    loginUser = async (user) => {
        try {
            return await User.findOne({ where: { username: user.username }, include: [Event] });
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
}