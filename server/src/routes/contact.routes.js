import express from "express";
import {
  sendMessage,
  getMessages,
  getMyMessages,
  markRead,
  replyMessage,
  deleteMessage,
} from "../controllers/contact.controller.js";
import { protect, adminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, sendMessage); // giriş yapmış kullanıcı gönderir
router.get("/", protect, adminOnly, getMessages);
router.get("/my", protect, getMyMessages);
router.put("/:id/read", protect, adminOnly, markRead);
router.put("/:id/reply", protect, adminOnly, replyMessage);
router.delete("/:id", protect, adminOnly, deleteMessage);

export default router;
