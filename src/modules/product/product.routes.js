import express  from "express";
import * as productController from './controller/product.controller.js'
import { validation } from "../../middleware/validation.js";
import { uploadFields } from "../../utils/fileUpload.js";
import { addProductSchema,getByIdSchema,updateProductSchema } from "./product.validation.js";
import {protectRoutes,allowTo} from '../auth/controller/auth.controller.js'
const router=express.Router()

router.route("/")
.post(protectRoutes,allowTo("admin","user"),uploadFields([{name:"imageCover",maxCount:1},{name:"images",maxCount:10}]),validation(addProductSchema),productController.addProduct)
.get(productController.getAllProduct)

router.route("/:id")
.patch(uploadFields([{name:"imageCover",maxCount:1},{name:"images",maxCount:10}]),validation(updateProductSchema),productController.updateProduct)
.delete(validation(getByIdSchema),productController.deleteProduct)
.get(validation(getByIdSchema),productController.getProductById)

export default router