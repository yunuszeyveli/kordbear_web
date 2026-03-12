// src/pages/ContactPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Check,
} from "lucide-react";
import { COLORS, FONTS } from "../styles/theme";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Spinner from "../components/ui/Spinner";
import api from "../utils/api";

const CONTACT_INFO = [
  {
    icon: Mail,
    color: "#3b82f6",
    label: "E-POSTA",
    value: "info@kordbear.com",
  },
  {
    icon: Phone,
    color: "#22c55e",
    label: "TELEFON",
    value: "+90 (555) 123 45 67",
  },
  { icon: MapPin, color: "#f59e0b", label: "ADRES", value: "Malatya, Türkiye" },
  {
    icon: Clock,
    color: "#8b5cf6",
    label: "ÇALIŞMA SAATLERİ",
    value: "Pzt–Cum: 09:00–18:00",
  },
];

export default function ContactPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name])
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.fullName) e.fullName = "Ad Soyad zorunludur.";
    if (!form.email) e.email = "E-posta zorunludur.";
    if (!form.subject) e.subject = "Konu zorunludur.";
    if (!form.message) e.message = "Mesaj zorunludur.";
    return e;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    setApiError("");
    try {
      await api.post("/contact", form);
      setSuccess(true);
      setForm({ fullName: "", email: "", phone: "", subject: "", message: "" });
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      setApiError(
        err.response?.data?.message ||
          "Mesaj gönderilemedi. Lütfen tekrar deneyin.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh" }}>
      <Navbar />
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "120px 24px 80px",
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={backBtn}
          onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.text)}
          onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.textMuted)}
        >
          <ArrowLeft size={14} /> Geri Dön
        </button>

        {/* Hero */}
        <div style={{ marginBottom: "64px" }}>
          <p style={tag}>BİZE ULAŞIN</p>
          <h1
            style={{
              fontFamily: FONTS.display,
              fontSize: "clamp(48px,8vw,96px)",
              color: COLORS.text,
              letterSpacing: "0.03em",
              lineHeight: 1,
              marginBottom: "32px",
            }}
          >
            İLETİŞİM
          </h1>
          <div
            style={{
              width: "60px",
              height: "3px",
              background: COLORS.accent,
              marginBottom: "32px",
            }}
          />
          <p
            style={{
              fontSize: "18px",
              color: COLORS.textMuted,
              fontFamily: FONTS.body,
              lineHeight: 1.8,
              maxWidth: "600px",
            }}
          >
            Sorularınız, özel sipariş talepleriniz veya iş birliği teklifleriniz
            için bize ulaşın. En kısa sürede geri dönüş yapacağız.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 400px",
            gap: "32px",
            alignItems: "start",
          }}
        >
          {/* Sol — Form */}
          <div
            style={{
              background: COLORS.surface,
              border: `1px solid ${COLORS.border}`,
              borderRadius: "6px",
              padding: "32px",
            }}
          >
            <h2
              style={{
                fontFamily: FONTS.display,
                fontSize: "28px",
                color: COLORS.text,
                letterSpacing: "0.03em",
                marginBottom: "24px",
              }}
            >
              MESAJ GÖNDER
            </h2>

            {/* Başarı */}
            {success && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "14px 16px",
                  background: "#22c55e11",
                  border: "1px solid #22c55e33",
                  borderRadius: "4px",
                  marginBottom: "20px",
                }}
              >
                <Check size={15} color="#22c55e" />
                <span
                  style={{
                    fontSize: "13px",
                    color: "#22c55e",
                    fontFamily: FONTS.body,
                  }}
                >
                  Mesajınız iletildi! En kısa sürede dönüş yapacağız.
                </span>
              </div>
            )}

            {/* API Hatası */}
            {apiError && (
              <div
                style={{
                  padding: "14px 16px",
                  background: "#ef444411",
                  border: "1px solid #ef444433",
                  borderRadius: "4px",
                  marginBottom: "20px",
                }}
              >
                <span
                  style={{
                    fontSize: "13px",
                    color: "#ef4444",
                    fontFamily: FONTS.body,
                  }}
                >
                  {apiError}
                </span>
              </div>
            )}

            {/* Ad Soyad + E-posta */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
                marginBottom: "16px",
              }}
            >
              <div>
                <label style={labelStyle}>AD SOYAD *</label>
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Ahmet Yılmaz"
                  style={{
                    ...inputStyle,
                    borderColor: errors.fullName ? "#ef4444" : "#2A2A2A",
                  }}
                />
                {errors.fullName && <p style={errorStyle}>{errors.fullName}</p>}
              </div>
              <div>
                <label style={labelStyle}>E-POSTA *</label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="ahmet@email.com"
                  style={{
                    ...inputStyle,
                    borderColor: errors.email ? "#ef4444" : "#2A2A2A",
                  }}
                />
                {errors.email && <p style={errorStyle}>{errors.email}</p>}
              </div>
            </div>

            {/* Telefon + Konu */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
                marginBottom: "16px",
              }}
            >
              <div>
                <label style={labelStyle}>TELEFON</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+90 555 000 00 00"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>KONU *</label>
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Sipariş hakkında..."
                  style={{
                    ...inputStyle,
                    borderColor: errors.subject ? "#ef4444" : "#2A2A2A",
                  }}
                />
                {errors.subject && <p style={errorStyle}>{errors.subject}</p>}
              </div>
            </div>

            {/* Mesaj */}
            <div style={{ marginBottom: "24px" }}>
              <label style={labelStyle}>MESAJ *</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={6}
                placeholder="Mesajınızı buraya yazın..."
                style={{
                  ...inputStyle,
                  resize: "vertical",
                  borderColor: errors.message ? "#ef4444" : "#2A2A2A",
                }}
              />
              {errors.message && <p style={errorStyle}>{errors.message}</p>}
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                background: loading ? COLORS.border : COLORS.accent,
                border: "none",
                color: COLORS.white,
                padding: "14px 32px",
                borderRadius: "3px",
                cursor: loading ? "not-allowed" : "pointer",
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                fontFamily: FONTS.body,
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "background 0.2s",
              }}
            >
              {loading ? (
                <>
                  <Spinner size={14} /> GÖNDERİLİYOR...
                </>
              ) : (
                <>
                  <Send size={14} /> MESAJ GÖNDER
                </>
              )}
            </button>
          </div>

          {/* Sağ — İletişim Bilgileri */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {CONTACT_INFO.map(({ icon: Icon, color, label, value }, i) => (
              <div
                key={i}
                style={{
                  background: COLORS.surface,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: "6px",
                  padding: "24px",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = color + "66")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = COLORS.border)
                }
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    background: color + "22",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={20} color={color} />
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      color: COLORS.textMuted,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      marginBottom: "4px",
                      fontFamily: FONTS.body,
                    }}
                  >
                    {label}
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      color: COLORS.text,
                      fontFamily: FONTS.body,
                      fontWeight: 600,
                    }}
                  >
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

const backBtn = {
  background: "transparent",
  border: "none",
  color: COLORS.textMuted,
  cursor: "pointer",
  fontSize: "13px",
  fontFamily: FONTS.body,
  letterSpacing: "0.05em",
  marginBottom: "32px",
  display: "flex",
  alignItems: "center",
  gap: "6px",
  padding: 0,
  transition: "color 0.2s",
};
const tag = {
  fontSize: "11px",
  color: COLORS.accent,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  marginBottom: "10px",
  fontFamily: FONTS.body,
};
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
