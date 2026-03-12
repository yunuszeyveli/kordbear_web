// src/components/admin/AdminCategories.jsx
import { useState, useEffect } from "react";
import { Plus, Trash2, Tag } from "lucide-react";
import { COLORS, FONTS } from "../../styles/theme";
import api from "../../utils/api";
import Spinner from "../../components/ui/Spinner";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await api.get("/categories");
      setCategories(res.data.categories);
    } catch {
      setError("Kategoriler yüklenemedi");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!newName.trim()) return;
    setSaving(true);
    setError("");
    try {
      await api.post("/categories", { name: newName.trim() });
      setNewName("");
      await fetchCategories();
    } catch (err) {
      setError(err.response?.data?.message || "Eklenemedi");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/categories/${id}`);
      await fetchCategories();
      setDeleteId(null);
    } catch (err) {
      setError(err.response?.data?.message || "Silinemedi");
    }
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
      {/* ── BAŞLIK ── */}
      <div style={{ marginBottom: "32px" }}>
        <h2
          style={{
            fontFamily: FONTS.display,
            fontSize: "40px",
            color: COLORS.text,
            letterSpacing: "0.03em",
          }}
        >
          KATEGORİLER
        </h2>
        <p
          style={{
            fontSize: "13px",
            color: COLORS.textMuted,
            fontFamily: FONTS.body,
            marginTop: "8px",
          }}
        >
          Toplam {categories.length} kategori
        </p>
      </div>

      {/* ── YENİ KATEGORİ EKLE ── */}
      <div
        style={{
          background: COLORS.surface,
          border: `1px solid ${COLORS.accent}44`,
          borderRadius: "6px",
          padding: "24px",
          marginBottom: "24px",
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
            marginBottom: "16px",
          }}
        >
          YENİ KATEGORİ EKLE
        </h3>

        <div style={{ display: "flex", gap: "12px" }}>
          <div style={{ flex: 1 }}>
            <input
              value={newName}
              onChange={(e) => {
                setNewName(e.target.value);
                setError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              placeholder="Kategori adı (örn: Mutfak, Bahçe...)"
              style={inputStyle}
            />
            {error && (
              <p
                style={{
                  fontSize: "12px",
                  color: "#ef4444",
                  marginTop: "6px",
                  fontFamily: FONTS.body,
                }}
              >
                {error}
              </p>
            )}
          </div>
          <button
            onClick={handleAdd}
            disabled={saving || !newName.trim()}
            style={{
              background:
                saving || !newName.trim() ? COLORS.border : COLORS.accent,
              border: "none",
              color: COLORS.white,
              padding: "10px 24px",
              borderRadius: "3px",
              cursor: saving || !newName.trim() ? "not-allowed" : "pointer",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              fontFamily: FONTS.body,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              whiteSpace: "nowrap",
            }}
          >
            <Plus size={14} />
            {saving ? (
              <>
                <Spinner size={13} />
                EKLENİYOR...
              </>
            ) : (
              <>EKLE</>
            )}
          </button>
        </div>
      </div>

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
            Bu kategoriyi silmek istediğinize emin misiniz?
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
              }}
            >
              İPTAL
            </button>
          </div>
        </div>
      )}

      {/* ── KATEGORİ LİSTESİ ── */}
      <div
        style={{
          background: COLORS.surface,
          border: `1px solid ${COLORS.border}`,
          borderRadius: "6px",
          overflow: "hidden",
        }}
      >
        {/* Başlık */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 160px 120px",
            padding: "12px 24px",
            borderBottom: `1px solid ${COLORS.border}`,
            background: COLORS.surfaceHover,
          }}
        >
          {["KATEGORİ ADI", "OLUŞTURULMA", "İŞLEM"].map((h, i) => (
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
          ))}
        </div>

        {/* Satırlar */}
        {categories.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "48px",
              color: COLORS.textMuted,
              fontFamily: FONTS.body,
            }}
          >
            <Tag
              size={40}
              color={COLORS.border}
              style={{ marginBottom: "12px" }}
            />
            <p>Henüz kategori eklenmemiş.</p>
          </div>
        ) : (
          categories.map((cat, i) => (
            <div
              key={cat._id}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 160px 120px",
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
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <Tag size={14} color={COLORS.accent} />
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: COLORS.text,
                    fontFamily: FONTS.body,
                  }}
                >
                  {cat.name}
                </span>
              </div>

              <span
                style={{
                  fontSize: "12px",
                  color: COLORS.textMuted,
                  fontFamily: FONTS.body,
                }}
              >
                {new Date(cat.createdAt).toLocaleDateString("tr-TR")}
              </span>

              <button
                onClick={() => setDeleteId(cat._id)}
                style={{
                  background: "transparent",
                  border: "1px solid #ef444433",
                  color: "#ef4444",
                  padding: "6px 12px",
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
          ))
        )}
      </div>
    </div>
  );
}

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
