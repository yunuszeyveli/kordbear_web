// src/components/sections/CtaBanner.jsx
import { COLORS, FONTS } from "../../styles/theme";
import { Link } from "react-router-dom";
export default function CtaBanner() {
  return (
    <section
      style={{
        background: COLORS.accent,
        padding: "72px 24px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Izgara efekti — Hero'daki ile aynı teknik */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
          linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)
        `,
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <h2
          style={{
            fontFamily: FONTS.display,
            fontSize: "clamp(36px, 6vw, 56px)",
            color: COLORS.white,
            letterSpacing: "0.03em",
            marginBottom: "16px",
          }}
        >
          ÖZEL TASARIM MI İSTİYORSUNUZ?
        </h2>

        <p
          style={{
            fontSize: "16px",
            color: "rgba(255,255,255,0.85)",
            marginBottom: "32px",
            fontFamily: FONTS.body,
          }}
        >
          Ekibimizle iletişime geçin, hayalinizdeki ürünü birlikte üretelim.
        </p>

        <button
          style={{
            background: COLORS.white,
            border: "none",
            color: COLORS.accent,
            padding: "16px 48px",
            borderRadius: "3px",
            fontSize: "13px",
            fontWeight: 800,
            letterSpacing: "0.12em",
            cursor: "pointer",
            fontFamily: FONTS.body,
          }}
        >
          <Link to="/contact" style={{ textDecoration: "none", color: COLORS.accent }}>
          BİZE ULAŞIN →
          </Link>
        </button>
      </div>
    </section>
  );
}
