import express  from "express";
import * as userController from './controller/user.controller.js'
import { validation } from "../../middleware/validation.js";
import { addUserSchema,getByIdSchema,updateUserSchema } from "./user.validation.js";
import { uploadSingle } from "../../utils/fileUpload.js";
const router=express.Router()

router.route("/")
.post(userController.addUser)
.get(userController.getAllUser)

router.route("/:id")
.patch(userController.updateUser)
.delete(userController.deleteUser)
.get(userController.getUserById)

router.put('/changePassword/:id',userController.changePassword)


export default router