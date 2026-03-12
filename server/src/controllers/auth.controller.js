// server/src/controllers/auth.controller.js

import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// Token üretme yardımcı fonksiyonu
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// ── KAYIT ────────────────────────────────────────────────────
// POST /api/auth/register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Email daha önce kullanılmış mı?
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Bu email zaten kayıtlı" });
    }

    const user = new User({ name, email, password });
    await user.save();

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      message: "Kayıt başarılı",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

// ── GİRİŞ ────────────────────────────────────────────────────
// POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Email veya şifre hatalı" });
    }

    // Şifre doğru mu?
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Email veya şifre hatalı" });
    }

    const token = generateToken(user._id, user.role);

    res.json({
      message: "Giriş başarılı",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

// ── PROFİL ───────────────────────────────────────────────────
// GET /api/auth/profile  (korumalı)
export const getProfile = async (req, res) => {
  // req.user → middleware tarafından set edildi
  res.json({ user: req.user });
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    // Email başkası tarafından kullanılıyor mu?
    if (email) {
      const existing = await User.findOne({
        email,
        _id: { $ne: req.user._id },
      });
      if (existing) {
        return res
          .status(400)
          .json({ message: "Bu e-posta zaten kullanılıyor" });
      }
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      { returnDocument: "after" },
    ).select("-password");

    res.json({ message: "Profil güncellendi", user });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};
