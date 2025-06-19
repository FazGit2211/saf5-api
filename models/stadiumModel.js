import db from "../config/db.js";
export default class Stadium {

    constructor(nom, direc) {
        this.nombre = nom;
        this.direccion = direc;
    }

    //Método para obtener a todos los estadios
    getAll = async () => {
        try {
            const [stadiums] = await db.query("SELECT * FROM canchas");
            return stadiums;
        } catch (error) {
            throw { status: 500, message: "Error get all" }
        }
    };

    getById = async(id) => {
        try {
            const [stadium] = await db.query("SELECT * FROM canchas WHERE cancha_id = ?",[id]);
            return stadium;
        } catch (error) {
            throw { status: 500, message: `Error get by id ${id}` }
        }
    };

    createNew = async(stadium) => {
        try {
            await db.query("INSERT INTO canchas(nombre,direccion) VALUES(?,?)",[stadium.nombre,stadium.direccion]);
        } catch (error) {
            throw { status: 500, message: "Error create record" }
        }
    };

    edit = async(stadium) => {
        try {
            await db.query("UPDATE canchas SET nombre = ?, direccion = ? WHERE cancha_id = ?",[stadium.nombre,stadium.direccion,stadium.id]);
        } catch (error) {
            throw { status: 500, message: "Error edit record" }
        }
    };

    delete = async(id) => {
        try {
            await db.query("DELETE FROM canchas WHERE cancha_id = ?",[id]);
        } catch (error) {
            throw { status: 500, message: "Error deleted record" }
        }
    }
}