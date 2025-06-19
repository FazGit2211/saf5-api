import playerModel from "../models/playerModel.js";
export default class PlayerController {
    player = new playerModel();

    getAll = async (req, res) => {
        try {
            let players = await this.player.getAll();
            res.json(players);
        } catch (error) {
            throw { status: 500, message: "Error get all" };
        }
    };

    getById = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            let player = await this.player.getById(id);
            res.json(player);
        } catch (error) {
            throw { status: 500, message: `Error get by id ${id}` };
        }
    };

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
                await this.player.createNew(playerNew);
                res.status(200).json({ err: false, message: "Created ok" });
            }
        } catch (error) {
            throw { status: 500, message: "Error create" };
        }
    };

    editPlayer = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const playerEdit = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                telefono: req.body.telefono,
                email: req.body.email,
                estado: req.body.estado,
                persona_id: id,
            }
            await this.player.update(playerEdit);
            res.status(200).json({ err: false, message: "Update record ok" })
        } catch (error) {
            throw { status: 500, message: "Error update record" };
        }
    };

    deletePlayer = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            await this.player.delete(id);
            res.status(200).json({ err: false, message: "Delete record" })
        } catch (error) {
            throw { status: 500, message: "Error delete record" };
        }
    }
}