const http = require('http');
const fs= require('fs');

// fs.writeFile("g1.txt","HELLO",(err)=>console.log("e")
// )
// let msg;
// let msgl = (e)=>{
//     return e;
// }

// fs.readFile("g1.txt","utf-8",(err,data)=>{
//     console.log(data);
//     msgl(data)
// });

// console.log(e)


let server = http.createServer((req,res)=>{
    res.end("e");
})
server.listen(3000);