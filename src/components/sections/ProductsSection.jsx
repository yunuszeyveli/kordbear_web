// src/components/sections/ProductsSection.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Package, AlertTriangle } from "lucide-react";
import { COLORS, FONTS } from "../../styles/theme";
import useProducts from "../../hooks/useProducts";
import ProductCard from "../ui/ProductCard";
import api from "../../utils/api";

export default function ProductsSection() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("Tümü");
  const [categories, setCategories] = useState([]);

  const { products, loading, error } = useProducts(
    activeCategory === "Tümü" ? null : activeCategory,
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        const names = res.data.categories.map((c) => c.name);
        setCategories(["Tümü", ...names]);
      } catch {
        setCategories(["Tümü"]);
      }
    };
    fetchCategories();
  }, []);

  return (
    <section style={{ background: COLORS.bg, padding: "80px 24px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* ── BAŞLIK + FİLTRELER ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "48px",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "11px",
                color: COLORS.accent,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: "10px",
                fontFamily: FONTS.body,
              }}
            >
              KOLEKSİYON
            </p>
            <h2
              style={{
                fontFamily: FONTS.display,
                fontSize: "52px",
                color: COLORS.text,
                letterSpacing: "0.03em",
                lineHeight: 1,
              }}
            >
              ÖNE ÇIKAN ÜRÜNLER
            </h2>
          </div>

          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  background:
                    activeCategory === cat ? COLORS.accent : "transparent",
                  border: `1px solid ${activeCategory === cat ? COLORS.accent : COLORS.border}`,
                  color:
                    activeCategory === cat ? COLORS.white : COLORS.textMuted,
                  padding: "8px 18px",
                  borderRadius: "3px",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  fontFamily: FONTS.body,
                }}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* ── YÜKLEME ── */}
        {loading && (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
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
              Ürünler yükleniyor...
            </p>
          </div>
        )}

        {/* ── HATA ── */}
        {error && (
          <div
            style={{
              textAlign: "center",
              padding: "60px 0",
              color: "#ef4444",
              fontFamily: FONTS.body,
            }}
          >
            <AlertTriangle
              size={48}
              color="#ef4444"
              style={{ marginBottom: "16px" }}
            />
            <p>{error}</p>
          </div>
        )}

        {/* ── ÜRÜN KARTLARI ── */}
        {!loading && !error && (
          <>
            {products.length > 0 ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: "20px",
                }}
              >
                {products.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={{ ...product, id: product._id }}
                  />
                ))}
              </div>
            ) : (
              <div
                style={{
                  textAlign: "center",
                  padding: "60px 0",
                  color: COLORS.textMuted,
                  fontFamily: FONTS.body,
                }}
              >
                <Package
                  size={48}
                  color={COLORS.border}
                  style={{ marginBottom: "16px" }}
                />
                <p>Bu kategoride henüz ürün yok.</p>
              </div>
            )}
          </>
        )}

        {/* Tümünü Gör */}
        {!loading && products.length > 0 && (
          <div style={{ textAlign: "center", marginTop: "48px" }}>
            <button
              onClick={() => navigate("/products")}
              style={{
                background: "transparent",
                border: `1px solid ${COLORS.border}`,
                color: COLORS.text,
                padding: "14px 48px",
                borderRadius: "3px",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.12em",
                cursor: "pointer",
                fontFamily: FONTS.body,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = COLORS.accent;
                e.currentTarget.style.color = COLORS.accent;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = COLORS.border;
                e.currentTarget.style.color = COLORS.text;
              }}
            >
              TÜM ÜRÜNLERİ GÖRÜNTÜLE →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
