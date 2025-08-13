import EventService from "../services/eventService.js";

const eventService = new EventService();

export const getEvents = async (req, res) => {
    try {
        const events = await eventService.getAll();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ ok: false, statusCode: 500, message: 'Error get all' });
    }
};

export const getEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const eventFind = await eventService.getById(id);
        res.status(200).json(eventFind);
    } catch (error) {
        res.status(500).json({ ok: false, statusCode: 500, message: `Error get by id ${id}` });
    }
};

export const createEvent = async (req, res) => {
    try {
        const event = await eventService.createNew(req.body);
        res.status(200).json({ ok: true, statusCode: 200, message: "Created ok", data: event });
    } catch (error) {
        res.status(500).json({ ok: false, statusCode: 500, message: "Error create record" });
    }
};

export const updateEvent = async (req, res) => {
    try {
        const { id } = parseInt(req.params);
        const eventUpdated = await eventService.updateById(req.body, id);
        res.status(200).json({ ok: true, statusCode: 200, message: "Updated ok", data: eventUpdated });
    } catch (error) {
        res.status(500).json({ ok: false, statusCode: 500, message: "Error Updated record" });
    }
};

export const deleteEvent = async (req, res) => {
    try {
        const { id } = parseInt(req.params);
        const deleted = await eventService.deleteById(id);
        if (deleted === null) {
            res.status(200).json({ ok: true, statusCode: 200, message: "Empty values or event not exist" });
        } else {
            res.status(200).json({ ok: true, statusCode: 200, message: "Deleted ok", data: deleted });
        }
    } catch (error) {
        res.status(500).json({ ok: false, statusCode: 500, message: "Error Deleted Record" });
    }
};
