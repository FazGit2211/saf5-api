import stadiumModel from "../models/stadiumModel.js";
export default class StadiumController{
    stadium = new stadiumModel();

    getAll = async(req,res) => {
        try {
            let stadium = await this.stadium.getAll();
            res.json(stadium);  
        } catch (error) {
            throw { status: 500, message: "Error en el controlador eventos" }
        }
    }
}