import UserService from "../services/userService.js";
import errors from "../middlewares/errors.js";

const userService = new UserService();
export const login = async (req, res) => {
    try {
        const userLogin = await userService.loginUser(req.body);
        if (userLogin !== null) {
            res.status(200).json({ message: "Login ok", info: userLogin });
        } else {
            errors.error401(req, res, { info: "User not exist" });
        }
    } catch (error) {
        errors.error500(req, res, error);
    }
};

export const signin = async (req, res) => {
    try {
        const userSignin = await userService.userSignin(req.body);
        if (userSignin.created) {
            res.status(200).json({ ok: true, statusCode: 200, message: "Signin ok", info: userSignin.user });
        } else {
            errors.error400(req, res, "Error signin");
        };
    } catch (error) {
        errors.error500(req, res, error);
    };
};

export const logout = (req, res) => { };
