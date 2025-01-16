const express = require("express");

const app = express(); // creating an instance of express


// This will only handle GET call to /user
app.get("/user" ,(req,res)=>{
    res.send({firstname: "Himanshu ",lastname:"Sengar"});
});

app.get("/ab?c" ,(req,res)=>{// ab?c----> conditional rounting
    res.send({firstname: "Himanshu ",lastname:""});
});
app.get("/ab+c" ,(req,res)=>{ // ab+c -----> we can use like this abbbbbbbbbbc we can but as many as b in b/w
    res.send({firstname: "Himanshu ",lastname:"Sengar"});
});
app.get("/ab*cd" ,(req,res)=>{ // ab*cd ------> we can put anything b/w ab and cd abfdgfdghfhcd *  means we can put anything in place of it
    res.send({firstname: "Himanshu ",lastname:"Sengar"});
});
app.get("/a(bc)?d" ,(req,res)=>{ // now here bc is optional
    res.send({firstname: "Himanshu ",lastname:"Sengar"});
});
app.post("/user" ,(req,res)=>{
    console.log(req.query);// this will give user request param
    res.send("Data saved successfully ");
})
app.get("/user/:userId" ,(req,res)=>{ // this will give user id from the url
    console.log(req.params)
    res.send({firstname: "Himanshu ",lastname:"Sengar"});
});
app.get("/user/:userId/:name/:password" ,(req,res)=>{ // this is dynamic param
    console.log(req.params);
    res.send({firstname: "Himanshu ",lastname:"Sengar"});
});
app.delete("/user" ,(req,res)=>{
    res.send("Data delete successfully ");
})

// this route will match all the http method API calls to/test
app.use("/test",(req,res)=>{
    res.send("Hello from the server");
})// request handler func

app.listen(3000 , ()=>{
    console.log("server is successfuly listen on port 3000");
});