const express = require('express');
const app = express();
const path = require('path');   
const userModel = require('./models/user');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

app.get('/', (req, res) => {
  res.render('index');
}); 

app.get('/read', async (req, res) => {
  let users = await userModel.find();
  res.render('read',{ users: users });
}); 

app.post("/create", async (req, res) => {
    const { userName, email, image } = req.body;
    let user = await userModel.create({
         userName,
         email,
        image
    })
    res.redirect("/read");
});

app.get('/delete/:id', async (req,res)=>{
  let deleteUser = await userModel.findOneAndDelete({_id : req.params.id});
  res.redirect('/read');
});

app.get('/edit/:userid', async (req,res)=>{
  let user = await userModel.findOne({_id: req.params.userid })
  res.render('edit', {user});
})

app.post('/update/:userid', async (req,res)=>{  
  let updateUser = await userModel.findOneAndUpdate({_id : req.params.userid},{
    userName : req.body.newUserName,
    email : req.body.newEmail,
    image : req.body.newImage 
  },{new : true});
  res.redirect('/read');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
}   );  