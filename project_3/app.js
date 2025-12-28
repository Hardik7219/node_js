const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const userModel = require('./models/user');
const postModel =  require('./models/post');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { log } = require('console');

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
});


app.get('/profile',isLogedIn, async (req, res) => {
    let user = await userModel.findOne({email: res.user.email}).populate("posts");
    res.render('profile' , {user: user});  
});

app.post('/register',  async (req, res) => {
    const {userName, name, age, email, password} = req.body;
    let user = await userModel.findOne({email: email});
    if(user){
        return res.send("User already exists");
    }
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let user = await userModel.create({
                userName,
                name,
                email,
                age,
                password: hash
            })
            let token = jwt.sign({email: email , userid: user._id},"secret");
            res.cookie('token', token);
            res.send("done")
        })
    })
});


app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    let user = await userModel.findOne({email: email});
    if(!user){
        return res.send("User does not exist");
    }
    bcrypt.compare(password, user.password, (err, result) => {
        if(result){
            let token = jwt.sign({email: email , userid: user._id},"secret");
            res.cookie('token', token);
            res.status(200).send("Login successful");
        }
        else res.redirect('/login');
    });
});

app.get('/logout', (req, res) => {
    res.cookie('token',"");
    res.redirect('/login');
});


app.post('/posts', isLogedIn, async (req,res) => {
let user = await userModel.findOne({email: res.user.email});
let {content} = req.body;

let post = await postModel.create({
    content,
    user: user._id
})

user.posts.push(post._id);
await user.save();
res.redirect('/profile');
});


app.get('/likes/:postId', isLogedIn, async (req,res) => {
let post = await postModel.findOne({_id: req.params.postId }).populate("user");
if(post.likes.indexOf(res.user.userid) === -1){
    post.likes.push(res.user.userid);
}
else {
    post.likes.splice(post.likes.indexOf(res.user.userid), 1);   
}
await post.save();
res.redirect('/profile');
});
function isLogedIn(req, res, next){
    const token = req.cookies.token;
    if(token === ""){
        res.send("Login first");
    }
    else {
            let data= jwt.verify(token, "secret", (err, decoded) => {
                return decoded;
            })
            res.user = data ;
            next();
        }
}
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

