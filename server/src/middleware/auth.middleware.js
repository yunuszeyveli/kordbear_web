// server/src/middleware/auth.middleware.js
// Her korumalı route'a gelmeden önce token doğrular

import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protect = async (req, res, next) => {
  try {
    // Header'dan token'ı al
    // Format: "Bearer eyJhbGciOiJIUzI1NiJ9..."
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Token bulunamadı, giriş yapınız" });
    }

    const token = authHeader.split(" ")[1];

    // Token'ı doğrula ve içindeki veriyi çöz
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Kullanıcıyı veritabanından bul, şifreyi getirme
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Kullanıcı bulunamadı" });
    }

    // Kullanıcıyı request'e ekle — sonraki middleware/controller kullanabilir
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Geçersiz token" });
  }
};

// Sadece admin erişebilir
export const adminOnly = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Admin yetkisi gerekli" });
  }
  next();
};
