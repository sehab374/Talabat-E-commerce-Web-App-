import { handleAsyncError } from "../../middleware/handelAsyncError.js"
import { AppError } from "../../utils/appError.js"

export const deleteOne=(model)=>{
    return handleAsyncError(async(req,res,next)=>{
        // console.log(req.params.id);
        let deletedBrand= await model.findByIdAndDelete(req.params.id)
        deletedBrand&&res.json({message:"deleted",deletedBrand})
        !deletedBrand&&next(new AppError("item Not Found",404))
    })
}