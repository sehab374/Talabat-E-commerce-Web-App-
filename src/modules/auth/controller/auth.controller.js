import userModel from "../../../../database/models/user.model.js";
import { handleAsyncError } from "../../../middleware/handelAsyncError.js";
import { AppError } from "../../../utils/appError.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const signUp = handleAsyncError(async (req, res, next) => {
    const isFound = await userModel.findOne({ email: req.body.email })
    if (isFound) {
        return next(new AppError("Already register", 409))
    }
    else {
        let preUser = new userModel(req.body)
        let addedUser = await preUser.save()
        res.status(201).json({ message: "added", addedUser })
    }
})
export const signIn = handleAsyncError(async (req, res, next) => {
    const isFound = await userModel.findOne({ email: req.body.email })
    const match = bcrypt.compareSync(req.body.password, isFound.password)
    if (isFound && match) {
        let token = jwt.sign({ name: isFound.name, userId: isFound._id, role: isFound.role }, process.env.USERSECRETKEY)
        return res.json({ message: "sucess", token })
    }
    next(new AppError("incorrect email or password", 401))
})
//////////////////////////////////////////////////////////////////////////////////////////////////////////this is a meddleware used in add product
export const protectRoutes = handleAsyncError(async (req, res, next) => {
    /////steps
    /////1-check if we have token or not
    let token = req.header("token")
    if (!token) {
        return next(new AppError("please provide ur token", 401))
    }
    /////2-verify token 
    let decoded = await jwt.verify(token, process.env.USERSECRETKEY)
    /////3-check if user exist or not
    let user = await userModel.findById(decoded.userId)
    if (!user) {
        return next(new AppError("invalid user", 404))
    }
    /////4-check if this token is the last one or not
    if (user.changePasswordAt) {
        let changePasswordTime = parseInt(user.changePasswordAt.getTime() / 1000)
        //console.log("=====changePasswordTime======", changePasswordTime);
        if (changePasswordTime > decoded.iat) {
            return next(new AppError("token invalid", 401))
        }
    }
    //////////////////////////////////////////////////////////use it in next middleware
    req.user=user;
    next()
})
//export const signUp = handleAsyncError(async (req, res, next) => {


export const allowTo=(...roles)=>{
     return (req,res,next)=>{
        ///////req.user => take it from previous middleware => protectRoutes
        if(!roles.includes(req.user.role))
        {
            return next(new AppError("not authirzed", 403))
        }
        next()
     }
}
