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
    slug:{
        type:String,
        required:true,
        lowercase:true
    },
    image:String,
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }

},{timestamps:true});
////////full path for images
schema.post("init",function(doc){

    doc.image=process.env.BASEURL + "uploads/" + doc.image
})

const categoryModel=mongoose.model("Category",schema)
export default categoryModel;