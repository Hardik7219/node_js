const mongoose = require('mongoose')

mongoose.connect('mongodb:localhost:/27017/dataAs')

const userSchema = mongoose.Schema(
    {
        username: String,
        email : String ,
        age : Number,
        posts:Array
    }
)

module.exports= mongoose.model('user',userSchema)