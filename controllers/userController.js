const User = require('../models/User.model')

const addUser = async (req,res)=>{

    try{
        const {name,email} = req.body;
        console.log("REQ.BODY", req.body);
        if (!name || !email) throw new Error("Check your inputs")
        const newUser = new User({ name, email });
        await newUser.save();

        res.sendStatus(200)
        
    

    }catch (err){
        console.error("Error insertando el documento:", err);
        res.status(500).send("error agregando usuario");

    }
}


const getUsers = async (req,res)=>{
    try{

        const users = await User.find();

        res.status(200).json(users);
    }catch (err){
        console.error("Error mostrando usuario: ", err);
        res.status(500).json({error: "Error fetching users"});
    }
}


const deleteUser = async (req,res)=>{
    try{
        const userId=req.params.userId;
        console.log({userId});

        const deleteUser = await User.findByIdAndRemove(userId);

        if(!deleteUser){
            return res.status(404).json({error: "Usuario no encontrado"});

        }

        res.json({mensaje:"Usuario eliminado correctamente"+ deleteUser});

    }catch(err){
        console.error("Error eliminando usuario"+ err);
        res.status(500).json({error: "Error eliminando usuario "})
    }
}


module.exports ={
    addUser,
    getUsers,
    deleteUser
}