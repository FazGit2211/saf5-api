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

    createNew = async (player) => {
        try {
            const transactionCreate = await sequelize.transaction();
            const eventExist = await Event.findOne({ where: { codigo: player.codigo }, transaction: transactionCreate });
            if (eventExist) {
                const playerAddEventId = {
                    name: player.name,
                    surname: player.surname,
                    phoneNumber: player.phoneNumber,
                    email: player.email,
                    state: player.state,
                    EventId: eventExist.id
                };
                const createdPlayer = await Player.create(playerAddEventId, { transaction: transactionCreate });
                await transactionCreate.commit();
                return { createdPlayer };
            };
        } catch (error) {
            throw { status: 500, message: "Error update record" };
        };
    };


    update = async (idPlayer, player) => {
        try {
            const transactionUpdate = await sequelize.transaction();
            await Player.update({ name: player.name, surname: player.surname, phoneNumber: player.phoneNumber, email: player.email, state: player.state }, { where: { id: idPlayer }, transaction: transactionUpdate });
            await transactionUpdate.commit();
            return { updated: player };
        } catch (error) {
            throw { status: 500, message: "Error update record" };
        };
    };

    delete = async (idPlayer) => {
        try {
            const transactionDelete = await sequelize.transaction();
            const playersDeleted = await Player.destroy({ where: { id: idPlayer } }, { transaction: transactionDelete });
            await transactionDelete.commit();
            return { deletedRow: playersDeleted };
        } catch (error) {
            throw { status: 500, message: "Error update record" };
        };
    };
}