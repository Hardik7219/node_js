const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mydatabase');

const userSchema = mongoose.Schema({
    userName: String,
    email: String,
    image: String
});

module.exports = mongoose.model('user', userSchema);