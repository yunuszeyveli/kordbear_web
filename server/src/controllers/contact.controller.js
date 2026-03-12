// server/src/controllers/contact.controller.js
import Contact from "../models/contact.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { fullName, email, phone, subject, message } = req.body;
    if (!fullName || !email || !subject || !message)
      return res.status(400).json({ message: "Tüm zorunlu alanları doldurun." });

    const userId = req.user?._id || null;
    const contact = await Contact.create({ fullName, email, phone, subject, message, userId });
    res.status(201).json({ message: "Mesajınız iletildi.", contact });
  } catch (err) {
    console.error("Contact error:", err);
    res.status(500).json({ message: "Mesaj gönderilemedi." });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json({ messages });
  } catch (err) {
    res.status(500).json({ message: "Mesajlar alınamadı." });
  }
};

export const getMyMessages = async (req, res) => {
  try {
    const messages = await Contact.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json({ messages });
  } catch (err) {
    res.status(500).json({ message: "Mesajlar alınamadı." });
  }
};

export const markRead = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id, { isRead: true }, { returnDocument: "after" }
    );
    res.json({ contact });
  } catch (err) {
    res.status(500).json({ message: "Güncellenemedi." });
  }
};

export const replyMessage = async (req, res) => {
  try {
    const { reply } = req.body;
    if (!reply) return res.status(400).json({ message: "Cevap boş olamaz." });

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { reply, repliedAt: new Date(), isRead: true },
      { returnDocument: "after" }
    );

    if (!contact) return res.status(404).json({ message: "Mesaj bulunamadı." });
    res.json({ message: "Cevap gönderildi.", contact });
  } catch (err) {
    res.status(500).json({ message: "Cevap gönderilemedi." });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Silindi." });
  } catch (err) {
    res.status(500).json({ message: "Silinemedi." });
  }
};