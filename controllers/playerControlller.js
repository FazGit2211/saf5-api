import playerModel from "../models/playerModel.js";
export default class PlayerController {
    player = new playerModel();

    getAll = async (req, res) => {
        try {
            let players = await this.player.getAll();
            res.json(players);
        } catch (error) {
            throw { status: 500, message: "Error en el controlador eventos" };
        }
    }

    postPlayer = async (req, res) => {
        try {
            const playerNew = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                telefono: req.body.telefono,
                email: req.body.email,
                estado: "Pendiente",
            }
            if ((playerNew.nombre === "") || (playerNew.apellido === "") || (playerNew.email === "")) {
                res.status(404).json({ err: true, message: "Empty values" });
            } else {
                let createPlayer = await this.player.createNew(playerNew);
                res.status(200).json({ err: false, message: createPlayer });
            }
        } catch (error) {
            throw { status: 500, message: error };
        }
    }
}