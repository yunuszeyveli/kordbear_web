import express from "express";
import {
  initiatePayment,
  paymentCallback,
} from "../controllers/payment.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/initiate", protect, initiatePayment);
router.post("/callback", paymentCallback); // iyzico buraya POST atar

export default router;
