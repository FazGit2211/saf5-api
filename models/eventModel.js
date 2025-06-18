import db from "../config/db.js";
export default class Event {
    constructor(fecha, cancha) {
        this.fecha = fecha;
        this.cancha = cancha;
    }

    //Método para obtener a todos
    getAll = async () => {
        try {
            const [results] = await db.query("SELECT * FROM eventos");
            return results;
        } catch (error) {
            throw { status: 500, message: "Error al obtener los datos" }
        }
    };

    //Método para crear
    /*createNew = async (event) => {
        try {
            await db.query("INSERT INTO personas (nombre,apellido,telefono,estado) VALUES(?,?,?,?)", [player.nombre, player.apellido, player.telefono, player.estado]);
        } catch (error) {
            throw { status: 500, message: "Error al crear los datos" }
        }
    }*/
}