const mongoose = require("mongoose");

const connectDB = async() =>{
    await mongoose.connect(
       
        "mongodb+srv://sengarhimanshu583:" + process.env.MONGODB_PSWD + "@cluster0.kd9dn.mongodb.net/DevTinder"
        
    );
};

module.exports={
    connectDB
}