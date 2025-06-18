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
            throw { status: 500, message: error }
        }
    }
}