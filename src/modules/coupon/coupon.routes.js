import express  from "express";
import * as couponController from './controller/coupon.controller.js'

const router=express.Router()

router.route("/")
.post(couponController.addCoupon)
.get(couponController.getAllCoupon)

router.route("/:id")
.patch(couponController.updateCoupon)
.delete(couponController.deleteCoupon)
.get(couponController.getCouponById)

export default router