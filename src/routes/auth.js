const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const User = require('../models/user');
const validateSignupData = require('../utils/validation')

authRouter.post('/signup', async(req,res)=>{
   try{                 
    validateSignupData(req);
    const { fullName,email,phone, password, gender } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
        fullName,
        email,
        phone,
        password:passwordHash,
        gender
    });

    const savedUser = await user.save();
    const token = await savedUser.getJWT();
    res.cookie("token", token, {  
        expires: new Date(Date.now() + 8 * 3600000),
      });
    res.json({ message: "User Added successfully!", data: savedUser });

   }catch(err){
    res.status(400).send("ERROR : " + err.message);
   }
});



authRouter.post('/login', async(req, res)=>{
        try{  

            const {email, password} = req.body;
            if(!validator.isEmail(email)){
                throw new Error("emailId is not valid")
            }
            const user = await User.findOne({email:email});
            if(!user){
                throw new Error('invalid credentials');
            }         
            const isPasswordValid = await user.validatePassword(password);
            if(isPasswordValid){
                const token = await user.getJWT();
                res.cookie("token", token, {
                expires: new Date(Date.now() + 8*3600000),
                });
                res.json({message:"login succesfull!", data:user});
            }else{
                throw new Error("invalid credentials");
            }
               
        }catch(err){
            res.status(400).send("ERROR : "+err.message);
        }
    });

authRouter.post('/logout', async(req,res)=>{
        res.cookie("token", null, {
            expires : new Date(Date.now()),
        });
        res.send("logout successfull..")
})

module.exports = authRouter;