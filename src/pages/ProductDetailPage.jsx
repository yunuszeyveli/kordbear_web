// src/pages/ProductDetailPage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Check, Package, Diamond } from "lucide-react";
import { COLORS, FONTS } from "../styles/theme";
import api from "../utils/api";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Badge from "../components/ui/Badge";
import { useCart } from "../context/CartContext";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/products/${id}`);
        setProduct(response.data.product);
      } catch {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // ── YÜKLEME ──────────────────────────────────────────────
  if (loading) {
    return (
      <div style={{ background: COLORS.bg, minHeight: "100vh" }}>
        <Navbar />
        <div style={{ textAlign: "center", padding: "140px 24px" }}>
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
            Ürün yükleniyor...
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  // ── ÜRÜN BULUNAMADI ───────────────────────────────────────
  if (!product) {
    return (
      <div style={{ background: COLORS.bg, minHeight: "100vh" }}>
        <Navbar />
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "140px 24px",
            textAlign: "center",
          }}
        >
          <Package
            size={64}
            color={COLORS.textMuted}
            style={{ marginBottom: "24px" }}
          />
          <h1
            style={{
              fontFamily: FONTS.display,
              fontSize: "48px",
              color: COLORS.text,
              marginBottom: "16px",
            }}
          >
            ÜRÜN BULUNAMADI
          </h1>
          <button
            onClick={() => navigate("/products")}
            style={{
              background: COLORS.accent,
              border: "none",
              color: COLORS.white,
              padding: "14px 32px",
              borderRadius: "3px",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: 700,
              fontFamily: FONTS.body,
              letterSpacing: "0.1em",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <ArrowLeft size={14} /> ÜRÜNLERE DÖN
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const isAccentTag = product.tag === "Yeni" || product.tag === "Çok Satan";

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh" }}>
      <Navbar />

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "120px 24px 80px",
        }}
      >
        {/* ── GERİ BUTONU ── */}
        <button
          onClick={() => navigate("/products")}
          style={{
            background: "transparent",
            border: "none",
            color: COLORS.textMuted,
            cursor: "pointer",
            fontSize: "13px",
            fontFamily: FONTS.body,
            letterSpacing: "0.05em",
            marginBottom: "40px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: 0,
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.text)}
          onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.textMuted)}
        >
          <ArrowLeft size={14} /> Tüm Ürünler
        </button>

        {/* ── ANA İÇERİK ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "64px",
            alignItems: "start",
          }}
        >
          {/* Sol — Görsel */}
          <div
            style={{
              background: "#1a1a1a",
              border: `1px solid ${COLORS.border}`,
              borderRadius: "8px",
              aspectRatio: "1",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
                <Package size={120} color={COLORS.border} />
              </div>
            )}

            {product.tag && (
              <div style={{ position: "absolute", top: "20px", left: "20px" }}>
                <Badge accent={isAccentTag}>{product.tag}</Badge>
              </div>
            )}

            <div
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: "60px",
                height: "60px",
                background: COLORS.accent,
                clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
              }}
            />
          </div>

          {/* Sağ — Bilgi */}
          <div>
            <p
              style={{
                fontSize: "11px",
                color: COLORS.accent,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: "12px",
                fontFamily: FONTS.body,
              }}
            >
              {product.category}
            </p>

            <h1
              style={{
                fontFamily: FONTS.display,
                fontSize: "clamp(36px, 5vw, 56px)",
                color: COLORS.text,
                lineHeight: 1,
                letterSpacing: "0.02em",
                marginBottom: "20px",
              }}
            >
              {product.name}
            </h1>

            <div
              style={{
                fontSize: "42px",
                fontFamily: FONTS.display,
                color: COLORS.accent,
                letterSpacing: "0.05em",
                marginBottom: "24px",
              }}
            >
              ₺{product.price}
            </div>

            <p
              style={{
                fontSize: "15px",
                color: COLORS.textMuted,
                lineHeight: 1.8,
                marginBottom: "32px",
                fontFamily: FONTS.body,
              }}
            >
              {product.description}
            </p>

            {/* Özellikler */}
            {product.specs?.length > 0 && (
              <div
                style={{
                  background: COLORS.surface,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: "6px",
                  padding: "20px 24px",
                  marginBottom: "32px",
                }}
              >
                <p
                  style={{
                    fontSize: "11px",
                    color: COLORS.textMuted,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    marginBottom: "14px",
                    fontFamily: FONTS.body,
                  }}
                >
                  ÜRÜN ÖZELLİKLERİ
                </p>
                {product.specs.map((spec, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "8px 0",
                      borderTop: i > 0 ? `1px solid ${COLORS.border}` : "none",
                    }}
                  >
                    <Diamond
                      size={10}
                      color={COLORS.accent}
                      style={{ flexShrink: 0 }}
                    />
                    <span
                      style={{
                        fontSize: "13px",
                        color: COLORS.text,
                        fontFamily: FONTS.body,
                      }}
                    >
                      {spec}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Adet + Sepet */}
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              {/* Adet */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: "3px",
                  overflow: "hidden",
                }}
              >
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: COLORS.text,
                    width: "44px",
                    height: "50px",
                    cursor: "pointer",
                    fontSize: "18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = COLORS.border)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  −
                </button>
                <span
                  style={{
                    width: "44px",
                    textAlign: "center",
                    color: COLORS.text,
                    fontSize: "15px",
                    fontFamily: FONTS.body,
                    fontWeight: 600,
                  }}
                >
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: COLORS.text,
                    width: "44px",
                    height: "50px",
                    cursor: "pointer",
                    fontSize: "18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = COLORS.border)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  +
                </button>
              </div>

              {/* Sepete Ekle */}
              <button
                onClick={handleAddToCart}
                style={{
                  flex: 1,
                  background: added ? "#22c55e" : COLORS.accent,
                  border: "none",
                  color: COLORS.white,
                  height: "50px",
                  borderRadius: "3px",
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  cursor: "pointer",
                  fontFamily: FONTS.body,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "background 0.3s ease",
                }}
              >
                {added ? (
                  <>
                    <Check size={16} /> SEPETE EKLENDİ
                  </>
                ) : (
                  <>
                    <ShoppingCart size={16} /> SEPETE EKLE
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
