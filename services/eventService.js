import sequelize from "../config/dbSequelize.js";
import Event from "../models/eventModelSequelize.js";
import Player from "../models/playerModelSequelize.js";
import Stadium from "../models/stadiumModelSequelize.js";

export default class EventService {

    getAll = async () => {
        try {
            return await Event.findAll({ include: [Stadium, Player] });
        } catch (error) {
            throw { status: 500, message: "Error get record" };
        }
    };

    getById = async (idEvent) => {
        try {
            if (idEvent !== undefined || idEvent !== null) {
                return await Event.findOne({ where: { codigo: idEvent }, include: [Stadium, Player] });
            };
            return null;
        } catch (error) {
            throw { status: 500, message: "Error get record" };
        }
    };

    createNew = async (event) => {
        const transactionCreate = await sequelize.transaction();
        try {
            //crear primero el objeto estadio por la relacion uno a uno entre evento
            const stadiumCreated = await Stadium.create({ name: event.stadium.name, address: event.stadium.address }, { transaction: transactionCreate });
            //crear el objeto evento y setearle el estadio id y despues relacionar con los jugadores 
            const eventCreated = await Event.create({ codigo: event.codigo, date: event.date, StadiumId: stadiumCreated.id }, { transaction: transactionCreate });
            //recorrer y asociar a cada uno de los jugadores con el evento para poder crear la relacion del lado muchos
            const players = event.players;
            const addPlayers = players.map((elem) => ({
                ...elem, EventId: eventCreated.id, state: "Pendiente"
            }));
            //crear a todos los jugadores al mismo tiempo
            const createPlayers = await Player.bulkCreate(addPlayers, { transaction: transactionCreate });
            await transactionCreate.commit();
            return { eventCreated: true };
        } catch (error) {
            throw { status: 500, message: "Error created record" };
        }
    };

    updateById = async (event, idEvent) => {
        try {
            const transactionUpdate = await sequelize.transaction();
            //actualizar el evento
            await Event.update({ date: event.date }, { where: { id: idEvent }, transaction: transactionUpdate });
            await transactionUpdate.commit();
            return { updated: true };
        } catch (error) {
            throw { status: 500, message: "Error update record" };
        }
    };

    deleteById = async (idEvent) => {
        try {
            const transactionDelete = await sequelize.transaction();
            const eventExist = await Event.findOne({ where: { id: idEvent }, transaction: transactionDelete });
            if (eventExist) {
                const stadiumDeleted = await Stadium.destroy({ where: { id: eventExist.StadiumId }, transaction: transactionDelete });
                const playersDeleted = await Player.destroy({ where: { EventId: eventExist.id } }, { transaction: transactionDelete });
                const eventDeleted = await Event.destroy({ where: { id: eventExist.id }, transaction: transactionDelete });
                await transactionDelete.commit();
                return { data: [] };
            };
            return null;
        } catch (error) {
            throw { status: 500, message: "Error deleted record" };
        }
    };
}