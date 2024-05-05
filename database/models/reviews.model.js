import mongoose from "mongoose";
const schema=new mongoose.Schema({
    comment:{
        type:String,
        trim:true,
        required:[true,"review comment required"],
    },
    product:{
        type:mongoose.Types.ObjectId,
        ref:"Product"
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    rating:{
        type:Number,
        min:1,
        max:5
    }
},{timestamps:true});

// // schema.pre("find",function() {
// //     this.populate('user',"name")
// // })

// // schema.pre("findOne",function() {
// //     this.populate('user',"name")
// // })

// schema.pre(["find","findOne"],function() {
//     this.populate('user',["name","email"])
// })

/////any thing start with find
schema.pre(/^find/,function() {
    this.populate('user',["name","email"])
})

const reviewModel=mongoose.model("Review",schema)
export default reviewModel;