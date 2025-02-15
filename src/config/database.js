const mongoose = require("mongoose");

const connectDB = async() =>{
    await mongoose.connect(
        "mongodb+srv://sengarhimanshu583:" + "Kaxsyb17Mests2w5" + "@cluster0.kd9dn.mongodb.net/DevTinder"      
    );
};

module.exports={
    connectDB
}