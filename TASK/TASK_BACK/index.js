const path = require('path');
const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');

app.use(cors());           // allow frontend requests
app.use(express.json());   

app.get('/', (req, res) => {
 res.json({ message: "Hello from Node backend 😎" });
})

app.get('/files',(req,res)=>{

    fs.readdir('./files',(err,files)=>{
      if(err){
        console.log(err);
      } 
      else{
        res.json({ filenames: files });
      }
    })
  })
app.post('/create', (req, res) => {
        const {title ,detail} = req.body;
        fs.writeFile(`./files/${title.split(' ').join("_")}.txt`,detail,(err)=>{
            res.redirect('/');
        })
    
})
app.listen(5000, () => {
  console.log('Server is running on port 3000');
})



