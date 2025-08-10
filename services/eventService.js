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

    update = async (event, code) => {
        try {
            const transactionEvent = await sequelize.transaction();
            //actualizar el evento
            await Event.update({ date: event.date }, { where: { codigo: code }, transaction: transactionEvent });
            //buscar e obtener el id para poder actualizar el estadio relacionado
            const eventUpdated = await Event.findOne({ where: { codigo: code }, transaction: transactionEvent });
            //actualizar la entidad estadio mediante el id obtenido en al actualizar evento
            await Stadium.update({ name: event.stadium.name, address: event.stadium.address }, { where: { id: eventUpdated.id }, transaction: transactionEvent });
            //actualizar a los jugadores por el id del evento
            event.players.forEach((p) => (
                this.updatePlayer(p, eventUpdated.id)
            ));
            await transactionEvent.commit();
            return { eventUpdated };
        } catch (error) {
            throw { status: 500, message: "Error update record" };
        }
    };

    updatePlayer = async (player, eventId) => {
        await Player.update({ name: player.name, surname: player.surname, phoneNumber: player.phoneNumber, email: player.email, state: player.state }, { where: { id: eventId } });
    };

    deleteById = async (code) => {
        try {
            const transaction = await sequelize.transaction();
            const eventExist = await Event.findOne({ where: { codigo: code }, transaction: transaction });
            if (eventExist) {
                const stadiumDeleted = await Stadium.destroy({ where: { id: eventExist.StadiumId }, transaction: transaction });
                const playersDeleted = await Player.destroy({ where: { EventId: eventExist.id } }, { transaction: transaction });
                const eventDeleted = await Event.destroy({ where: { id: eventExist.id }, transaction: transaction });
                await transaction.commit();
                return { data: [] };
            };
            return null;
        } catch (error) {
            throw { status: 500, message: "Error deleted record" };
        }
    };
}