import { handleAsyncError } from "../../../middleware/handelAsyncError.js"
import { AppError } from "../../../utils/appError.js"
import { deleteOne } from "../../handlers/apiHandler.js"
import couponModel from "../../../../database/models/coupon.model.js"

export const addCoupon=handleAsyncError(async(req,res)=>{

    let preCoupon= new couponModel(req.body)
    let addedCoupon=await preCoupon.save()
    res.status(201).json({message:"added",addedCoupon})
})

export const getAllCoupon=handleAsyncError(async(req,res)=>{
    let allCoupons= await couponModel.find();
    res.json({message:"allCoupons",allCoupons})
}) 

export const getCouponById=handleAsyncError(async(req,res,next)=>{
    let coupon= await couponModel.findById(req.params.id)
    coupon&&res.json({message:"coupon",coupon})
    !coupon&&next(new AppError("coupon Not Found",404))
    //res.json({message:"not found"})
 }) 


export const updateCoupon=handleAsyncError(async(req,res,next)=>{
    let updatedCoupon= await couponModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    updatedCoupon&&res.json({message:"updated",updatedCoupon})
    !updatedCoupon&&next(new AppError("Coupon Not Found",404))
    //res.json({message:"brand not found"})
})

export const deleteCoupon=deleteOne(couponModel)


