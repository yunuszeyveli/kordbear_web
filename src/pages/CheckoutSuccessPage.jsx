// src/pages/CheckoutSuccessPage.jsx
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useEffect } from "react";
import { COLORS, FONTS } from "../styles/theme";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function CheckoutSuccessPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { clearCart } = useCart();
  const orderId = params.get("orderId");

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh" }}>
      <Navbar />
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          padding: "140px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "72px", marginBottom: "24px" }}>🎉</div>
        <h1
          style={{
            fontFamily: FONTS.display,
            fontSize: "52px",
            color: COLORS.text,
            letterSpacing: "0.03em",
            marginBottom: "16px",
          }}
        >
          SİPARİŞ ALINDI!
        </h1>
        <p
          style={{
            fontSize: "15px",
            color: COLORS.textMuted,
            fontFamily: FONTS.body,
            lineHeight: 1.8,
            marginBottom: "12px",
          }}
        >
          Ödemeniz başarıyla tamamlandı.
        </p>
        {orderId && (
          <p
            style={{
              fontSize: "12px",
              color: COLORS.textMuted,
              fontFamily: FONTS.body,
              marginBottom: "40px",
              letterSpacing: "0.05em",
            }}
          >
            Sipariş No:{" "}
            <strong style={{ color: COLORS.accent }}>
              #{orderId.slice(-8).toUpperCase()}
            </strong>
          </p>
        )}
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <button
            onClick={() => navigate("/profile")}
            style={{
              background: COLORS.accent,
              border: "none",
              color: COLORS.white,
              padding: "14px 32px",
              borderRadius: "3px",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              fontFamily: FONTS.body,
            }}
          >
            SİPARİŞLERİMİ GÖR
          </button>
          <button
            onClick={() => navigate("/products")}
            style={{
              background: "transparent",
              border: `1px solid ${COLORS.border}`,
              color: COLORS.text,
              padding: "14px 32px",
              borderRadius: "3px",
              cursor: "pointer",
              fontSize: "13px",
              fontFamily: FONTS.body,
            }}
          >
            ALIŞVERİŞE DEVAM ET
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
