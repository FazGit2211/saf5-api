import sequelize from "../config/dbSequelize.js";
import Stadium from "../models/stadiumModelSequelize.js";

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
            if ((stadiumNew.name === "") || (stadiumNew.address === "")) {
                return null;
            } else {
                return await Stadium.create(stadiumNew);
            }
        } catch (error) {
            throw { status: 500, message: "Error create" };
        }
    };

    edit = async (stadium) => {
        try {
            const transactionUpdate = await sequelize.transaction();
            await Stadium.update({ name: stadium.name, address: stadium.address }, { where: { id: stadium.id }, transaction: transactionUpdate });
            await transactionUpdate.commit();
            return { updatedRecord: true };
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