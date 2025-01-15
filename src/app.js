const express = require("express");

const app = express(); // creating an instance of express

app.use("/test",(req,res)=>{
    res.send("Hello from the server");
})// request handler func
app.use("/hello",(req,res)=>{
    res.send("Hello hello heloo");
})
app.use("/bye",(req,res)=>{
    res.send("Bye bye bye");
})
app.use("/chai",(req,res)=>{
    res.send("chai bye chai");
})

app.listen(3000 , ()=>{
    console.log("server is successfuly listen on port 3000");
});