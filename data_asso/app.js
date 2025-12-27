const express = require('express')
const app = express()
const userModel = require('./models/user')
const postsModel = require('./models/posts')

app.get("/",(req,res)=>{
    res.send("eh")
})

app.listen(5000)