import { handleAsyncError } from "../../../middleware/handelAsyncError.js"
import { AppError } from "../../../utils/appError.js"
import { deleteOne } from "../../handlers/apiHandler.js"
import userModel from "../../../../database/models/user.model.js"

// export const addCoupon=handleAsyncError(async(req,res)=>{

//     let preCoupon= new couponModel(req.body)
//     let addedCoupon=await preCoupon.save()
//     res.status(201).json({message:"added",addedCoupon})
// })

// export const getAllCoupon=handleAsyncError(async(req,res)=>{
//     let allCoupons= await couponModel.find();
//     res.json({message:"allCoupons",allCoupons})
// }) 

// export const getCouponById=handleAsyncError(async(req,res,next)=>{
//     let coupon= await couponModel.findById(req.params.id)
//     coupon&&res.json({message:"coupon",coupon})
//     !coupon&&next(new AppError("coupon Not Found",404))
//     //res.json({message:"not found"})
//  }) 


export const addToWishList =handleAsyncError( async (req, res, next) => {
    let { productId,userId } = req.body
    // console.log("=====productId======",productId);
    // console.log("=====req.user._id======",req.user._id);
    let result = await userModel.findOneAndUpdate(
        userId ,
         {
         $addToSet: { wishList: productId }
         },
         { new: true }
        );
    console.log(result);
    !result && next(new AppError("already exist", 404))
    result && res.json({ message: "added to wishList", result })
})


