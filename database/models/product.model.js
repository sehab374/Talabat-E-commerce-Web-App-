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
    description:{
        type:String,
        required:true,
        minLength:[3,"title is too short"],
        maxLength:[300,"title is too long"]
    },
    price:{
        type:Number,
        min:0,
        required:true
    },
    priceAfterDiscound:{
        type:Number,
        min:0,
        required:true
    },
    imageCover:String,
    images:[String],
    sold:{
        type:Number,
        required:true,
        default:0
    },
    quantity:{
        type:Number,
        required:true,
        default:0
    },
    rateCount:Number,
    rateAvag:{
        type:Number,
        min:0,
        max:5
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:"Category"
    },
    subCategory:{
        type:mongoose.Types.ObjectId,
        ref:"SubCategory"
    },
    brand:{
        type:mongoose.Types.ObjectId,
        ref:"Brand"
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }
    ///toObject:{ virtuals: true } =>to enable to make console.log

},{timestamps:true ,toJSON: { virtuals: true },toObject:{ virtuals: true }});

schema.post("init",function(doc){
    doc.images=doc.images.map( ele=>process.env.BASEURL + "uploads/" + ele)
    // for (let index = 0; index < doc.images.length; index++) {
    //     doc.images[index]=process.env.BASEURL + "uploads/" + doc.images[index]
    // }
    doc.imageCover=process.env.BASEURL + "uploads/" + doc.imageCover
})

schema.virtual('myReviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'product',
  });

  schema.pre(/^find/,function(){
    this.populate("myReviews")
  })

const productModel=mongoose.model("Product",schema)
export default productModel;
