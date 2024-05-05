import slugify from "slugify"
import brandModel from "../../../../database/models/brand.model.js"
import { handleAsyncError } from "../../../middleware/handelAsyncError.js"
import { AppError } from "../../../utils/appError.js"
import { deleteOne } from "../../handlers/apiHandler.js"

export const addBrand=handleAsyncError(async(req,res)=>{
    // console.log(req.file,"from controller");
    req.body.logo=req.file.filename
    ///create slug key in req.body
    req.body.slug=slugify(req.body.title)
    let preBrand= new brandModel(req.body)
    let addedBrand=await preBrand.save()
    res.status(201).json({message:"added",addedBrand})
})

export const getAllBrand=handleAsyncError(async(req,res)=>{
    let allbrands= await brandModel.find();
    res.json({message:"allbrands",allbrands})
}) 

export const getBrandById=handleAsyncError(async(req,res,next)=>{
    let brand= await brandModel.findById(req.params.id)
    brand&&res.json({message:"brand",brand})
    !brand&&next(new AppError("brand Not Found",404))
    //res.json({message:"not found"})
 }) 


export const updateBrand=handleAsyncError(async(req,res,next)=>{
    // console.log(req.params.id);
    req.body.slug=slugify(req.body.title)
    //////in case update image
    if(req.file) req.body.logo=req.file.filename
    let updatedBrand= await brandModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    updatedBrand&&res.json({message:"updated",updatedBrand})
    !updatedBrand&&next(new AppError("brand Not Found",404))
    //res.json({message:"brand not found"})
})

export const deleteBrand=deleteOne(brandModel)


// export const deleteBrand=handleAsyncError(async(req,res,next)=>{
//     // console.log(req.params.id);
//     let deletedBrand= await brandModel.findByIdAndDelete(req.params.id)
//     deletedBrand&&res.json({message:"deleted",deletedBrand})
//     !deletedBrand&&next(new AppError("brand Not Found",404))
// })
