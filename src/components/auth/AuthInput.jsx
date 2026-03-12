// src/components/auth/AuthInput.jsx
// Tekrar kullanılabilir form inputu
// Props:
//   label       → üstteki etiket yazısı
//   name        → input name attribute
//   type        → "text" | "email" | "password"
//   placeholder → gri yer tutucu yazı
//   value       → kontrollü input değeri
//   onChange    → değişince çalışacak fonksiyon
//   error       → hata mesajı (varsa kırmızı gösterir)

import { COLORS, FONTS } from "../../styles/theme";

export default function AuthInput({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
}) {
  return (
    <div style={{ marginBottom: "20px" }}>
      {/* Etiket */}
      <label
        style={{
          display: "block",
          fontSize: "11px",
          color: COLORS.textMuted,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          marginBottom: "8px",
          fontFamily: FONTS.body,
          fontWeight: 600,
        }}
      >
        {label}
      </label>

      {/* Input */}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: "100%",
          background: COLORS.bg,
          border: `1px solid ${error ? "#ef4444" : COLORS.border}`,
          borderRadius: "3px",
          padding: "12px 16px",
          color: COLORS.text,
          fontSize: "14px",
          fontFamily: FONTS.body,
          outline: "none",
          boxSizing: "border-box",
          transition: "border-color 0.2s",
        }}
        onFocus={(e) => (e.target.style.borderColor = COLORS.accent)}
        onBlur={(e) =>
          (e.target.style.borderColor = error ? "#ef4444" : COLORS.border)
        }
      />

      {/* Hata mesajı */}
      {error && (
        <p
          style={{
            fontSize: "12px",
            color: "#ef4444",
            marginTop: "6px",
            fontFamily: FONTS.body,
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
