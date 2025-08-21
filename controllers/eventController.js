import errors from "../middlewares/errors.js";
import EventService from "../services/eventService.js";

const eventService = new EventService();

export const getEvents = async (req, res) => {
    try {
        const events = await eventService.getAll();
        if (events.length > 0) {
            res.status(200).json({ message: "Get success", info: events });
        } else {
            errors.error404(req, res, { info: "Event not found." })
        }
    } catch (error) {
        res.status(500).json({ message: 'Error get all' });
    }
};

export const getEvent = async (req, res) => {
    try {
        const code = req.params.id;
        if (code !== undefined || code.trim() !== "" || code !== null) {
            const eventFind = await eventService.getById(code);
            if (eventFind === null) {
                errors.error404(req, res, { info: "Event not found." })
            } else {
                res.status(200).json({ message: "Get ok", info: eventFind });
            };
        } else {
            res.status(200).json({ message: "Undefined or Empty code." });
        };
    } catch (error) {
        errors.error500(req, res, error);
    }
};

export const createEvent = async (req, res) => {
    try {
        const event = await eventService.createNew(req.body);
        if (event.eventCreated) {
            res.status(201).json({ message: "Created ok", info: event.eventCreated });
        } else {
            errors.error400(req, res, { message: "Created error", info: null });
        }
    } catch (error) {
        errors.error500(req, res, error);
    }
};

export const updateEvent = async (req, res) => {
    try {
        const idEvent = parseInt(req.params.id);
        if (idEvent !== undefined || idEvent !== null) {
            const eventUpdated = await eventService.updateById(req.body, idEvent);
            if (eventUpdated.updated) {
                res.status(200).json({ message: "Updated ok", info: eventUpdated });
            } else {
                errors.error400(req, res, { message: "Updated error", info: null });
            }
        } else {
            errors.error400(req, res, { info: null });
        };
    } catch (error) {
        errors.error500(req, res, error);
    }
};

export const deleteEvent = async (req, res) => {
    try {
        const idEvent = parseInt(req.params.id);
        if (idEvent !== undefined || idEvent !== null) {
            const deleted = await eventService.deleteById(idEvent);
            if (deleted.data.length === 0) {
                res.status(200).json({ message: "Deleted ok", info: deleted.data });
            };
        } else {
            errors.error400(req, res, { info: null });
        };
    } catch (error) {
        errors.error500(req, res, error);
    }
};
