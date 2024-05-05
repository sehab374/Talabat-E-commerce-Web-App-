import express  from "express";
import * as wishListController from './controller/wishList.controller.js'
import { protectRoutes } from "../auth/controller/auth.controller.js";

const router=express.Router()

// router.route("/")
// .post(wishListController.addCoupon)
// .get(wishListController.getAllCoupon)

// router.route("/:id")
// .patch(wishListController.updateCoupon)
// .delete(wishListController.deleteCoupon)
// .get(wishListController.getCouponById)
router.patch("/",protectRoutes,wishListController.addToWishList)

export default router