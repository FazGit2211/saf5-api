import db from "../config/db.js";
export default class Player {

    constructor(nom, ape, tel, email, estado) {
        this.nombre = nom;
        this.apellido = ape;
        this.telefono = tel;
        this.email = email;
        this.estado = estado;
    }

    getAll = async () => {
        try {
            const [players] = await db.query("SELECT * FROM personas");
            return players;
        } catch (error) {
            throw { status: 500, message: error }
        }
    }

    createNew = async (player) => {
        try {
            await db.query("INSERT INTO personas(nombre,apellido,telefono,email,estado) VALUES(?,?,?,?,?)", [player.nombre,player.apellido,player.telefono,player.email,player.estado]);
        } catch (error) {
            throw { status: 500, message: error }
        }
    }
}