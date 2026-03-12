// src/pages/ProductsPage.jsx
import { useState, useMemo, useEffect } from "react";
import { COLORS, FONTS } from "../styles/theme";
import { Search, SlidersHorizontal, AlertTriangle } from "lucide-react";
import useProducts from "../hooks/useProducts";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ProductCard from "../components/ui/ProductCard";
import api from "../utils/api";

const SORT_OPTIONS = [
  { label: "Varsayılan", value: "default" },
  { label: "Fiyat: Düşük → Yüksek", value: "price_asc" },
  { label: "Fiyat: Yüksek → Düşük", value: "price_desc" },
  { label: "Yeni Gelenler", value: "new" },
];

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tümü");
  const [sortBy, setSortBy] = useState("default");
  const [categories, setCategories] = useState([]);

  const { products, loading, error } = useProducts();

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

  const filtered = useMemo(() => {
    let result = [...products];
    if (activeCategory !== "Tümü")
      result = result.filter((p) => p.category === activeCategory);
    if (searchTerm.trim() !== "")
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    if (sortBy === "price_asc") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price_desc") result.sort((a, b) => b.price - a.price);
    if (sortBy === "new")
      result = [
        ...result.filter((p) => p.tag === "Yeni"),
        ...result.filter((p) => p.tag !== "Yeni"),
      ];
    return result;
  }, [products, searchTerm, activeCategory, sortBy]);

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh" }}>
      <Navbar />

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "140px 24px 80px",
        }}
      >
        {/* Başlık */}
        <div style={{ marginBottom: "48px" }}>
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
          <h1
            style={{
              fontFamily: FONTS.display,
              fontSize: "clamp(48px, 8vw, 80px)",
              color: COLORS.text,
              letterSpacing: "0.03em",
              lineHeight: 1,
            }}
          >
            TÜM ÜRÜNLER
          </h1>
        </div>

        {/* Filtre Barı */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "40px",
            padding: "20px 24px",
            background: COLORS.surface,
            border: `1px solid ${COLORS.border}`,
            borderRadius: "6px",
          }}
        >
          {/* Arama */}
          <div
            style={{
              position: "relative",
              flex: "1",
              minWidth: "200px",
              maxWidth: "320px",
            }}
          >
            <Search
              size={15}
              color={COLORS.textMuted}
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
              }}
            />
            <input
              type="text"
              placeholder="Ürün ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                background: COLORS.bg,
                border: `1px solid ${COLORS.border}`,
                borderRadius: "3px",
                padding: "10px 12px 10px 36px",
                color: COLORS.text,
                fontSize: "13px",
                fontFamily: FONTS.body,
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Kategoriler */}
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
                  padding: "8px 16px",
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

          {/* Sıralama */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <SlidersHorizontal size={14} color={COLORS.textMuted} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                background: COLORS.bg,
                border: `1px solid ${COLORS.border}`,
                color: COLORS.text,
                padding: "10px 14px",
                borderRadius: "3px",
                fontSize: "12px",
                fontFamily: FONTS.body,
                cursor: "pointer",
                outline: "none",
              }}
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Yükleme */}
        {loading && (
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
              Ürünler yükleniyor...
            </p>
          </div>
        )}

        {/* Hata */}
        {error && (
          <div
            style={{
              textAlign: "center",
              padding: "80px 0",
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

        {/* Ürünler */}
        {!loading && !error && (
          <>
            <p
              style={{
                fontSize: "12px",
                color: COLORS.textMuted,
                marginBottom: "24px",
                fontFamily: FONTS.body,
              }}
            >
              {filtered.length} ürün bulundu
            </p>

            {filtered.length > 0 ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                  gap: "20px",
                }}
              >
                {filtered.map((product) => (
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
                  padding: "80px 24px",
                  color: COLORS.textMuted,
                }}
              >
                <Search
                  size={48}
                  color={COLORS.border}
                  style={{ marginBottom: "16px" }}
                />
                <p style={{ fontFamily: FONTS.body, fontSize: "16px" }}>
                  "{searchTerm}" için sonuç bulunamadı.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setActiveCategory("Tümü");
                  }}
                  style={{
                    marginTop: "20px",
                    background: "transparent",
                    border: `1px solid ${COLORS.border}`,
                    color: COLORS.text,
                    padding: "10px 24px",
                    borderRadius: "3px",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontFamily: FONTS.body,
                  }}
                >
                  FİLTRELERİ TEMİZLE
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
