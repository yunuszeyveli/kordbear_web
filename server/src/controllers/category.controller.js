import Category from "../models/category.model.js";

// GET /api/categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ order: 1, createdAt: 1 });
    res.json({ categories });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

// POST /api/categories
export const createCategory = async (req, res) => {
  try {
    const { name, order } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Kategori adı zorunludur" });
    }

    const existing = await Category.findOne({ name: name.trim() });
    if (existing) {
      return res.status(400).json({ message: "Bu kategori zaten mevcut" });
    }

    const slug = name
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/ğ/g, "g")
      .replace(/ü/g, "u")
      .replace(/ş/g, "s")
      .replace(/ı/g, "i")
      .replace(/ö/g, "o")
      .replace(/ç/g, "c");

    const category = new Category({
      name: name.trim(),
      slug: slug || Date.now().toString(),
      order: order || 0,
    });

    await category.save();
    res.status(201).json({ message: "Kategori oluşturuldu", category });
  } catch (error) {
    console.error("Kategori oluşturma hatası:", error); // ← detaylı hata
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

// DELETE /api/categories/:id
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Kategori bulunamadı" });
    }
    res.json({ message: "Kategori silindi" });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};
