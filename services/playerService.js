import Player from "../models/playerModelSequelize.js";

export default class PlayerService {
    getAll = async () => {
        try {
            return await Player.findAll();
        } catch (error) {
            throw { status: 500, message: "Error update record" };
        };
    };

    getById = async (id) => {
        try {
            if (id === 0) {
                return null;
            };
            return await Player.findByPk(id);
        } catch (error) {
            throw { status: 500, message: "Error update record" };
        };
    };

    createNew = async (player) => {
        try {
            const playerNew = {
                name: player.name, surname: player.surname, phoneNumber: player.phoneNumber, email: player.email, state: "Pendiente"
            };
            if ((playerNew.name === "") || (playerNew.surname === "") || (playerNew.email === "")) {
                return null;
            };
            return await Player.create(playerNew);
        } catch (error) {
            throw { status: 500, message: "Error update record" };
        };
    };


    update = async (player, id) => {
        try {
            const playerEdit = player;
            if ((playerEdit.name === "") && (playerEdit.surname === "") && (playerEdit.email === "") && (playerEdit.phoneNumber === "") && (playerEdit.state === "")) {
                return null;
            };
            return await Player.create(playerEdit, { where: { playerId: id } });
        } catch (error) {
            throw { status: 500, message: "Error update record" };
        };
    };

    deleteById = async (id) => {
        try {
            if (id === 0) {
                return null;
            };
            return await Player.destroy({ where: { playerId: id } })
        } catch (error) {
            throw { status: 500, message: "Error update record" };
        };
    };
}