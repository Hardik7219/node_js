// const express = require('express');
// const app = express();
// const userModel = require('./user'); 


// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });


// app.get('/create', async (req,res)=>{
//   let users = await userModel.create({
//       name : "HardikParmar",
//       username : "hardik7219",
//       email : "hardik7219@example.com"  
//   });
//   res.send(users);
// })

// app.get('/update', async (req,res)=>{
//   let updateUser = await userModel.findOneAndUpdate({name : "Hardik"},{name : "Hardik parmar"},{new : true});
//   res.send(updateUser);
// })


// app.get('/read', async (req,res)=>{
//   let user= await userModel.find({});
//   res.send(user);
// });


// app.get('/delete', async (req,res)=>{
//   let deleteUser = await userModel.findOneAndDelete();
//   res.send(deleteUser);
// });

// const port = 5000;
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });