import playerModel from "../models/playerModel.js";
export default class PlayerController{
    player = new playerModel();

    getAll = async(req,res)=>{
        try {
            let players = await this.player.getAll();
            res.json(players);
        } catch (error) {
            throw { status: 500, message: "Error en el controlador eventos" };
        }
    }

    postPlayer = async(req,res) => {
        try {
            const player = {
                nombre:req.body.nombre,
                apellido:req.body.apellido,
                telefono:req.body.telefono,
                email:req.body.email,
                estado:"Pendiente",
            }
            res.json(player);
        } catch (error) {
            throw { status: 500, message: error };
        }
    }
}