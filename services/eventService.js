import { Event } from "../models/eventModelSequelize.js";

export default class EventService {

    getAll = async () => {
        try {
            return Event.findAll();
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
        try {
            const eventNew = event.fecha;
            const eventStadium = event.stadium;
            const eventPlayers = event.players;
            return eventPlayers;
        } catch (error) {
            throw { status: 500, message: "Error created record" };
        }
    };

    update = async (event, id) => {
        try {
            const eventEdit = event.fecha;
            const eventStadium = event.stadium;
            const eventPlayers = event.players;
            return eventPlayers;
        } catch (error) {
            throw { status: 500, message: "Error update record" };
        }
    };

    deleteById = async (id) => {
        try {
            return id;
        } catch (error) {
            throw { status: 500, message: "Error deleted record" };
        }
    };
}