import stadiumModel from "../models/stadiumModel.js";
export default class StadiumController {
    stadium = new stadiumModel();

    getAll = async (req, res) => {
        try {
            let stadiums = await this.stadium.getAll();
            res.json(stadiums);
        } catch (error) {
            throw { status: 500, message: "Error controller get all" }
        }
    };

    getById = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const stadium = await this.stadium.getById(id);
            res.status(200).json(stadium);
        } catch (error) {
            throw { status: 500, message: "Error controller get by id" }
        }
    };

    createNew = async (req, res) => {
        try {
            const stadiumNew = {
                nombre: req.body.nombre,
                direccion: req.body.direccion,
            };
            if ((stadiumNew.nombre === "") || (stadiumNew.direccion === "")) {
                res.status(404).json({ err: true, message: "Empty values" });
            } else {
                await this.stadium.createNew(stadiumNew);
                res.status(200).json({ err: false, message: "Created ok" });
            }
        } catch (error) {
            throw { status: 500, message: "Error create" };
        }
    };

    edit = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const stadiumEdit = {
                nombre: req.body.nombre,
                direccion: req.body.direccion,
                cancha_id: id,
            };
            await this.stadium.edit(stadiumEdit);
            res.status(200).json({ err: false, message: "Update record ok" })
        } catch (error) {
            throw { status: 500, message: "Error update record" };
        }
    };

    delete = async(id) => {
        try {
            const id = parseInt(req.params.id);
            await this.stadium.delete(id);
            res.status(200).json({ err: false, message: "Delete record" });
        } catch (error) {
            throw { status: 500, message: "Error delete record" };
        }
    };
}