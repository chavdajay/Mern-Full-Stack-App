const User = require('../models/authModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {handleSuccess, handleError} = require('../utils/responseHandler');

exports.signUp = async(req, res)=>{
    try{

        const {name, email, password} = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!name || !email || !password){
            return handleError(res, "All field are required..", 400);
        }

        if (!emailRegex.test(email)) {
            return handleError(res, "Invalid email format.", 400);
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return handleError(res, "user is already exisit please add new..", 409);
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({name, email, password:hashPassword});
        await newUser.save();
        return handleSuccess(res, "register Successfully.", newUser);

    }catch(err){
        return handleError(res, "Internal Server error", 500);
    }
}

exports.signIn = async(req, res)=>{
    try{

        const {email, password} = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!email || !password){
            return handleError(res, "All field are required..", 400);
        }

        if (!emailRegex.test(email)) {
            return handleError(res, "Invalid email format.", 400);
        }

        const existingUser = await User.findOne({email});
        if(!existingUser){
            return handleError(res, "ID and Password Invalid...!", 401);
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if(!isMatch){
            return handleError(res, "ID and Password Invalid...!", 401);
        }

        const token = jwt.sign(
            {email:existingUser.email, _id:existingUser._id},
            process.env.JWT_SECRET,
            {expiresIn:"24h"}
        );

        return handleSuccess(res, "Login Successfully.", {token, email:existingUser.email});

    }catch(err){
        return handleError(res, "Internal Server error", 500);
    }
}