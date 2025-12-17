const path = require('path');
const express = require('express');
const app = express();
const fs = require('fs');
const { log } = require('console');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    fs.readdir(`./files`, (err, files) => {
        res.render('index',{ filesList: files });
    })
});
app.post('/create', (req, res) => {
    fs.writeFile(`./files/${req.body.title.split(' ').join("_")}.txt`,req.body.detail,(err)=>{
        res.redirect('/');
    })
});
app.get('/edit/:filename',(req,res)=>{
    res.render('edit',{filename: req.params.filename})
})

app.post('/edit',(req,res)=>{
    fs.rename(`./files/${req.body.old1}`,`./files/${req.body.new1}`,(e)=>{
           res.redirect('/');
    })
 
})
app.get('/files/:filename', (req, res) => {
    fs.readFile(`./files/${req.params.filename}`, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error reading file');
            return;
        }
        res.send(`<h1>${req.params.filename}</h1><pre>${data}</pre>`);
    });
});
app.post('/delete', (req, res) => {
    fs.rm(`./files/${req.body.title1.split(' ').join("_")}.txt`, (err) => {
        if(err){
            console.log(err);
        }
        res.redirect('/');
    })
})
app.listen(3000, () => {
  console.log('Server is running on port 3000');
})