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
            throw { status: 500, message: "Error get all" }
        }
    };

    getById = async (id) => {
        try {
            const [player] = await db.query("SELECT * FROM personas WHERE persona_id = ?", [id]);
            return player;
        } catch (error) {
            throw { status: 500, message:`Error get by id ${id}` }
        }
    };

    createNew = async (player) => {
        try {
            await db.query("INSERT INTO personas(nombre,apellido,telefono,email,estado) VALUES(?,?,?,?,?)", [player.nombre, player.apellido, player.telefono, player.email, player.estado]);
        } catch (error) {
            throw { status: 500, message: "Error create record" }
        }
    };

    
    update = async(player) =>{
        try {
            await db.query("UPDATE personas SET nombre = ?,apellido = ?,telefono = ?,email = ?,estado = ? WHERE persona_id = ?",[player.nombre,player.apellido,player.telefono,player.email,player.estado,player.persona_id]);
        } catch (error) {
            throw { status: 500, message: "Error edit record" }
        }
    };

    delete = async(id) => {
        try {
            await db.query("DELETE FROM personas WHERE persona_id = ?",[id]);
        } catch (error) {
            throw { status: 500, message: "Error delete record" }
        }
    };
}