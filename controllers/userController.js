import UserService from "../services/userService.js";
import errors from "../middlewares/errors.js";

const userService = new UserService();
export const login = async (req, res) => {
    try {
        const userLogin = await userService.loginUser(req.body);
        if (userLogin !== null) {
            res.status(200).json({ ok: true, statusCode: 200, message: "Login ok", info: {} });
            req.session.user = userLogin;
        } else {
            let errorMsj = { status: 401, message: "User not exist" };
            errors.error401(req, res, errorMsj);
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
            res.status(200).json({ ok: true, statusCode: 200, message: "Error signin", info: {} });
        };
    } catch (error) {
        res.status(500).json({ ok: false, statusCode: 500, message: "Error signin user" });
    };
};

export const logout = (req, res) => { };
