import express  from "express";
import * as brandController from './controller/brand.controller.js'
import { validation } from "../../middleware/validation.js";
import { addBrandSchema, getByIdSchema, updateBrandSchema } from "./brand.validation.js";
import { uploadSingle } from "../../utils/fileUpload.js";
const router=express.Router()

router.route("/")
.post(uploadSingle("image"),validation(addBrandSchema),brandController.addBrand)
.get(brandController.getAllBrand)

router.route("/:id")
.patch(uploadSingle("image"),validation(updateBrandSchema),brandController.updateBrand)
.delete(validation(getByIdSchema),brandController.deleteBrand)
.get(validation(getByIdSchema),brandController.getBrandById)

export default router