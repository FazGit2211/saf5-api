import { Player } from "../models/playerModelSequelize.js";

export default class PlayerSequelizeController {

    getAll = async (req, res) => {
        try {
            const players = await Player.findAll();
            res.status(200).json(players);
        } catch (error) {
            res.status(500).json({ ok: false, statusCode: 500, message: 'Error get all' })
        } ;
    };

    getById = async (req, res) => {
        try {
            const id = parseInt(req.params.id); 
            const player = await Player.findByPk(id);
            res.status(200).json(player);
        } catch (error) {
            res.status(500).json({ ok: false, statusCode: 500, message: `Error get by id ${id}` })
        };
    };

    createNew = async (req, res) => {
        try {
            const playerNew = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                telefono: req.body.telefono,
                email: req.body.email,
                estado: "Pendiente",
            };
            if ((playerNew.nombre === "") || (playerNew.apellido === "") || (playerNew.email === "")) {
                res.status(404).json({ ok: false, message: "Empty values" });
            } else {
                await Player.create(playerNew);
                res.status(201).json({ ok: true, statusCode: 201, message: "Created Record" });
            }
        } catch (error) {
            res.status(500).json({ ok: false, statusCode: 500, message: "Error create record" })
        };
    };


    update = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const playerEdit = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                telefono: req.body.telefono,
                email: req.body.email,
                estado: req.body.estado,
                persona_id: id,
            };
            await Player.update(playerEdit, { where: { id: id } });
            res.status(200).json({ ok: true, statusCode: 200, message: "Update ok" });
        } catch (error) {
            res.status(500).json({ ok: false, statusCode: 500, message: "Error Updated record" });
        } ;
    };

    delete = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            await Player.destroy({ where: { id: id } });
            res.status(200).json({ ok: true, statusCode: 200, message: "Deleted Record" });
        } catch (error) {
            res.status(500).json({ ok: false, statusCode: 500, message: "Error Deleted Record" });
        };
    };
}