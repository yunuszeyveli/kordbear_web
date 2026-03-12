// src/components/ui/ProductCard.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Check } from "lucide-react";
import { COLORS, FONTS } from "../../styles/theme";
import { useCart } from "../../context/CartContext";
import Badge from "./Badge";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);

  const isAccentTag = product.tag === "Yeni" || product.tag === "Çok Satan";

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: COLORS.surface,
        border: `1px solid ${hovered ? COLORS.accent + "66" : COLORS.border}`,
        borderRadius: "6px",
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.25s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? `0 12px 40px ${COLORS.accent}11` : "none",
      }}
    >
      {/* ── GÖRSEL ── */}
      <div
        onClick={() => navigate(`/products/${product._id || product.id}`)}
        style={{
          height: "200px",
          background: "#1a1a1a",
          position: "relative",
          overflow: "hidden",
          borderBottom: `1px solid ${COLORS.border}`,
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
              transition: "transform 0.4s ease",
              transform: hovered ? "scale(1.06)" : "scale(1)",
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
              fontSize: "64px",
            }}
          >
            📦
          </div>
        )}

        {/* Etiket */}
        {product.tag && (
          <div
            style={{
              position: "absolute",
              top: "12px",
              left: "12px",
              zIndex: 1,
            }}
          >
            <Badge accent={isAccentTag}>{product.tag}</Badge>
          </div>
        )}

        {/* Köşe efekti */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "36px",
            height: "36px",
            background: COLORS.accent,
            clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.2s ease",
          }}
        />
      </div>

      {/* ── BİLGİ ── */}
      <div
        onClick={() => navigate(`/products/${product._id || product.id}`)}
        style={{ padding: "16px 18px 12px" }}
      >
        <p
          style={{
            fontSize: "10px",
            color: COLORS.textMuted,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "6px",
            fontFamily: FONTS.body,
          }}
        >
          {product.category}
        </p>
        <h3
          style={{
            fontSize: "15px",
            fontWeight: 600,
            color: COLORS.text,
            fontFamily: FONTS.body,
            marginBottom: "10px",
            lineHeight: 1.3,
          }}
        >
          {product.name}
        </h3>
        <div
          style={{
            fontFamily: FONTS.display,
            fontSize: "22px",
            color: COLORS.accent,
            letterSpacing: "0.05em",
          }}
        >
          ₺{product.price}
        </div>
      </div>

      {/* ── SEPETE EKLE ── */}
      <div style={{ padding: "0 18px 18px" }}>
        <button
          onClick={handleAddToCart}
          style={{
            width: "100%",
            background: added ? "#22c55e" : "transparent",
            border: `1px solid ${added ? "#22c55e" : COLORS.border}`,
            color: added ? COLORS.white : COLORS.textMuted,
            padding: "10px",
            borderRadius: "3px",
            cursor: "pointer",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            fontFamily: FONTS.body,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            if (!added) {
              e.currentTarget.style.background = COLORS.accent;
              e.currentTarget.style.borderColor = COLORS.accent;
              e.currentTarget.style.color = COLORS.white;
            }
          }}
          onMouseLeave={(e) => {
            if (!added) {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = COLORS.border;
              e.currentTarget.style.color = COLORS.textMuted;
            }
          }}
        >
          {added ? (
            <>
              <Check size={14} />
              SEPETE EKLENDİ
            </>
          ) : (
            <>
              <ShoppingCart size={14} />
              SEPETE EKLE
            </>
          )}
        </button>
      </div>
    </div>
  );
}
