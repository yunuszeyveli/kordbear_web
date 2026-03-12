// src/pages/RegisterPage.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, LogIn, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { COLORS, FONTS } from "../styles/theme";
import { useAuth } from "../context/AuthContext";
import AuthCard from "../components/auth/AuthCard";
import AuthLogo from "../components/auth/AuthLogo";
import api from "../utils/api";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Ad Soyad zorunludur.";
    if (!formData.email) newErrors.email = "E-posta zorunludur.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Geçerli bir e-posta girin.";
    if (!formData.password) newErrors.password = "Şifre zorunludur.";
    else if (formData.password.length < 6)
      newErrors.password = "Şifre en az 6 karakter olmalı.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Şifreler eşleşmiyor.";
    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      const { confirmPassword, ...registerData } = formData;
      const response = await api.post("/auth/register", registerData);
      const { token, user } = response.data;
      login({ ...user, token });
      navigate("/");
    } catch (error) {
      setErrors({
        email: error.response?.data?.message || "Kayıt başarısız",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard>
      <AuthLogo />

      <h1
        style={{
          fontFamily: FONTS.display,
          fontSize: "36px",
          color: COLORS.text,
          letterSpacing: "0.05em",
          marginBottom: "8px",
          textAlign: "center",
        }}
      >
        KAYIT OL
      </h1>
      <p
        style={{
          fontSize: "13px",
          color: COLORS.textMuted,
          textAlign: "center",
          marginBottom: "32px",
          fontFamily: FONTS.body,
        }}
      >
        Hesap oluştur, özel fırsatlardan yararlan.
      </p>

      {/* ── AD SOYAD ── */}
      <div style={{ marginBottom: "20px" }}>
        <label style={labelStyle}>AD SOYAD</label>
        <div style={{ position: "relative" }}>
          <User
            size={15}
            color={COLORS.textMuted}
            style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
            }}
          />
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ahmet Yılmaz"
            style={{
              ...inputStyle,
              paddingLeft: "40px",
              borderColor: errors.name ? "#ef4444" : "#2A2A2A",
            }}
          />
        </div>
        {errors.name && <p style={errorStyle}>{errors.name}</p>}
      </div>

      {/* ── E-POSTA ── */}
      <div style={{ marginBottom: "20px" }}>
        <label style={labelStyle}>E-POSTA</label>
        <div style={{ position: "relative" }}>
          <Mail
            size={15}
            color={COLORS.textMuted}
            style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
            }}
          />
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ornek@mail.com"
            style={{
              ...inputStyle,
              paddingLeft: "40px",
              borderColor: errors.email ? "#ef4444" : "#2A2A2A",
            }}
          />
        </div>
        {errors.email && <p style={errorStyle}>{errors.email}</p>}
      </div>

      {/* ── ŞİFRE ── */}
      <div style={{ marginBottom: "20px" }}>
        <label style={labelStyle}>ŞİFRE</label>
        <div style={{ position: "relative" }}>
          <Lock
            size={15}
            color={COLORS.textMuted}
            style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
            }}
          />
          <input
            name="password"
            type={showPass ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            style={{
              ...inputStyle,
              paddingLeft: "40px",
              paddingRight: "44px",
              borderColor: errors.password ? "#ef4444" : "#2A2A2A",
            }}
          />
          <button
            onClick={() => setShowPass(!showPass)}
            style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: COLORS.textMuted,
              display: "flex",
              alignItems: "center",
              padding: 0,
            }}
          >
            {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
        {errors.password && <p style={errorStyle}>{errors.password}</p>}
      </div>

      {/* ── ŞİFRE TEKRARI ── */}
      <div style={{ marginBottom: "28px" }}>
        <label style={labelStyle}>ŞİFRE TEKRARI</label>
        <div style={{ position: "relative" }}>
          <Lock
            size={15}
            color={COLORS.textMuted}
            style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
            }}
          />
          <input
            name="confirmPassword"
            type={showConfirmPass ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            style={{
              ...inputStyle,
              paddingLeft: "40px",
              paddingRight: "44px",
              borderColor: errors.confirmPassword ? "#ef4444" : "#2A2A2A",
            }}
          />
          <button
            onClick={() => setShowConfirmPass(!showConfirmPass)}
            style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: COLORS.textMuted,
              display: "flex",
              alignItems: "center",
              padding: 0,
            }}
          >
            {showConfirmPass ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p style={errorStyle}>{errors.confirmPassword}</p>
        )}
      </div>

      {/* ── KAYIT BUTONU ── */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          width: "100%",
          background: loading ? COLORS.border : COLORS.accent,
          border: "none",
          color: COLORS.white,
          padding: "14px",
          borderRadius: "3px",
          fontSize: "13px",
          fontWeight: 700,
          letterSpacing: "0.1em",
          cursor: loading ? "not-allowed" : "pointer",
          fontFamily: FONTS.body,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          transition: "background 0.2s",
        }}
      >
        {loading ? (
          "HESAP OLUŞTURULUYOR..."
        ) : (
          <>
            <LogIn size={15} />
            KAYIT OL
          </>
        )}
      </button>

      {/* ── GİRİŞ YAP ── */}
      <p
        style={{
          textAlign: "center",
          marginTop: "24px",
          fontSize: "13px",
          color: COLORS.textMuted,
          fontFamily: FONTS.body,
        }}
      >
        Zaten hesabın var mı?{" "}
        <Link
          to="/login"
          style={{
            color: COLORS.accent,
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Giriş Yap
        </Link>
      </p>

      {/* ── ANA SAYFAYA DÖN ── */}
      <div style={{ textAlign: "center", marginTop: "16px" }}>
        <Link
          to="/"
          style={{
            fontSize: "12px",
            color: COLORS.textMuted,
            textDecoration: "none",
            fontFamily: FONTS.body,
            letterSpacing: "0.06em",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.text)}
          onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.textMuted)}
        >
          <ArrowLeft size={12} />
          Ana Sayfaya Dön
        </Link>
      </div>
    </AuthCard>
  );
}

const labelStyle = {
  display: "block",
  fontSize: "11px",
  color: "#888880",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  marginBottom: "8px",
  fontFamily: "'DM Sans', sans-serif",
  fontWeight: 600,
};

const inputStyle = {
  width: "100%",
  background: "#0D0D0D",
  border: "1px solid #2A2A2A",
  borderRadius: "3px",
  padding: "12px 16px",
  color: "#F0EDE8",
  fontSize: "14px",
  fontFamily: "'DM Sans', sans-serif",
  outline: "none",
  boxSizing: "border-box",
};

const errorStyle = {
  fontSize: "12px",
  color: "#ef4444",
  marginTop: "6px",
  fontFamily: "'DM Sans', sans-serif",
};
