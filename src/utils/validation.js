const validator = require("validator");

const validateSignUpData = (req) =>{
    const{ firstName,lastName,emailId,password} =req.body;

    if(!firstName || !lastName){
        throw new Error("Name is not valid!")
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid!")
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong password")
    }
}
const validateProfileUpdateData = (req) =>{
    const PROFILE_UPDATES =["age","gender","photoUrl","about","skills"];
    const isPROFILE_UPDATES_ALLOWED = Object.keys(req.body).every((feild)=> PROFILE_UPDATES.includes(feild));
    return isPROFILE_UPDATES_ALLOWED;
}
module.exports = {
    validateSignUpData,
    validateProfileUpdateData
}