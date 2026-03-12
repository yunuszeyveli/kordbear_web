// src/components/ui/PageLoader.jsx
import { COLORS } from "../../styles/theme";

export default function PageLoader() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(13,13,13,0.7)",
        backdropFilter: "blur(4px)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        {/* Logo spinner */}
        <div
          style={{
            width: "48px",
            height: "48px",
            background: COLORS.accent,
            clipPath:
              "polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)",
            margin: "0 auto 16px",
            animation: "pulse 0.8s ease-in-out infinite",
          }}
        />
        <style>{`
          @keyframes pulse {
            0%, 100% { transform: scale(1);   opacity: 1;   }
            50%       { transform: scale(0.8); opacity: 0.6; }
          }
        `}</style>
      </div>
    </div>
  );
}
