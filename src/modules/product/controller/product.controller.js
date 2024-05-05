import slugify from "slugify"
import { handleAsyncError } from "../../../middleware/handelAsyncError.js"
import { AppError } from "../../../utils/appError.js"
import productModel from "../../../../database/models/product.model.js"
import { deleteOne } from "../../handlers/apiHandler.js"
import ApiFeature from "../../../utils/apiFeature.js"

export const addProduct=handleAsyncError(async(req,res,next)=>{
    //  console.log(req.files,"from controller");
    //////0 always be 0 because of => {name:"imageCover",maxCount:1}
    req.body.imageCover=req.files.imageCover[0].filename
    req.body.images=req.files.images.map(ele=>ele.filename)
    ///create slug key in req.body
    req.body.slug=slugify(req.body.title)
    let preProduct= new productModel(req.body)
    let addedProduct=await preProduct.save()
    res.json({message:"added",addedProduct})
})

export const getAllProduct=handleAsyncError(async(req,res)=>{
    /////////////////////////////////////////////////////////////////////////////1-pagination
    /// *1=>to convert it from string to number
    /// ||1=>in case of i don't send page in query params
    let page=req.query.page*1||1;
    if(req.query.page<0) page=1;
    let skip=(page-1)*4
    /////////////////////////////////////////////////////////////////////////////2-filters (by price)
    let filterObj={...req.query}
    let excutedQuery=['page','sort','keyword','fields']
    excutedQuery.forEach((q)=>{
        delete filterObj[q]
    })
    ///in case of ('gte')
    filterObj=JSON.stringify(filterObj)
    // filterObj=filterObj.replace('gte','$gte')
    ////////(\bgt|gte|lt|lte\b/g) is regular expression
    filterObj=filterObj.replace(/\bgt|gte|lt|lte\b/g,match=>`$${match}`)
    filterObj=JSON.parse(filterObj)
    //  console.log(filterObj);
    /////////////////////////////////////////////////////////////////////////////3-sort

    /////build query
    let mongooseQuery=productModel.find(filterObj).skip(skip).limit(4);
    if(req.query.sort)
    {
        //////////////////////ina case of sort by more than 1 feild
        let sortByManyItems=req.query.sort.split(",").join(" ")
        mongooseQuery.sort(sortByManyItems)
    }
    /////////////////////////////////////////////////////////////////////////////4-search
    if(req.query.keyword)
    {
        mongooseQuery.find({
            $or:[
                {title: { $regex:req.query.keyword ,$options :"i" } },
                {description: { $regex:req.query.keyword ,$options :"i" } },
            ]
        })
    }
    /////////////////////////////////////////////////////////////////////////////5-fields
    if(req.query.fields)
    {
        let fields=req.query.fields.split(",").join(" ");
        console.log(fields);
        mongooseQuery.select("title")
    }
    ///excute query
    let allProducts= await mongooseQuery
    res.json({message:"allProducts",page,allProducts})

    //////////////////////////////////////////////////////////////////////////////////////////////ApiFeature
    // let apiFeature= new ApiFeature(productModel.find(),req.query).pagination()
    // let allProducts= await apiFeature.mongooseQuery
    // res.json({message:"allProducts",page:apiFeature.page,allProducts})
}) 

export const getProductById=handleAsyncError(async(req,res,next)=>{
    let product= await productModel.findById(req.params.id)
    product&&res.json({message:"product",product})
    !product&&next(new AppError("product Not Found",404))
    //res.json({message:"not found"})
 }) 


export const updateProduct=handleAsyncError(async(req,res,next)=>{
    // console.log(req.params.id);
    req.body.slug=slugify(req.body.title)
    //////in case update images and imageCover
    if(req.files.imageCover) req.body.imageCover=req.files.imageCover[0].filename
    if(req.files.images) req.body.images=req.files.images.map(ele=>ele.filename)

    let updatedProduct= await productModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    updatedProduct&&res.json({message:"updated",updatedProduct})
    !updatedProduct&&next(new AppError("product Not Found",404))
    //res.json({message:"brand not found"})
})

export const deleteProduct=deleteOne(productModel)
// export const deleteProduct=handleAsyncError(async(req,res,next)=>{
//     let deletedProduct= await productModel.findByIdAndDelete(req.params.id)
//     deletedProduct&&res.json({message:"deleted",deletedProduct})
//     !deletedProduct&&next(new AppError("product Not Found",404))
//     //res.json({message:"brand Not Found"})
// })
