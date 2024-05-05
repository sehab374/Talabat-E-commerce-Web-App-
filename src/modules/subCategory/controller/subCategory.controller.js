import slugify from "slugify"
import { handleAsyncError } from "../../../middleware/handelAsyncError.js";
import subCategoryModel from "../../../../database/models/subCategory.model.js";
import { AppError } from "../../../utils/appError.js";
import { deleteOne } from "../../handlers/apiHandler.js";

export const addSubCategory=handleAsyncError(async(req,res,next)=>{
    // console.log(req.file,"from controller");
    req.body.image=req.file.filename
    ///create slug key in req.body
    req.body.slug=slugify(req.body.title)
    let presubCategory= new subCategoryModel(req.body)
    let addedsubCategory=await presubCategory.save()
    res.json({message:"added",addedsubCategory})
})
export const getAllSubCategories= async(req,res,next)=>{
    let filterObject={}
    if(req.params.category)
    {
        filterObject.category=req.params.category
    }
    let allsubCategories= await subCategoryModel.find(filterObject);
    res.json({message:"Done",allsubCategories})
}
export const getSubCategoryById=async(req,res,next)=>{
    let id=req.params.id;
    let SubCategory=await subCategoryModel.findById(id)
    SubCategory&&res.json({message:"Done",SubCategory})
    !SubCategory&&next(new AppError("SubCategory Not Found",404))
}
export const updateSubCategory=async(req,res,next)=>{
    let id=req.params.id;
    req.body.slug=slugify(req.body.title)
    let updatedSubCategory=await subCategoryModel.findByIdAndUpdate(id,req.body,{new:true})
    !updatedSubCategory&& next(new AppError("SubCategory Not Found",404))
    //res.json({message:"subCategory Not Found"})
    updatedSubCategory&& res.json({message:"Done",updatedSubCategory})
}


export const deleteSubCategory=deleteOne(subCategoryModel)
// export const deleteSubCategory=async(req,res,next)=>{
//     let id=req.params.id;
//     let deletedSubCategory=await subCategoryModel.findByIdAndDelete(id)
//     !deletedSubCategory&&next(new AppError("SubCategory Not Found",404))
//      //res.json({message:"subCategory Not Found"})
//     deletedSubCategory&& res.json({message:"Done",deletedSubCategory})
// }