// src/components/admin/AdminProducts.jsx
import { useState, useEffect } from "react";
import { Pencil, Trash2, Plus, X, Package } from "lucide-react";
import { COLORS, FONTS } from "../../styles/theme";
import api from "../../utils/api";
import Spinner from "../../components/ui/Spinner";

const EMPTY_FORM = {
  name: "",
  category: "",
  price: "",
  image: "",
  tag: "",
  description: "",
  specs: "",
};

const TAGS = ["", "Yeni", "Çok Satan", "İndirim"];

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/products");
      setProducts(res.data.products);
    } catch {
      console.error("Ürünler yüklenemedi");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data.categories);
    } catch {
      console.error("Kategoriler yüklenemedi");
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    if (!formData.name || !formData.price) return;
    setSaving(true);
    try {
      const productData = {
        ...formData,
        price: Number(formData.price),
        tag: formData.tag || null,
        image: formData.image || "",
        specs: formData.specs
          ? formData.specs.split(",").map((s) => s.trim())
          : [],
      };

      if (editingId) {
        await api.put(`/products/${editingId}`, productData);
      } else {
        await api.post("/products", productData);
      }

      await fetchProducts();
      setFormData(EMPTY_FORM);
      setEditingId(null);
      setShowForm(false);
    } catch (err) {
      alert(err.response?.data?.message || "İşlem başarısız");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image || "",
      tag: product.tag || "",
      description: product.description || "",
      specs: product.specs?.join(", ") || "",
    });
    setEditingId(product._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      await fetchProducts();
      setDeleteId(null);
    } catch (err) {
      alert(err.response?.data?.message || "Silme başarısız");
    }
  };

  const handleCancel = () => {
    setFormData(EMPTY_FORM);
    setEditingId(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "80px 0" }}>
        <div
          style={{
            width: "40px",
            height: "40px",
            border: `3px solid ${COLORS.border}`,
            borderTop: `3px solid ${COLORS.accent}`,
            borderRadius: "50%",
            margin: "0 auto 16px",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <p style={{ color: COLORS.textMuted, fontFamily: FONTS.body }}>
          Yükleniyor...
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* ── BAŞLIK + EKLE BUTONU ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "32px",
        }}
      >
        <h2
          style={{
            fontFamily: FONTS.display,
            fontSize: "40px",
            color: COLORS.text,
            letterSpacing: "0.03em",
          }}
        >
          ÜRÜNLER
        </h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData(EMPTY_FORM);
          }}
          style={{
            background: COLORS.accent,
            border: "none",
            color: COLORS.white,
            padding: "10px 20px",
            borderRadius: "3px",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            fontFamily: FONTS.body,
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Plus size={15} />
          YENİ ÜRÜN
        </button>
      </div>

      {/* ── ÜRÜN FORMU ── */}
      {showForm && (
        <div
          style={{
            background: COLORS.surface,
            border: `1px solid ${COLORS.accent}44`,
            borderRadius: "6px",
            padding: "24px",
            marginBottom: "24px",
          }}
        >
          {/* Form Başlık */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h3
              style={{
                fontFamily: FONTS.body,
                fontSize: "13px",
                fontWeight: 700,
                color: COLORS.text,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {editingId ? "ÜRÜNÜ DÜZENLE" : "YENİ ÜRÜN EKLE"}
            </h3>
            <button
              onClick={handleCancel}
              style={{
                background: "transparent",
                border: "none",
                color: COLORS.textMuted,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Form Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "16px",
              marginBottom: "16px",
            }}
          >
            {/* Ürün Adı */}
            <div>
              <label style={labelStyle}>ÜRÜN ADI</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ürün adı"
                style={inputStyle}
              />
            </div>

            {/* Fiyat */}
            <div>
              <label style={labelStyle}>FİYAT (₺)</label>
              <input
                name="price"
                value={formData.price}
                type="number"
                onChange={handleChange}
                placeholder="0"
                style={inputStyle}
              />
            </div>

            {/* Kategori — dinamik */}
            <div>
              <label style={labelStyle}>KATEGORİ</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="">Kategori seçin</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Etiket */}
            <div>
              <label style={labelStyle}>ETİKET</label>
              <select
                name="tag"
                value={formData.tag}
                onChange={handleChange}
                style={inputStyle}
              >
                {TAGS.map((t) => (
                  <option key={t} value={t}>
                    {t || "Etiket yok"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Görsel URL */}
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>GÖRSEL URL</label>
            <input
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/photo-..."
              style={inputStyle}
            />
            {formData.image && (
              <div
                style={{
                  marginTop: "10px",
                  width: "80px",
                  height: "80px",
                  borderRadius: "6px",
                  overflow: "hidden",
                  border: `1px solid ${COLORS.border}`,
                }}
              >
                <img
                  src={formData.image}
                  alt="Önizleme"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => (e.target.style.display = "none")}
                />
              </div>
            )}
          </div>

          {/* Açıklama */}
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>AÇIKLAMA</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Ürün açıklaması..."
              rows={3}
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </div>

          {/* Özellikler */}
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>ÖZELLİKLER (virgülle ayır)</label>
            <input
              name="specs"
              value={formData.specs}
              onChange={handleChange}
              placeholder="Malzeme: PLA+, Renk: Siyah, Boyut: 20cm"
              style={inputStyle}
            />
          </div>

          {/* Butonlar */}
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={handleSave}
              disabled={saving}
              style={{
                background: saving ? COLORS.border : COLORS.accent,
                border: "none",
                color: COLORS.white,
                padding: "10px 28px",
                borderRadius: "3px",
                cursor: saving ? "not-allowed" : "pointer",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                fontFamily: FONTS.body,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Plus size={14} />
              {saving ? (
                <>
                  <Spinner size={13} />
                  KAYDEDİLİYOR...
                </>
              ) : (
                <>{editingId ? "GÜNCELLE" : "KAYDET"}</>
              )}
            </button>
            <button
              onClick={handleCancel}
              style={{
                background: "transparent",
                border: `1px solid ${COLORS.border}`,
                color: COLORS.textMuted,
                padding: "10px 28px",
                borderRadius: "3px",
                cursor: "pointer",
                fontSize: "12px",
                fontFamily: FONTS.body,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <X size={14} />
              İPTAL
            </button>
          </div>
        </div>
      )}

      {/* ── SİLME ONAYI ── */}
      {deleteId && (
        <div
          style={{
            background: "#ef444411",
            border: "1px solid #ef444433",
            borderRadius: "6px",
            padding: "16px 24px",
            marginBottom: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p
            style={{
              fontSize: "13px",
              color: COLORS.text,
              fontFamily: FONTS.body,
            }}
          >
            Bu ürünü silmek istediğinize emin misiniz?
          </p>
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={() => handleDelete(deleteId)}
              style={{
                background: "#ef4444",
                border: "none",
                color: "#fff",
                padding: "8px 20px",
                borderRadius: "3px",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: 700,
                fontFamily: FONTS.body,
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <Trash2 size={13} /> SİL
            </button>
            <button
              onClick={() => setDeleteId(null)}
              style={{
                background: "transparent",
                border: `1px solid ${COLORS.border}`,
                color: COLORS.textMuted,
                padding: "8px 20px",
                borderRadius: "3px",
                cursor: "pointer",
                fontSize: "12px",
                fontFamily: FONTS.body,
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <X size={13} /> İPTAL
            </button>
          </div>
        </div>
      )}

      {/* ── ÜRÜN TABLOSU ── */}
      <div
        style={{
          background: COLORS.surface,
          border: `1px solid ${COLORS.border}`,
          borderRadius: "6px",
          overflow: "hidden",
        }}
      >
        {/* Tablo Başlığı */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "56px 1fr 120px 100px 100px 120px",
            padding: "12px 24px",
            borderBottom: `1px solid ${COLORS.border}`,
            background: COLORS.surfaceHover,
          }}
        >
          {["", "ÜRÜN", "KATEGORİ", "FİYAT", "ETİKET", "İŞLEMLER"].map(
            (h, i) => (
              <div
                key={i}
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  color: COLORS.textMuted,
                  letterSpacing: "0.12em",
                  fontFamily: FONTS.body,
                }}
              >
                {h}
              </div>
            ),
          )}
        </div>

        {/* Satırlar */}
        {products.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "48px",
              color: COLORS.textMuted,
              fontFamily: FONTS.body,
            }}
          >
            <Package
              size={40}
              color={COLORS.border}
              style={{ marginBottom: "12px" }}
            />
            <p>Henüz ürün eklenmemiş.</p>
          </div>
        ) : (
          products.map((product, i) => (
            <div
              key={product._id}
              style={{
                display: "grid",
                gridTemplateColumns: "56px 1fr 120px 100px 100px 120px",
                alignItems: "center",
                padding: "14px 24px",
                borderTop: i > 0 ? `1px solid ${COLORS.border}` : "none",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = COLORS.surfaceHover)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              {/* Görsel */}
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "4px",
                  overflow: "hidden",
                  border: `1px solid ${COLORS.border}`,
                  background: "#1a1a1a",
                }}
              >
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Package size={18} color={COLORS.border} />
                  </div>
                )}
              </div>

              {/* İsim */}
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: COLORS.text,
                  fontFamily: FONTS.body,
                }}
              >
                {product.name}
              </span>

              {/* Kategori */}
              <span
                style={{
                  fontSize: "12px",
                  color: COLORS.textMuted,
                  fontFamily: FONTS.body,
                }}
              >
                {product.category}
              </span>

              {/* Fiyat */}
              <span
                style={{
                  fontFamily: FONTS.display,
                  fontSize: "16px",
                  color: COLORS.accent,
                  letterSpacing: "0.05em",
                }}
              >
                ₺{product.price}
              </span>

              {/* Etiket */}
              <span
                style={{
                  fontSize: "11px",
                  fontFamily: FONTS.body,
                  color: product.tag ? COLORS.accent : COLORS.textMuted,
                }}
              >
                {product.tag || "—"}
              </span>

              {/* İşlemler */}
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  onClick={() => handleEdit(product)}
                  style={{
                    background: "transparent",
                    border: `1px solid ${COLORS.border}`,
                    color: COLORS.textMuted,
                    padding: "6px 10px",
                    borderRadius: "3px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    fontSize: "11px",
                    fontFamily: FONTS.body,
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = COLORS.accent;
                    e.currentTarget.style.color = COLORS.accent;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = COLORS.border;
                    e.currentTarget.style.color = COLORS.textMuted;
                  }}
                >
                  <Pencil size={12} />
                  Düzenle
                </button>
                <button
                  onClick={() => setDeleteId(product._id)}
                  style={{
                    background: "transparent",
                    border: "1px solid #ef444433",
                    color: "#ef4444",
                    padding: "6px 10px",
                    borderRadius: "3px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    fontSize: "11px",
                    fontFamily: FONTS.body,
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#ef444411")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <Trash2 size={12} />
                  Sil
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Toplam */}
      <p
        style={{
          fontSize: "12px",
          color: COLORS.textMuted,
          marginTop: "16px",
          fontFamily: FONTS.body,
          textAlign: "right",
        }}
      >
        Toplam {products.length} ürün
      </p>
    </div>
  );
}

const labelStyle = {
  display: "block",
  fontSize: "10px",
  color: "#888880",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  marginBottom: "6px",
  fontFamily: "'DM Sans', sans-serif",
  fontWeight: 600,
};

const inputStyle = {
  width: "100%",
  background: "#0D0D0D",
  border: "1px solid #2A2A2A",
  borderRadius: "3px",
  padding: "10px 14px",
  color: "#F0EDE8",
  fontSize: "13px",
  fontFamily: "'DM Sans', sans-serif",
  outline: "none",
  boxSizing: "border-box",
};
