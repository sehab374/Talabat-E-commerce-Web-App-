import express from 'express'
import * as categoryController from './controller/category.controller.js'
import { validation } from '../../middleware/validation.js'
import { addCategorySchema, getByIdSchema, updateCategorySchema } from './category.validation.js'
import { uploadSingle } from '../../utils/fileUpload.js'
import subCtegoryRoutes  from '../subCategory/subCategory.routes.js'


const router=express.Router()
/////////////////////////////////////////////////////////marge params
router.use("/:category/subCategory",subCtegoryRoutes)

router.route('/')
.post(uploadSingle("image"), validation(addCategorySchema), categoryController.addCategory)
.get(categoryController.getAllCategories)

router.route('/:id')
.get(validation(getByIdSchema),categoryController.getCategoryById)
.patch(validation(updateCategorySchema),categoryController.updateCategory)
.delete(validation(getByIdSchema),categoryController.deleteCategory)

export default router