// src/components/auth/AuthCard.jsx
// Sayfanın ortasındaki kart + arkaplan efektleri
// children prop ile içeriği dışarıdan alır

import { COLORS } from "../../styles/theme";

export default function AuthCard({ children }) {
  return (
    <div
      style={{
        background: COLORS.bg,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Izgara arkaplan */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
          linear-gradient(${COLORS.border} 1px, transparent 1px),
          linear-gradient(90deg, ${COLORS.border} 1px, transparent 1px)
        `,
          backgroundSize: "60px 60px",
          opacity: 0.3,
          pointerEvents: "none",
        }}
      />

      {/* Işık efekti */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "400px",
          height: "400px",
          background: `radial-gradient(circle, ${COLORS.accentDim} 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Kart */}
      <div
        style={{
          background: COLORS.surface,
          border: `1px solid ${COLORS.border}`,
          borderRadius: "8px",
          padding: "48px 40px",
          width: "100%",
          maxWidth: "420px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {children}
      </div>
    </div>
  );
}
