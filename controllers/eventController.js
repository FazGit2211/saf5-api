import EventService from "../services/eventService.js";

const eventService = new EventService();

export const getAll = async (req, res) => {
    try {
        let events = await eventService.getAllEvents();
        if (events.length === 0) {
            res.status(200).json({ message: "No event found", data: [] });
        }
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ ok: false, statusCode: 500, message: 'Error get all' });
    }
};

export const getById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const eventFind = await eventService.getById(id);
        if (eventFind.equals(null)) {
            res.status(200).json({ message: "No event found", data: [] });
        }
        res.status(200).json(eventFind);
    } catch (error) {
        res.status(500).json({ ok: false, statusCode: 500, message: `Error get by id ${id}` });
    }
};

export const createNew = async (req, res) => {
    try {
        if (eventNew.fecha === "") {
            res.status(404).json({ ok: false, statusCode: 404, message: "Empty values" });
        } else {
            const event = await this.eventService.create(req.body);
            console.log(event);
            res.status(200).json({ ok: true, statusCode: 200, message: "Created ok" });
        }
    } catch (error) {
        res.status(500).json({ ok: false, statusCode: 500, message: "Error create record" });
    }
};

export const update = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const eventEdit = {
            fecha: req.body.fecha,
            EstadioId: req.body.estadioId,
        };
        res.status(200).json({ ok: true, statusCode: 200, message: "Update ok" });
    } catch (error) {
        res.status(500).json({ ok: false, statusCode: 500, message: "Error Updated record" });
    }
};

export const deleteById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await eventService.deleteById(id);
        res.status(200).json({ ok: true, statusCode: 200, message: "Deleted ok" });
    } catch (error) {
        res.status(500).json({ ok: false, statusCode: 500, message: "Error Deleted Record" });
    }
};
