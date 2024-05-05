import express from "express"
import * as authController from './controller/auth.controller.js'
const router=express.Router()

router.post('/signUp',authController.signUp)
router.post('/signIn',authController.signIn)

export default router