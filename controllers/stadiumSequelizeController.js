import { Stadium } from "../models/stadiumModelSequelize.js";
export default class StadiumSequelizeController {

    getAll = async (req, res) => {
        try {
            let stadiums = await Stadium.findAll();
            res.status(200).json(stadiums);
        } catch (error) {
            res.status(500).json({ ok: false, statusCode: 500, message: 'Error get all' });
        }
    };

    getById = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const stadium = await Stadium.findByPk(id);
            res.status(200).json(stadium);
        } catch (error) {
            res.status(500).json({ ok: false, statusCode: 500, message: `Error get by id ${id}` });
        }
    };

    createNew = async (req, res) => {
        try {
            Stadium.sync();
            const stadiumNew = {
                nombre: req.body.nombre,
                direccion: req.body.direccion,
            };
            if ((stadiumNew.nombre === "") || (stadiumNew.direccion === "")) {
                res.status(404).json({ ok: false, statusCode: 404, message: "Empty values" });
            } else {
                await Stadium.create(stadiumNew);
                res.status(201).json({ ok: true, statusCode: 201, message: "Created Record" });
            }
        } catch (error) {
            res.status(500).json({ ok: false, statusCode: 500, message: "Error create record" });
        }
    };

    update = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const stadiumEdit = {
                nombre: req.body.nombre,
                direccion: req.body.direccion,
            };
            await Stadium.update(stadiumEdit, { where: { id: id } });
            res.status(200).json({ ok: true, statusCode: 200, message: "Update ok" });
        } catch (error) {
            res.status(500).json({ ok: false, statusCode: 500, message: "Error Updated record" });
        }
    };

    delete = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            await Stadium.destroy({ where: { id: id } });
            res.status(200).json({ ok: true, statusCode: 200, message: "Deleted Record" });
        } catch (error) {
            res.status(500).json({ ok: false, statusCode: 500, message: "Error Deleted Record" });
        }
    };
}