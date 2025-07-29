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

    getById = async (codigo) => {
        try {
            return await Event.findOne({ where: { codigo: codigo }, include: [Stadium, Player] });
        } catch (error) {
            throw { status: 500, message: "Error get record" };
        }
    };

    createNew = async (event) => {
        const transaction = await sequelize.transaction();
        try {
            //crear primero el objeto estadio por la relacion uno a uno entre evento
            const stadiumCreated = await Stadium.create({ name: event.stadium.name, address: event.stadium.address }, { transaction: transaction });
            //crear el objeto evento y setearle el estadio id y despues relacionar con los jugadores 
            const eventCreated = await Event.create({ codigo: event.codigo, date: event.date, StadiumId: stadiumCreated.id }, { transaction: transaction });
            //recorrer y asociar a cada uno de los jugadores con el evento para poder crear la relacion del lado muchos
            const players = event.players;
            const addPlayers = players.map((elem) => ({
                ...elem, EventId: eventCreated.id, state: "Pendiente"
            }));
            //crear a todos los jugadores al mismo tiempo
            const createPlayers = await Player.bulkCreate(addPlayers, { transaction: transaction });
            await transaction.commit();
            return { eventCreated, playersCreated: createPlayers, stadium: stadiumCreated };
        } catch (error) {
            throw { status: 500, message: "Error created record" };
        }
    };

    update = async (event, id) => {
        try {
            if (event.date === '') {
                return 0;
            }
            const eventEdit = await Event.update({ date: event.date }, { where: { id: id } });
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
                const playersDeleted = await Player.destroy({ where: { id: id } }, { transaction: transaction });
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