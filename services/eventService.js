import sequelize from "../config/dbSequelize.js";
import Event from "../models/eventModelSequelize.js";
import Player from "../models/playerModelSequelize.js";

export default class EventService {

    getAll = async () => {
        try {
            return await Event.findAll();
        } catch (error) {
            throw { status: 500, message: "Error get record" };
        }
    };

    getById = async (id) => {
        try {
            return await Event.findByPk(id);
        } catch (error) {
            throw { status: 500, message: "Error get record" };
        }
    };

    createNew = async (event) => {
        const transaction = await sequelize.transaction();
        try {
            const players = event.players;
            //crear el objeto evento primero para tener el lado de la relacion de uno 
            const eventCreated = await Event.create({ date: event.date }, { transaction: transaction });
            //recorrer y asociar a cada uno de los jugadores con el evento para poder crear la relacion del lado muchos
            const addPlayers = players.map((elem) => ({
                ...elem, eventId: eventCreated.id, state: "Pendiente"
            }));
            //crear a todos los jugadores al mismo tiempo
            const createPlayers = await Player.bulkCreate(addPlayers, { transaction: transaction });
            await transaction.commit();
            return { eventCreated, playersCreated: createPlayers };
        } catch (error) {
            throw { status: 500, message: "Error created record" };
        }
    };

    update = async (event, id) => {
        try {
            if (event.date === '') {
                return 0;
            }
            const eventEdit = await Event.update({ date: event.date }, { where: { eventId: id } });
            return eventEdit;
        } catch (error) {
            throw { status: 500, message: "Error update record" };
        }
    };

    deleteById = async (id) => {
        const transaction = await sequelize.transaction();
        try {
            if (id === 0) {
                return null;
            };
            const eventExist = await Event.findByPk(id, { transaction: transaction });
            if (eventExist) {
                const playersDeleted = await Player.destroy({ where: { eventId: id } }, { transaction: transaction });
                const eventDeleted = await Event.destroy({ where: { id: id } });
                await transaction.commit();
                return { event: eventDeleted, players: playersDeleted };
            };
            return null;
        } catch (error) {
            throw { status: 500, message: "Error deleted record" };
        }
    };
}