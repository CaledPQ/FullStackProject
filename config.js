const mongoose = require('mongoose');

// conectar con mongo
mongoose.connect("mongodb+srv://calebPQ:RKkIZIwl2e8QsSul@cluster0.phuj0bx.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser:true});
const db= mongoose.connection;

module.exports = db