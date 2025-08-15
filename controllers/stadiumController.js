import StadiumService from "../services/stadiumService.js";

const stadiumService = new StadiumService();

export const getAll = async (req, res) => {
    try {
        const stadiums = await stadiumService.getAll();
        if (stadiums.length === 0) {
            res.status(200).json({ message: "Not found stadiums", data: [] })
        }
        res.status(200).json(stadiums);
    } catch (error) {
        res.status(500).json({ ok: false, statusCode: 500, message: 'Error get all' });
    }
};

export const getById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const stadium = await stadiumService.getById(id);
        res.status(200).json(stadium);
    } catch (error) {
        res.status(500).json({ ok: false, statusCode: 500, message: 'Error get' });
    }
};

export const createNew = async (req, res) => {
    try {
        const stadiumCreated = await stadiumService.createNew(req.body);
        if (stadiumCreated.equals(null)) {
            res.status(200).json({ message: "Empty values" });
        }
        res.status(200).json(stadiumCreated);
    } catch (error) {
        res.status(500).json({ ok: false, statusCode: 500, message: 'Error created record' });
    }
};

export const update = async (req, res) => {
    try {
        const stadiumEdit = await stadiumService.edit(req.body);
        if (stadiumEdit.updatedRecord) {
            res.status(200).json({ ok: true, statusCode: 200, message: "Update ok", info: stadiumEdit });
        } else {
            res.status(200).json({ ok: true, statusCode: 200, info: "Error update record." });
        };
    } catch (error) {
        throw { status: 500, message: "Error update record" };
    }
};

export const deleteById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const stadiumDeleted = await stadiumService.deleteById(id);
        if (stadiumDeleted.equals(null)) {
            res.status(200).json({ message: "Empty id values" });
        }
        res.status(200).json({ err: false, message: "Deleted record", data: stadiumDeleted });
    } catch (error) {
        throw { status: 500, message: "Error delete record" };
    }
};
