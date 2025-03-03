const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');''
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:50,
    },
    email:{
        type:String,
        required: true,
        unique:true,
        lowercase: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address : " + value);
            }
        }

    },
    phone: {
        type: String,
        required: true,
        unique: true,
        match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number'],
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("enter strong password :"+value)
            }
        }
        
    },
    gender: {
        type: String,
        enum: {
          values: ["male", "female", "other"],
          message: `{VALUE} is not a valid gender type`,
        },

    },
});


userSchema.methods.getJWT = async function(){
    const user = this;
    const token = await jwt.sign({_id:user._id}, "DEVTINDER@630501",{
    expiresIn:"7d"
    });
    return token;
};

userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(
        passwordInputByUser,
        passwordHash
    );
    return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);