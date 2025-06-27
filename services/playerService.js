import { Player } from "../models/playerModelSequelize.js";

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
            const playerNew = player;
            if ((playerNew.nombre === "") || (playerNew.apellido === "") || (playerNew.email === "")) {
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
            if ((playerEdit.nombre === "") && (playerEdit.apellido === "") && (playerEdit.email === "") && (playerEdit.telefono === "") && (playerEdit.estado === "")) {
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