const mongoose = require('mongoose');

// conectar con mongo
mongoose.connect(process.env.DB_URL, {useNewUrlParser:true});
const db= mongoose.connection;

module.exports = db