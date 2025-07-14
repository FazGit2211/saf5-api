import EventService from "../services/eventService.js";

const eventService = new EventService();

export const getAll = async (req, res) => {
    try {
        let events = await eventService.getAll();
        if (events.length === 0) {
            res.status(200).json({ message: "No event found", data: [] });
        } else {
            res.status(200).json(events);
        }
    } catch (error) {
        res.status(500).json({ ok: false, statusCode: 500, message: 'Error get all' });
    }
};

export const getById = async (req, res) => {
    try {
        const codigo = req.params.codigo;
        const eventFind = await eventService.getById(codigo);
        if (eventFind.equals(null)) {
            res.status(200).json({ message: "No event found", data: [] });
        } else {
            res.status(200).json(eventFind);
        }
    } catch (error) {
        res.status(500).json({ ok: false, statusCode: 500, message: `Error get by id ${id}` });
    }
};

export const createNew = async (req, res) => {
    try {
        const event = await eventService.createNew(req.body);
        res.status(200).json({ ok: true, statusCode: 200, message: "Created ok", data: event });
    } catch (error) {
        res.status(500).json({ ok: false, statusCode: 500, message: "Error create record" });
    }
};

export const update = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const eventEdit = await eventService.update(req.body, id);
        if (eventEdit.length === 0) {
            res.status(200).json({ ok: true, statusCode: 200, message: "Empty values ok" });
        } else {
            res.status(200).json({ ok: true, statusCode: 200, message: "Update ok" });
        }
    } catch (error) {
        res.status(500).json({ ok: false, statusCode: 500, message: "Error Updated record" });
    }
};

export const deleteById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const deleted = await eventService.deleteById(id);
        if (deleted === null) {
            res.status(200).json({ ok: true, statusCode: 200, message: "Empty values" });
        } else {
            res.status(200).json({ ok: true, statusCode: 200, message: "Deleted ok", data: deleted });
        }
    } catch (error) {
        res.status(500).json({ ok: false, statusCode: 500, message: "Error Deleted Record" });
    }
};
