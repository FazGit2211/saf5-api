import { Player } from "../models/playerModelSequelize.js";
import sequelize from "../config/dbSequelize.js";
export default class PlayerSequelizeController {

    getAll = async (req, res) => {
        try {
            await sequelize.authenticate();
            await Player.sync();
            const players = await Player.findAll();
            res.status(200).json(players);
        } catch (error) {
            res.status(500).json({ err: true, message: 'Error get all' })
        } finally {
            await sequelize.close();
        }
    };

    getById = async (id) => {
        try {
            const [player] = await db.query("SELECT * FROM personas WHERE persona_id = ?", [id]);
            return player;
        } catch (error) {
            throw { status: 500, message: `Error get by id ${id}` }
        }
    };

    createNew = async (player) => {
        try {
            await db.query("INSERT INTO personas(nombre,apellido,telefono,email,estado) VALUES(?,?,?,?,?)", [player.nombre, player.apellido, player.telefono, player.email, player.estado]);
        } catch (error) {
            throw { status: 500, message: "Error create record" }
        }
    };


    update = async (player) => {
        try {
            await db.query("UPDATE personas SET nombre = ?,apellido = ?,telefono = ?,email = ?,estado = ? WHERE persona_id = ?", [player.nombre, player.apellido, player.telefono, player.email, player.estado, player.persona_id]);
        } catch (error) {
            throw { status: 500, message: "Error edit record" }
        }
    };

    delete = async (id) => {
        try {
            await db.query("DELETE FROM personas WHERE persona_id = ?", [id]);
        } catch (error) {
            throw { status: 500, message: "Error delete record" }
        }
    };
}