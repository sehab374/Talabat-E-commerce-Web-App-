import mongoose from "mongoose";
import bcrypt from 'bcrypt';
const schema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"user name is required"],
        minLength:[1,"name is toooo short"],
        trim:true,
    },
     email:{
        type:String,
        trim:true,
        required:[true,"email is required"],
        minLength:[1,"email is toooo short"],
        unique:[true,"email must be unique"],
    },
    password:{
        type:String,
        required:true,
        minLength:[6,"minLength is 6"],

    },
    phone:{
        type:String,
        required:[true,"phone is required"],
    },
    profilePic:String,
    role:{
        type:String,
        enums:["admin","user"],
        default:"user"
    },
    changePasswordAt:Date,
    isActive:{
        type:Boolean,
        default:true
    },
    isVerfied:{
        type:Boolean,
        default:false
    },
    wishList:[{
        type:mongoose.Types.ObjectId,
        ref:"Product"
    }],
    isBlocked:{
        type:Boolean,
        default:false
    },
   
},{timestamps:true});
///////////////////////////////////////////mongoose middleware
schema.pre("save",function() {
    this.password = bcrypt.hashSync(this.password, 7);
})
schema.pre("findOneAndUpdate",function() {
    this._update.password=bcrypt.hashSync(this._update.password,7)
})



const userModel= mongoose.model("User",schema)
export default userModel;
