// src/components/sections/HeroSection.jsx
import { COLORS, FONTS } from "../../styles/theme";
import { Link } from "react-router-dom";

// Animasyon stilleri — global CSS yerine JS objesi olarak tanımladık
// Böylece theme.js'den renkleri kullanabiliyoruz
const heroStyles = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes floatOrb {
    0%, 100% { transform: scale(1) translate(0, 0); }
    50%       { transform: scale(1.06) translate(16px, -16px); }
  }
  .hero-title {
    font-family: ${FONTS.display};
    font-size: clamp(52px, 10vw, 104px);
    line-height: 0.92;
    letter-spacing: 0.02em;
    color: ${COLORS.text};
    margin-bottom: 28px;
  }
  .hero-animate { 
    opacity: 0;
    animation: fadeUp 0.7s ease forwards; 
  }
  .hero-animate:nth-child(1) { animation-delay: 0.1s; }
  .hero-animate:nth-child(2) { animation-delay: 0.25s; }
  .hero-animate:nth-child(3) { animation-delay: 0.4s; }
  .hero-animate:nth-child(4) { animation-delay: 0.55s; }

  @media (max-width: 640px) {
    .hero-buttons { flex-direction: column !important; }
  }
`;

export default function HeroSection() {
  return (
    <>
      {/* Animasyon CSS'ini sayfaya enjekte et */}
      <style>{heroStyles}</style>

      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          padding: "68px 24px 0",
        }}
      >
        {/* ── KATMAN 1: ARKA PLAN ── */}

        {/* Izgara */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
            linear-gradient(${COLORS.border} 1px, transparent 1px),
            linear-gradient(90deg, ${COLORS.border} 1px, transparent 1px)
          `,
            backgroundSize: "60px 60px",
            opacity: 0.5,
            pointerEvents: "none",
          }}
        />

        {/* Turuncu ışık — sağ üst */}
        <div
          style={{
            position: "absolute",
            top: "15%",
            right: "5%",
            width: "520px",
            height: "520px",
            background: `radial-gradient(circle, ${COLORS.accentDim} 0%, transparent 70%)`,
            animation: "floatOrb 8s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />

        {/* Soluk ışık — sol alt */}
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "-5%",
            width: "360px",
            height: "360px",
            background: `radial-gradient(circle, ${COLORS.accent}0A 0%, transparent 70%)`,
            animation: "floatOrb 11s ease-in-out infinite reverse",
            pointerEvents: "none",
          }}
        />

        {/* ── KATMAN 2: İÇERİK ── */}
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
            width: "100%",
          }}
        >
          {/* Üst etiket */}
          <div
            className="hero-animate"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: COLORS.accentDim,
              border: `1px solid ${COLORS.accent}44`,
              padding: "6px 14px",
              borderRadius: "2px",
              marginBottom: "28px",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: COLORS.accent,
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.15em",
                color: COLORS.accent,
              }}
            >
              3D BASKI TEKNOLOJİSİ
            </span>
          </div>

          {/* Ana başlık */}
          <h1 className="hero-title hero-animate">
            TASARIMI
            <br />
            <span style={{ lineHeight: 1.3, color: COLORS.accent }}>
              GERÇEĞE
            </span>
            <br />
            DÖNÜŞTÜR
          </h1>

          {/* Açıklama metni */}
          <p
            className="hero-animate"
            style={{
              fontSize: "17px",
              lineHeight: 1.75,
              color: COLORS.textMuted,
              maxWidth: "480px",
              marginBottom: "40px",
              fontFamily: FONTS.body,
            }}
          >
            Kordbear ile her fikir hassas 3D baskı teknolojisiyle hayata
            geçiyor. Fonksiyonellik ve estetiği bir arada sunan özel üretim
            ürünler.
          </p>

          {/* CTA Butonlar */}
          <div
            className="hero-animate hero-buttons"
            style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}
          >
            <button
              style={{
                background: COLORS.accent,
                border: "none",
                color: COLORS.white,
                padding: "16px 40px",
                borderRadius: "3px",
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                cursor: "pointer",
                fontFamily: FONTS.body,
                boxShadow: `0 0 32px ${COLORS.accent}44`,
              }}
            >
              {" "}
              <Link
                to="/products"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                ÜRÜNLERİ KEŞFET →
              </Link>
            </button>

            <button
              style={{
                background: "transparent",
                border: `1px solid ${COLORS.border}`,
                color: COLORS.text,
                padding: "16px 40px",
                borderRadius: "3px",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                cursor: "pointer",
                fontFamily: FONTS.body,
              }}
            >
              {" "}
              <Link
                to="/how-it-works"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                NASIL ÜRETİYORUZ?
              </Link>
            </button>
          </div>
        </div>

        {/* Aşağı kaydır */}
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
            color: COLORS.textMuted,
            fontSize: "11px",
            letterSpacing: "0.15em",
          }}
        >
          <div style={{ marginBottom: "8px" }}>AŞAĞI KAYDIRIN</div>
          <div>↓</div>
        </div>
      </section>
    </>
  );
}
