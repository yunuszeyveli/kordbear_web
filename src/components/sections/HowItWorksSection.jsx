// src/components/sections/HowItWorksSection.jsx
import { COLORS, FONTS } from "../../styles/theme";
import { HOW_IT_WORKS } from "../../data/mockData";

export default function HowItWorksSection() {
  return (
    <section
      style={{
        background: COLORS.surface,
        borderTop: `1px solid ${COLORS.border}`,
        padding: "80px 24px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* ── BAŞLIK ── */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
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
            SÜREÇ
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
            NASIL ÇALIŞIR?
          </h2>
        </div>

        {/* ── ADIM KARTLARI ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1px",
            background: COLORS.border,
            border: `1px solid ${COLORS.border}`,
            borderRadius: "6px",
            overflow: "hidden",
          }}
        >
          {HOW_IT_WORKS.map((item) => (
            <StepCard key={item.step} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({ item }) {
  const Icon = item.icon;
  return (
    <div
      style={{
        background: COLORS.surface,
        padding: "40px 32px",
        position: "relative",
        transition: "background 0.2s ease",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.background = COLORS.surfaceHover)
      }
      onMouseLeave={(e) => (e.currentTarget.style.background = COLORS.surface)}
    >
      {/* Watermark step numarası */}
      <div
        style={{
          position: "absolute",
          top: "16px",
          right: "20px",
          fontFamily: FONTS.display,
          fontSize: "64px",
          lineHeight: 1,
          color: `${COLORS.accent}12`,
          letterSpacing: "0.05em",
          pointerEvents: "none",
        }}
      >
        {item.step}
      </div>

      {/* Lucide İkon */}
      <div
        style={{
          width: "48px",
          height: "48px",
          background: COLORS.accent + "18",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <Icon size={24} color={COLORS.accent} />
      </div>

      <h3
        style={{
          fontSize: "17px",
          fontWeight: 700,
          color: COLORS.text,
          marginBottom: "10px",
          fontFamily: FONTS.body,
        }}
      >
        {item.title}
      </h3>
      <p
        style={{
          fontSize: "13px",
          color: COLORS.textMuted,
          lineHeight: 1.7,
          fontFamily: FONTS.body,
        }}
      >
        {item.desc}
      </p>
    </div>
  );
}
