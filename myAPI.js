//conectando mongo, express y body
const express = require("express");
const db = require('./config');
const User = require('./models/User.model')
const bodyParser = require('body-parser');
var cors = require('cors')


const app = express();
const PORT = 5555;

//middleware para pasar datos
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.use(cors())

//send html

// app.get("/*",(req,res)=>{
//     res.sendFile(__dirname + "/dist/index.html")
// });

//manejar el envio del formulario 
app.post("/users/add", async (req,res)=>{

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
});


//ontener el usuario agregado

app.get("/users/:userId", async (req,res)=>{
    try{
        const userID=req.params.userId;

        const user = await User.findById(userID);

        if(!user){
            return res.status(404).json({error:"Usuario no encontrado"});

        }
        res.json(user);
    }catch (err){
        console.error("Error mostrando usuario: ", err);
        res.status(500).json({error: "Error mostrando usuario0"});
    }
})


// obtener todos los usurios 


app.get("/users", async (req,res)=>{
    try{
       
        const users = await User.find();

        res.status(200).json(users);
    }catch (err){
        console.error("Error mostrando usuario: ", err);
        res.status(500).json({error: "Error mostrando usuario0"});
    }
})


//delete user

app.delete("/users/:userId", async (req,res)=>{
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
});

// Star el serve

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
});
