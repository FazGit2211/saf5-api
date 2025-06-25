import { Event } from "../models/eventModelSequelize.js";

export default class EventSequelizeController {
    getAll = async (req, res) => {
        try {
            let events = await Event.findAll();
            res.status(200).json(events);
        } catch (error) {
            res.status(500).json({ ok: false, statusCode: 500, message: 'Error get all' });
        }
    };

    getById = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const event = await Event.findByPk(id);
            res.status(200).json(event);
        } catch (error) {
            res.status(500).json({ ok: false, statusCode: 500, message: `Error get by id ${id}` });
        }
    };

    createNew = async (req, res) => {
        try {
            Event.sync();
            const eventNew = {
                fecha: req.body.fecha,
                EstadioId: req.body.estadioId,
                players:[{
                    nombre: req.body.player.nombre,
                    apellido: req.body.player.apellido,
                    telefono: req.body.player.telefono,
                    email: req.body.player.email
                }],
            };
            if (eventNew.fecha === "") {
                res.status(404).json({ ok: false, statusCode: 404, message: "Empty values" });
            } else {
                await Event.create(eventNew,{include:[{association:Event,include:[Event.Players]}]});
                res.status(201).json({ ok: true, statusCode: 201, message: "Created Record" });
            }
        } catch (error) {
            res.status(500).json({ ok: false, statusCode: 500, message: "Error create record" });
        }
    };

    update = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const eventEdit = {
                fecha: req.body.fecha,
                EstadioId: req.body.estadioId,
            };
            await Event.update(eventEdit, { where: { id: id } });
            res.status(200).json({ ok: true, statusCode: 200, message: "Update ok" });
        } catch (error) {
            res.status(500).json({ ok: false, statusCode: 500, message: "Error Updated record" });
        }
    };

    delete = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            await Event.destroy({ where: { id: id } });
            res.status(200).json({ ok: true, statusCode: 200, message: "Deleted Record" });
        } catch (error) {
            res.status(500).json({ ok: false, statusCode: 500, message: "Error Deleted Record" });
        }
    }
};
