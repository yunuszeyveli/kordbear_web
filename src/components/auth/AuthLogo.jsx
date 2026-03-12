// src/components/auth/AuthLogo.jsx
// Sadece logo gösterir — Login ve Register sayfalarında ortak kullanılır

import { COLORS, FONTS } from "../../styles/theme";

export default function AuthLogo() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "32px",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "24px",
          height: "24px",
          background: COLORS.accent,
          clipPath: "polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)",
        }}
      />
      <span
        style={{
          fontFamily: FONTS.display,
          fontSize: "22px",
          letterSpacing: "0.12em",
          color: COLORS.text,
        }}
      >
        KORDBEAR
      </span>
    </div>
  );
}
