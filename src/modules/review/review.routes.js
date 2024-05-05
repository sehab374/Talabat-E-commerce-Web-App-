import express  from "express";
import * as reviewController from './controller/review.controller.js'
import { protectRoutes } from "../auth/controller/auth.controller.js";
const router=express.Router()

router.route("/")
.post(protectRoutes,reviewController.addReview)
.get(reviewController.getAllReview)

router.route("/:id")
.patch(protectRoutes,reviewController.updateReview)
.delete(reviewController.deleteReview)
.get(reviewController.getReviewById)

export default router