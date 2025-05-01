const Blog = require('../models/blogModel');
const {handleSuccess, handleError} = require('../utils/responseHandler');

exports.createUser = async(req, res)=>{
    try{
        const newUser = new Blog(req.body);
        await newUser.save();
        return handleSuccess(res, "Create blog successfully", newUser);
    }catch(err){
        console.error(err);
         return handleError(res, "Internal server error", 500);
    }
}

exports.fetchUsers = async(req, res)=>{
    try{
        const users = await Blog.find({});
        return handleSuccess(res, 'Fetch blog successfully', users)
    }catch(err){
         return handleError(res, "Internal server error", 500);
    }
}

exports.updateUsers = async(req, res)=>{
    try{
        const user = await Blog.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if(!user) return handleError(res, "User not Found", 401);
        return handleSuccess(res, "BLog Updated Successfuly.", user);
    }catch(err){
        return handleError(res, "Internal server error", 500)
    }
}
exports.deleteUsers = async(req, res)=>{
    try{
        const user = await Blog.findByIdAndDelete(req.params.id);
        if(!user) return handleError(res, "User not Found", 401);
        return handleSuccess(res, "blog Delete Successfuly.");
    }catch(err){
        return handleError(res, "Internal server error", 500)
    }
}