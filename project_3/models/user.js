const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/project3');


const userSchema = mongoose.Schema({
    userName: String,
    name :String,
    age : String,
    email: String,
    password: String
});



module.exports = mongoose.model('user', userSchema);