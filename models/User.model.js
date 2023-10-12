const mongoose = require('mongoose');
// definir un modelo de datos 

const User = mongoose.model("User",{
    name:String,
    email:String,
})

module.exports = User