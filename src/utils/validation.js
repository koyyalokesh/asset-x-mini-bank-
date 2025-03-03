const validator = require('validator');

const validateSignupData = (req)=>{
    const {fullName, email, password} = req.body;
    if(!fullName){
        throw new Error("Name is not valid")
    }else if(!validator.isEmail(email)){
        throw new Error("email is not valid")
    }else if(!validator.isStrongPassword(password)){
        throw new Error("please enter a strong password")
    }
};

module.exports = validateSignupData;
  