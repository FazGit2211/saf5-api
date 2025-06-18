import Event from "../models/eventModel.js";

export default class EventController {
    eventModel = new Event();
    getAll = async (req, res) => {
        try {
            let events = await this.eventModel.getAll();
            res.json(events);
        } catch (error) {
            throw { status: 500, message: "Error en el controlador eventos" }
        }
    };
}