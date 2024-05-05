import slugify from "slugify"
import categoryModel from "../../../../database/models/category.model.js"
import { handleAsyncError } from "../../../middleware/handelAsyncError.js";
import { AppError } from "../../../utils/appError.js";
import { deleteOne } from "../../handlers/apiHandler.js";

export const addCategory=handleAsyncError(async(req,res,next)=>{
    // console.log(req.file,"from controller");
    req.body.image=req.file.filename
    ///create slug key in req.body
    req.body.slug=slugify(req.body.title)
    let preCategory= new categoryModel(req.body)
    let addedCategory=await preCategory.save()
    res.json({message:"added",addedCategory})
})
export const getAllCategories=handleAsyncError( async(req,res,next)=>{
    let allCategories= await categoryModel.find();
    res.json({message:"Done",allCategories})
})

export const getCategoryById=handleAsyncError(async(req,res,next)=>{
    let id=req.params.id;
    let category=await categoryModel.findById(id)
    category&&res.json({message:"Done",category})
    !category&&next(new AppError("Category Not Found",404))
    
})

export const updateCategory=handleAsyncError(async(req,res,next)=>{
    let id=req.params.id;
    req.body.slug=slugify(req.body.title)
    let updatedCategory=await categoryModel.findByIdAndUpdate(id,req.body,{new:true})
    !updatedCategory&&next(new AppError("Category Not Found",404))
    // res.json({message:"Category Not Found",updatedCategory})
    updatedCategory&& res.json({message:"Done",updatedCategory})
})


export const deleteCategory=deleteOne(categoryModel)

// export const deleteCategory=handleAsyncError(async(req,res,next)=>{
//     let id=req.params.id;
//     let deletedCategory=await categoryModel.findByIdAndDelete(id)
//     !deletedCategory&&next(new AppError("Category Not Found",404))
//     /// res.json({message:"Category Not Found"})
//     deletedCategory&& res.json({message:"Done",deletedCategory})
// })