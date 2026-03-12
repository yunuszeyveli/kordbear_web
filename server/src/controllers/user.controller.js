import User from "../models/user.model.js";

// GET /api/users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password") // şifreyi gönderme
      .sort({ createdAt: -1 });
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

// PUT /api/users/:id/role
export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({ message: "Geçersiz rol" });
    }

    // Kendi rolünü değiştirmesin
    if (req.params.id === req.user._id.toString()) {
      return res
        .status(400)
        .json({ message: "Kendi rolünüzü değiştiremezsiniz" });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { returnDocument: "after" },
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    res.json({ message: "Rol güncellendi", user });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

// DELETE /api/users/:id
export const deleteUser = async (req, res) => {
  try {
    // Kendi hesabını silmesin
    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({ message: "Kendi hesabınızı silemezsiniz" });
    }

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    res.json({ message: "Kullanıcı silindi" });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};
