import PlayerService from "../services/playerService.js";

const playerService = new PlayerService();

export const getAll = async (req, res) => {
    try {
        const players = await playerService.getAll();
        if (players.length === 0) {
            res.status(200).json({ message: "No players found", data: [] });
        }
        res.status(200).json(players);
    } catch (error) {
        res.status(500).json({ ok: false, statusCode: 500, message: 'Error get all' })
    };
};

export const getById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const playerFind = await playerService.getById(id);
        if (playerFind.equals(null)) {
            res.status(200).json({ ok: true, statusCode: 200, message: "Empty id value" });
        }
        res.status(200).json(playerFind);
    } catch (error) {
        res.status(500).json({ ok: false, statusCode: 500, message: `Error get by id ${id}` })
    };
};

export const createNew = async (req, res) => {
    try {
        const playerCreated = await playerService.createNew(req.body);
        if (playerCreated.equals(null)) {
            res.status(200).json({ ok: true, statusCode: 200, message: "Empty values" });
        }
        res.status(200).json(playerCreated);
    } catch (error) {
        res.status(500).json({ ok: false, statusCode: 500, message: "Error create record" })
    };
};


export const update = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const playerEdit = await playerService.update(req.body, id);
        if (playerEdit.equals(null)) {
            res.status(200).json({ ok: true, statusCode: 200, message: "Empty values" });
        }
        res.status(200).json({ ok: true, statusCode: 200, message: "Update ok" });
    } catch (error) {
        res.status(500).json({ ok: false, statusCode: 500, message: "Error Updated record" });
    };
};

export const deleteById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const playerDeleted = await playerService.deleteById(id);
        if (playerDeleted.equals(null)) {
            res.status(200).json({ ok: true, statusCode: 200, message: "Empty id value" });
        }
        res.status(200).json({ ok: true, statusCode: 200, message: "Deleted Record" });
    } catch (error) {
        res.status(500).json({ ok: false, statusCode: 500, message: "Error Deleted Record" });
    };
};