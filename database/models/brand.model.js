import mongoose from "mongoose";
const schema=new mongoose.Schema({
    title:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        minLength:[3,"title is too short"],
        maxLength:[30,"title is too long"]
    },
    logo:String,
    slug:{
        type:String,
        required:true,
        lowercase:true
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true});

////////full path for images
schema.post("init",function(doc){

    doc.logo=process.env.BASEURL + "uploads/" + doc.logo
})

const brandModel=mongoose.model("Brand",schema)
export default brandModel;