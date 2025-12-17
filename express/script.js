const express = require('express')

const app = express()


app.use((req,res,next)=>{
    console.log("E");
    next();
    
})
app.get('/',(req,res)=>{
    res.send("HEjLO")
})

app.get('/hardik',(req,res,next)=>{
    return next(new Error("Error"));
    res.send("HELLO! WORLD")
})
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(7219);

