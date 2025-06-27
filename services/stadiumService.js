import { Stadium } from "../models/stadiumModelSequelize.js";

export default class StadiumService {
    getAll = async () => {
        try {
            return await Stadium.findAll();
        } catch (error) {
            throw { status: 500, message: "Error controller get all" }
        }
    };

    getById = async (id) => {
        try {
            return await Stadium.findByPk(id);
        } catch (error) {
            throw { status: 500, message: "Error controller get by id" }
        }
    };

    createNew = async (stadium) => {
        try {
            const stadiumNew = stadium;
            if ((stadiumNew.nombre === "") || (stadiumNew.direccion === "")) {
                return null;
            } else {
                return await Stadium.create(stadiumNew);
            }
        } catch (error) {
            throw { status: 500, message: "Error create" };
        }
    };

    edit = async (stadium, id) => {
        try {
            const stadiumEdit = stadium;
            if ((stadiumEdit.nombre === "") && (stadiumEdit.direccion === "")) {
                return null;
            }
            return await Stadium.update(stadiumEdit, { where: { stadiumId: id } });
        } catch (error) {
            throw { status: 500, message: "Error update record" };
        }
    };

    deleteById = async (id) => {
        try {
            if (id === 0) {
                return null;
            } else {
                return await Stadium.destroy({ where: { stadiumId: id } });
            }
        } catch (error) {
            throw { status: 500, message: "Error delete record" };
        }
    };

}