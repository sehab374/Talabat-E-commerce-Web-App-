import mongoose from "mongoose";
const schema=new mongoose.Schema({
    code:{
        type:String,
        unique:true,
        required:[true,"coupon code required"],
        trim:true,
    },
    ///percentage,fixed
    discound:{
        type:Number,
        min:0,
        required:[true,"coupon discound required"],

    },
    expires:{
        type:Date,
        required:[true,"coupon date required"],
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
   
},{timestamps:true});

const couponModel=mongoose.model("Coupon",schema)
export default couponModel;