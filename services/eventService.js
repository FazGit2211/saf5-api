import sequelize from "../config/dbSequelize.js";
import Event from "../models/eventModelSequelize.js";
import Player from "../models/playerModelSequelize.js";
import Stadium from "../models/stadiumModelSequelize.js";
import User from "../models/userModelSequelize.js";

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
                return await Event.findOne({ where: { code: idEvent }, include: [Stadium, Player, User] });
            };
            return null;
        } catch (error) {
            throw { status: 500, message: "Error get record" };
        }
    };

    createNew = async (event) => {
        try {
            const transactionCreate = await sequelize.transaction();
            //crear primero el objeto estadio por la relacion uno a uno entre evento
            const stadiumCreated = await Stadium.create({ name: event.stadium.name, address: event.stadium.address }, { transaction: transactionCreate });
            //verificar si el userId es un número mayor a 0
            let userId = null;
            if (event.id === 0) {
                event.id = userId;
            };
            //crear el objeto evento y setearle el estadio id y despues relacionar con los jugadores 
            const eventCreated = await Event.create({ code: event.code, date: event.date, StadiumId: stadiumCreated.id, UserId: userId }, { transaction: transactionCreate });
            //recorrer y asociar a cada uno de los jugadores con el evento para poder crear la relacion del lado muchos
            const players = event.players;
            const addPlayers = players.map((elem) => ({
                ...elem, EventId: eventCreated.id, state: "Pendiente"
            }));
            //crear a todos los jugadores al mismo tiempo
            await Player.bulkCreate(addPlayers, { transaction: transactionCreate });
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
                await Stadium.destroy({ where: { id: eventExist.StadiumId }, transaction: transactionDelete });
                await Player.destroy({ where: { EventId: eventExist.id } }, { transaction: transactionDelete });
                await Event.destroy({ where: { id: eventExist.id }, transaction: transactionDelete });
                await transactionDelete.commit();
                return { data: [] };
            };
            return null;
        } catch (error) {
            throw { status: 500, message: "Error deleted record" };
        }
    };

    getByUserId = async (userId) => {
        try {
            return await Event.findAll({ where: { UserId: userId }, include: [Stadium, Player] });
        } catch (error) {
            throw { status: 500, message: "Error get record" };
        }
    };
}