// server/src/controllers/order.controller.js
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

// ── SİPARİŞ OLUŞTUR ──────────────────────────────────────────
// POST /api/orders
export const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Sepet boş" });
    }

    // Toplam fiyatı hesapla
    const totalPrice = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const shippingPrice = totalPrice >= 500 ? 0 : 49;

    const order = new Order({
      user: req.user._id, // middleware'den geliyor
      items,
      shippingAddress,
      totalPrice,
      shippingPrice,
    });

    await order.save();

    res.status(201).json({
      message: "Sipariş oluşturuldu",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

// ── KULLANICININSİPARİŞLERİ ──────────────────────────────────
// GET /api/orders/my
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

// ── TÜM SİPARİŞLER (admin) ───────────────────────────────────
// GET /api/orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email") // user bilgisini de getir
      .sort({ createdAt: -1 });
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

// ── SİPARİŞ DURUMU GÜNCELLE (admin) ──────────────────────────
// PUT /api/orders/:id/status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { returnDocument: "after" },
    );

    if (!order) {
      return res.status(404).json({ message: "Sipariş bulunamadı" });
    }

    res.json({ message: "Durum güncellendi", order });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};
