const express =require("express");

const app=express();
// if we use this way then we have write the authentication logic in every 
// route handler so intead of this we will use the app.use to do this work
// ---------->>>>>>><<<<<<<<-------------

// app.get("/admin/getAllData",(req,res)=>{
//     const token="xyz";
//     const isAdminAuthorized = token ==='xyz';

//     if(isAdminAuthorized){
//         res.send("All Data sent");
//     }
//     else{
//         res.status(401).send("Unauthorized request");
//     }
// });

// app.get("/admin/DeleteUser",(req,res)=>{
//     res.send("User deleted");
// })

// -------------->>>>>>>><<<<<<<<<<<<<<<------------

app.use("/admin",(req,res,next)=>{
    const token="xz";
    const isAdminAuthorized = token ==='xyz';

    if(!isAdminAuthorized){
        res.status(401).send("Unauthorized request");
    }
    else{
        next();
    }
})

app.get("/admin/getAllData",(req,res)=>{
    console.log("data handler");
    res.send("All Data sent");
})
app.get("/admin/DeleteUser",(req,res)=>{
        res.send("User deleted");
    })

    // now if we can write other route that didn't required this authentication

app.get("/user",(req,res)=>{
    res.send("User details")
})
app.listen(3000,()=>{
    console.log("Server is succesfully Listening on port 3000")
}) 