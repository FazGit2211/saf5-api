import sequelize from "../config/dbSequelize.js";
import Event from "../models/eventModelSequelize.js";
import Player from "../models/playerModelSequelize.js";

export default class PlayerService {
    getAll = async () => {
        try {
            return await Player.findAll();
        } catch (error) {
            throw { status: 500, message: "Error update record" };
        };
    };

    getById = async (idPlayer) => {
        try {
            if (idPlayer === "" || idPlayer === 0) {
                return null;
            };
            return await Player.findOne({ where: { id: idPlayer } });
        } catch (error) {
            throw { status: 500, message: "Error update record" };
        };
    };

    createNew = async (idEvent, player) => {
        try {
            const transactionCreate = await sequelize.transaction();
            const eventExist = await Event.findOne({ where: { id: idEvent }, transaction: transactionCreate });
            if (eventExist) {
                const playerAddEventId = {
                    name: player.name,
                    surname: player.surname,
                    phoneNumber: player.phoneNumber,
                    email: player.email,
                    state: player.state,
                    EventId: eventExist.id
                };
                await Player.create(playerAddEventId, { transaction: transactionCreate });
                await transactionCreate.commit();
                return { createdRecord: true };
            };
        } catch (error) {
            throw { status: 500, message: "Error update record" };
        };
    };


    update = async (player) => {
        try {
            const transactionUpdate = await sequelize.transaction();
            await Player.update({ name: player.name, surname: player.surname, phoneNumber: player.phoneNumber, email: player.email, state: player.state }, { where: { id: player.id }, transaction: transactionUpdate });
            await transactionUpdate.commit();
            return { updatedRecord: true };
        } catch (error) {
            throw { status: 500, message: "Error update record" };
        };
    };

    delete = async (idPlayer) => {
        try {
            const transactionDelete = await sequelize.transaction();
            await Player.destroy({ where: { id: idPlayer } }, { transaction: transactionDelete });
            await transactionDelete.commit();
            return { deletedRecord: true };
        } catch (error) {
            throw { status: 500, message: "Error update record" };
        };
    };
}