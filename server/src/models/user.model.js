// server/src/models/user.model.js
// MongoDB'de kullanıcı verisi burada tanımlanır

import mongoose from "mongoose";
import pkg from "bcryptjs";

const { hash, compare } = pkg;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Ad Soyad zorunludur"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "E-posta zorunludur"],
      unique: true, // aynı email iki kez kayıt olamaz
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Şifre zorunludur"],
      minlength: [6, "Şifre en az 6 karakter olmalı"],
    },
    role: {
      type: String,
      enum: ["user", "admin"], // sadece bu iki değer olabilir
      default: "user",
    },
  },
  {
    timestamps: true, // createdAt, updatedAt otomatik eklenir
  },
);

// ── KAYIT ÖNCESİ ŞİFREYİ HASHLE ────────────────────────────

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await hash(this.password, 10);
});

// ── ŞİFRE KARŞILAŞTIRMA METODU ──────────────────────────────

userSchema.methods.comparePassword = async function (candidatePassword) {
  return compare(candidatePassword, this.password); // bcrypt.compare → compare
};

const User = mongoose.model("User", userSchema);
export default User;
