import {handleAsyncError} from "../../../middleware/handelAsyncError.js"
import { AppError } from "../../../utils/appError.js"
import { deleteOne } from "../../handlers/apiHandler.js"
import userModel from "../../../../database/models/user.model.js"

export const addUser=handleAsyncError(async(req,res,next)=>{
    let user=await userModel.findOne({email:req.body.email})
    if(user)
    {
       return next(new AppError("duplicated email",409))
    } 
    let preUser= new userModel(req.body)
    let addedUser=await preUser.save()
    res.status(201).json({message:"added",addedUser})
})

export const getAllUser=handleAsyncError(async(req,res)=>{
    let allUsers= await userModel.find();
    res.json({message:"allusers",allUsers})
}) 

export const getUserById=handleAsyncError(async(req,res,next)=>{
    let user= await userModel.findById(req.params.id)
    user&&res.json({message:"user",user})
    !user&&next(new AppError("user Not Found",404))
    //res.json({message:"not found"})
 }) 

export const updateUser=handleAsyncError(async(req,res,next)=>{
    let updatedUser= await userModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    updatedUser&&res.json({message:"updated",updatedUser})
    !updatedUser&&next(new AppError("User Not Found",404))
    //res.json({message:"brand not found"})
})

//////////////by user or by admin
export const changePassword=handleAsyncError(async(req,res,next)=>{
    //let updatedUser= await userModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    req.body.changePasswordAt=Date.now();
    /////console.log(req.body.changePasswordAt);
    let updatedUser= await userModel.findOneAndUpdate({_id:req.params.id},req.body,{new:true})
    updatedUser&&res.json({message:"updated",updatedUser})
    !updatedUser&&next(new AppError("User Not Found",404))
    //res.json({message:"brand not found"})
})

export const deleteUser=deleteOne(userModel)