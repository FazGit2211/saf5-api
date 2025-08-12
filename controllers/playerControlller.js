import PlayerService from "../services/playerService.js";

const playerService = new PlayerService();

export const getPlayers = async (req, res) => {
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

export const getPlayer = async (req, res) => {
    try {
        const { id } = parseInt(req.params);
        const playerFind = await playerService.getById(id);
        res.status(200).json(playerFind);
    } catch (error) {
        res.status(500).json({ ok: false, statusCode: 500, message: `Error get by id ${id}` })
    };
};

export const createPlayer = async (req, res) => {
    try {
        const playerCreated = await playerService.createNew(req.body);
        res.status(200).json(playerCreated);
    } catch (error) {
        res.status(500).json({ ok: false, statusCode: 500, message: "Error create record" })
    };
};


export const updatePlayer = async (req, res) => {
    try {
        const { id } = parseInt(req.params);
        const playerEdit = await playerService.update(id, req.body);
        res.status(200).json({ ok: true, statusCode: 200, message: "Update ok", data: playerEdit });
    } catch (error) {
        res.status(500).json({ ok: false, statusCode: 500, message: "Error Updated record" });
    };
};

export const deletePlayer = async (req, res) => {
    try {
        const { id } = parseInt(req.params);
        const playerDeleted = await playerService.delete(id);
        res.status(200).json({ ok: true, statusCode: 200, message: "Deleted Record", data: playerDeleted });
    } catch (error) {
        res.status(500).json({ ok: false, statusCode: 500, message: "Error Deleted Record" });
    };
};