// server/src/controllers/product.controller.js

import Product from "../models/product.model.js";

// ── TÜM ÜRÜNLERİ GETİR ──────────────────────────────────────
// GET /api/products
export const getProducts = async (req, res) => {
  try {
    // Query parametreleri ile filtreleme
    // Örnek: /api/products?category=Elektronik
    const filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

// ── TEK ÜRÜN GETİR ───────────────────────────────────────────
// GET /api/products/:id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Ürün bulunamadı" });
    }

    res.json({ product });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

// ── ÜRÜN OLUŞTUR ─────────────────────────────────────────────
// POST /api/products  (admin only)
export const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();

    res.status(201).json({
      message: "Ürün oluşturuldu",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

// ── ÜRÜN GÜNCELLE ────────────────────────────────────────────
// PUT /api/products/:id  (admin only)
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ message: "Ürün bulunamadı" });
    }

    res.json({ message: "Ürün güncellendi", product });
  } catch (error) {
    console.error("Ürün güncelleme hatası:", error.message); // ← detay
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

// ── ÜRÜN SİL ─────────────────────────────────────────────────
// DELETE /api/products/:id  (admin only)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Ürün bulunamadı" });
    }

    res.json({ message: "Ürün silindi" });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};
