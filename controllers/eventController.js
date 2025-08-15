import EventService from "../services/eventService.js";

const eventService = new EventService();

export const getEvents = async (req, res) => {
    try {
        const events = await eventService.getAll();
        if (events.length > 0) {
            res.status(200).json({ ok: true, statusCode: 200, message: "Get success", info: events });
        } else {
            res.status(200).json({ ok: true, statusCode: 200, message: "Get success", info: [] });
        }
    } catch (error) {
        res.status(500).json({ ok: false, statusCode: 500, message: 'Error get all' });
    }
};

export const getEvent = async (req, res) => {
    try {
        const code = req.params.id;
        if (code !== undefined || code.trim() !== "" || code !== null) {
            const eventFind = await eventService.getById(code);
            res.status(200).json({ ok: true, statusCode: 200, message: "Update ok", info: eventFind });
        } else {
            res.status(200).json({ ok: true, statusCode: 200, message: "Undefined or Empty code." });
        };
    } catch (error) {
        res.status(500).json({ ok: false, statusCode: 500, message: `Error get by ${code}` });
    }
};

export const createEvent = async (req, res) => {
    try {
        const event = await eventService.createNew(req.body);
        res.status(200).json({ ok: true, statusCode: 200, message: "Created ok", info: event });
    } catch (error) {
        res.status(500).json({ ok: false, statusCode: 500, message: "Error create record" });
    }
};

export const updateEvent = async (req, res) => {
    try {
        const idEvent = parseInt(req.params.id);
        if (idEvent !== undefined || idEvent !== null) {
            const eventUpdated = await eventService.updateById(req.body, idEvent);
            if(eventUpdated.updated){
                res.status(200).json({ ok: true, statusCode: 200, message: "Updated ok", info: eventUpdated });
            }else{
                res.status(200).json({ ok: true, statusCode: 200, data: "Error Update" });
            }
        } else {
            res.status(200).json({ ok: true, statusCode: 200, data: "Undefined or Empty code." });
        };
    } catch (error) {
        res.status(500).json({ ok: false, statusCode: 500, message: "Error Updated record" });
    }
};

export const deleteEvent = async (req, res) => {
    try {
        const idEvent = parseInt(req.params.id);
        if (idEvent !== undefined || idEvent !== null) {
            const deleted = await eventService.deleteById(idEvent);
            res.status(200).json({ ok: true, statusCode: 200, message: "Deleted ok", info: deleted });
        } else {
            res.status(200).json({ ok: true, statusCode: 200, message: "Empty values or event not exist" });
        };
    } catch (error) {
        res.status(500).json({ ok: false, statusCode: 500, message: "Error Deleted Record" });
    }
};
