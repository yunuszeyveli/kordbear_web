// server/src/routes/auth.routes.js
// Hangi URL hangi controller fonksiyonuna gidecek

import express from "express";
import { register, login, getProfile, updateProfile } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public routes — token gerekmez
router.post("/register", register);
router.post("/login", login);

// Protected route — token gerekir
router.get("/profile", protect, getProfile);
router.put('/profile', protect, updateProfile);

export default router;
