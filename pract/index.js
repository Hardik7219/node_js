const express = require("express");
const app = express();//express app
const path = require('path') //for path

app.use(express.json());
app.use(express.urlencoded({ extended: true }));//we can use form values
app.set('view engine','ejs')//render ejs 
app.use(express.static(path.join(__dirname,'public')));//can use css js static files

app.get("/", (req, res) => {
  res.render("index");//rendering the ejs page that is located in public folder
});
app.get("/profile/:user",(req,res)=>{
  let a=req.params.user
  res.send(a);
})
app.listen(300, () => {
  console.log("RUNNING");//running the server
});
