import slugify from "slugify"
import { handleAsyncError } from "../../../middleware/handelAsyncError.js"
import { AppError } from "../../../utils/appError.js"
import { deleteOne } from "../../handlers/apiHandler.js"
import reviewModel from "../../../../database/models/reviews.model.js"

export const addReview=handleAsyncError(async(req,res,next)=>{
    //////to pass id from token which send in headers
    req.body.user=req.user._id;
    ////1 comment for every user in his products which he buy(1user on 1product)
    let isReview=await reviewModel.findOne({user:req.user._id,product:req.body.product})
    if(isReview)
    {
        return next(new AppError("already have review",409))
    }
    let preReview= new reviewModel(req.body)
    let addedReview=await preReview.save()
    res.status(201).json({message:"added",addedReview})
})

export const getAllReview=handleAsyncError(async(req,res)=>{
    let allReviews= await reviewModel.find();
    res.json({message:"allReview",allReviews})
}) 

export const getReviewById=handleAsyncError(async(req,res,next)=>{
    // let review= await reviewModel.findById(req.params.id)
    let review= await reviewModel.findOne({_id:req.params.id})
    review&&res.json({message:"review",review})
    !review&&next(new AppError("Review Not Found",404))
    //res.json({message:"not found"})
 }) 

export const updateReview=handleAsyncError(async(req,res,next)=>{
    
    let updatedReview= await reviewModel.findOneAndUpdate({_id:req.params.id,user:req.user._id},req.body,{new:true})
    updatedReview&&res.json({message:"updated",updatedReview})
    !updatedReview&&next(new AppError("Review Not Found",404))
    //res.json({message:"brand not found"})
})

export const deleteReview=deleteOne(reviewModel)
