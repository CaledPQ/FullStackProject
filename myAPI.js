//conectando mongo, express y body
const express = require("express");
require('dotenv').config()
const db = require('./config');
const User = require('./models/User.model')
const bodyParser = require('body-parser');
const userController = require('./controllers/userController')
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
app.post("/users/add", userController.addUser);



// obtener todos los usurios 


app.get("/users", userController.getUsers)


//delete user

app.delete("/users/:userId", userController.deleteUser);

// Star el serve

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
});
