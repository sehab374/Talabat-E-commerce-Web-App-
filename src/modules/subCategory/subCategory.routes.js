import express from 'express'
import * as subCategoryController from './controller/subCategory.controller.js'
import { validation } from '../../middleware/validation.js'
import { addSubCategorySchema,updateSubCategorySchema,getByIdSchema } from './subCategory.validation.js'

import { uploadSingle } from '../../utils/fileUpload.js'
const router=express.Router({mergeParams:true})

router.route('/')
.post(uploadSingle("image"),validation(addSubCategorySchema), subCategoryController.addSubCategory)
.get(subCategoryController.getAllSubCategories)

router.route('/:id')
.get(validation(getByIdSchema),subCategoryController.getSubCategoryById)
.patch(validation(updateSubCategorySchema),subCategoryController.updateSubCategory)
.delete(validation(getByIdSchema),subCategoryController.deleteSubCategory)

export default router