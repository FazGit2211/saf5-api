import PlayerService from "../services/playerService.js";

const playerService = new PlayerService();

export const getPlayers = async (req, res) => {
    try {
        const players = await playerService.getAll();
        if (players.length > 0) {
            res.status(200).json({ ok: true, statusCode: 200, message: "Get success", info: players });
        } else {
            res.status(200).json({ ok: true, statusCode: 200, message: "No players found", info: [] });
        }
    } catch (error) {
        res.status(500).json({ ok: false, statusCode: 500, message: 'Error get all' })
    };
};

export const getPlayer = async (req, res) => {
    try {
        const idPlayer = parseInt(req.params.id);
        if (idPlayer !== undefined || idPlayer !== null) {
            const playerFind = await playerService.getById(idPlayer);
            res.status(200).json({ ok: true, statusCode: 200, message: "Update ok", info: playerFind });
        } else {
            res.status(200).json({ ok: true, statusCode: 200, info: "Undefined or Empty params." });
        };
    } catch (error) {
        res.status(500).json({ ok: false, statusCode: 500, message: `Error get.` })
    };
};

export const createPlayer = async (req, res) => {
    try {
        const playerCreated = await playerService.createNew(req.body);
        res.status(200).json({ ok: true, statusCode: 200, message: "Created ok", info: playerCreated });
    } catch (error) {
        res.status(500).json({ ok: false, statusCode: 500, message: "Error create record" })
    };
};

export const createPlayerAddEvent = async (req, res) => {
    try {
        const idEvent = parseInt(req.params.id);
        if (idEvent !== undefined && idEvent !== null) {
            const playerCreated = await playerService.createNew(idEvent, req.body);
            res.status(200).json({ ok: true, statusCode: 200, message: "Created ok", info: playerCreated });
        } else {
            res.status(200).json({ ok: true, statusCode: 200, info: "Undefined or Empty params." });
        };
    } catch (error) {
        res.status(500).json({ ok: false, statusCode: 500, message: "Error create record" });
    }
}


export const updatePlayer = async (req, res) => {
    try {
        const idPlayer = parseInt(req.params.id);
        if (idPlayer !== undefined || idPlayer !== null) {
            const playerEdit = await playerService.update(idPlayer, req.body);
            res.status(200).json({ ok: true, statusCode: 200, message: "Update ok", info: playerEdit });
        } else {
            res.status(200).json({ ok: true, statusCode: 200, info: "Undefined or Empty params." });
        };
    } catch (error) {
        res.status(500).json({ ok: false, statusCode: 500, message: "Error Updated record" });
    };
};

export const deletePlayer = async (req, res) => {
    try {
        const idPlayer = parseInt(req.params.id);
        if (idPlayer !== undefined || idPlayer !== null) {
            const playerDeleted = await playerService.delete(idPlayer);
            res.status(200).json({ ok: true, statusCode: 200, message: "Deleted Record", info: playerDeleted });
        } else {
            res.status(200).json({ ok: true, statusCode: 200, info: "Undefined or Empty params." });
        };
    } catch (error) {
        res.status(500).json({ ok: false, statusCode: 500, message: "Error Deleted Record" });
    };
};