import UserService from "../services/userService.js";

const userService = new UserService();
export const login = async (req, res) => {
    try {
        const userLogin = await userService.loginUser(req.body);
        if (userLogin !== null) {
            res.status(200).json({ ok: true, statusCode: 200, message: "Login ok", info: userLogin });
        }
    } catch (error) {
        res.status(500).json({ ok: false, statusCode: 500, message: "Error login user" });
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
}