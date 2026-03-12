// src/pages/CheckoutPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight, Lock } from "lucide-react";
import { COLORS, FONTS } from "../styles/theme";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Spinner from "../components/ui/Spinner";
import api from "../utils/api";

const CITIES = [
  "Adana",
  "Ankara",
  "Antalya",
  "Bursa",
  "Diyarbakır",
  "Eskişehir",
  "Gaziantep",
  "İstanbul",
  "İzmir",
  "Kayseri",
  "Konya",
  "Mersin",
  "Malatya",
  "Samsun",
  "Trabzon",
  "Van",
];

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, totalPrice, clearCart } = useCart();
  useEffect(() => {
    if (items.length === 0) {
      navigate("/cart");
    }
  }, [items]);

  const shippingCost = totalPrice >= 500 ? 0 : 49;

  const [form, setForm] = useState({
    fullName: user?.name || "",
    phone: "",
    city: "",
    district: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name])
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.fullName) e.fullName = "Ad Soyad zorunludur.";
    if (!form.phone) e.phone = "Telefon zorunludur.";
    if (!form.city) e.city = "İl seçiniz.";
    if (!form.district) e.district = "İlçe zorunludur.";
    if (!form.address) e.address = "Adres zorunludur.";
    return e;
  };

  const handleSubmit = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    try {
      console.log("ödeme başlatılıyor..."); // ← kontrol
      const res = await api.post("/payment/initiate", {
        items: items.map((item) => ({
          product: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        shippingAddress: form,
      });

      console.log("API yanıtı:", res.data); // ← kontrol

      if (res.data.success && res.data.paymentPageUrl) {
        window.location.href = res.data.paymentPageUrl;
      } else {
        console.log("paymentPageUrl yok:", res.data);
        setErrors({ address: "Ödeme sayfası alınamadı" });
      }
    } catch (err) {
      console.log("Hata:", err.response?.data);
      setErrors({
        address: err.response?.data?.message || "Ödeme başlatılamadı",
      });
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
        {/* Geri */}
        <button
          onClick={() => navigate(-1)}
          style={{
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
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.text)}
          onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.textMuted)}
        >
          <ArrowLeft size={14} /> Geri Dön
        </button>

        {/* Başlık */}
        <div style={{ marginBottom: "48px" }}>
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
            CHECKOUT
          </p>
          <h1
            style={{
              fontFamily: FONTS.display,
              fontSize: "clamp(40px, 6vw, 64px)",
              color: COLORS.text,
              letterSpacing: "0.03em",
              lineHeight: 1,
            }}
          >
            TESLİMAT BİLGİLERİ
          </h1>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 360px",
            gap: "32px",
            alignItems: "start",
          }}
        >
          {/* Sol — Adres Formu */}
          <div
            style={{
              background: COLORS.surface,
              border: `1px solid ${COLORS.border}`,
              borderRadius: "6px",
              padding: "32px",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
              }}
            >
              <div style={{ gridColumn: "1 / -1" }}>
                <FormField
                  label="AD SOYAD"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  error={errors.fullName}
                  placeholder="Ahmet Yılmaz"
                />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <FormField
                  label="TELEFON"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  placeholder="05XX XXX XX XX"
                />
              </div>
              <div>
                <label style={labelStyle}>İL</label>
                <select
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  style={{
                    ...inputStyle,
                    borderColor: errors.city ? "#ef4444" : "#2A2A2A",
                  }}
                >
                  <option value="">İl seçin</option>
                  {CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {errors.city && <p style={errorStyle}>{errors.city}</p>}
              </div>
              <div>
                <FormField
                  label="İLÇE"
                  name="district"
                  value={form.district}
                  onChange={handleChange}
                  error={errors.district}
                  placeholder="İlçe"
                />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>AÇIK ADRES</label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Mahalle, sokak, bina no, daire no..."
                  style={{
                    ...inputStyle,
                    resize: "vertical",
                    borderColor: errors.address ? "#ef4444" : "#2A2A2A",
                  }}
                />
                {errors.address && <p style={errorStyle}>{errors.address}</p>}
              </div>
            </div>
          </div>

          {/* Sağ — Özet */}
          <div
            style={{
              background: COLORS.surface,
              border: `1px solid ${COLORS.border}`,
              borderRadius: "6px",
              padding: "28px",
              position: "sticky",
              top: "90px",
            }}
          >
            <h3
              style={{
                fontFamily: FONTS.display,
                fontSize: "24px",
                color: COLORS.text,
                marginBottom: "20px",
              }}
            >
              SİPARİŞ ÖZETİ
            </h3>

            {items.map((item) => (
              <div
                key={item._id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "4px",
                      overflow: "hidden",
                      background: "#1a1a1a",
                      border: `1px solid ${COLORS.border}`,
                      flexShrink: 0,
                    }}
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "16px",
                        }}
                      >
                        📦
                      </div>
                    )}
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: "13px",
                        color: COLORS.text,
                        fontFamily: FONTS.body,
                        fontWeight: 600,
                      }}
                    >
                      {item.name}
                    </p>
                    <p
                      style={{
                        fontSize: "11px",
                        color: COLORS.textMuted,
                        fontFamily: FONTS.body,
                      }}
                    >
                      x{item.quantity}
                    </p>
                  </div>
                </div>
                <span
                  style={{
                    fontFamily: FONTS.body,
                    fontSize: "13px",
                    color: COLORS.text,
                    fontWeight: 600,
                  }}
                >
                  ₺{item.price * item.quantity}
                </span>
              </div>
            ))}

            <div
              style={{
                borderTop: `1px solid ${COLORS.border}`,
                marginTop: "16px",
                paddingTop: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <span
                  style={{
                    fontSize: "13px",
                    color: COLORS.textMuted,
                    fontFamily: FONTS.body,
                  }}
                >
                  Ara Toplam
                </span>
                <span
                  style={{
                    fontSize: "13px",
                    color: COLORS.text,
                    fontFamily: FONTS.body,
                  }}
                >
                  ₺{totalPrice}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                }}
              >
                <span
                  style={{
                    fontSize: "13px",
                    color: COLORS.textMuted,
                    fontFamily: FONTS.body,
                  }}
                >
                  Kargo
                </span>
                <span
                  style={{
                    fontSize: "13px",
                    fontFamily: FONTS.body,
                    fontWeight: 600,
                    color: shippingCost === 0 ? "#22c55e" : COLORS.text,
                  }}
                >
                  {shippingCost === 0 ? "Ücretsiz" : `₺${shippingCost}`}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "24px",
                }}
              >
                <span
                  style={{
                    fontFamily: FONTS.body,
                    fontWeight: 700,
                    color: COLORS.text,
                    fontSize: "15px",
                  }}
                >
                  TOPLAM
                </span>
                <span
                  style={{
                    fontFamily: FONTS.display,
                    fontSize: "28px",
                    color: COLORS.accent,
                    letterSpacing: "0.05em",
                  }}
                >
                  ₺{totalPrice + shippingCost}
                </span>
              </div>

              {/* Güvenli ödeme bildirimi */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 14px",
                  background: "#22c55e11",
                  border: "1px solid #22c55e33",
                  borderRadius: "4px",
                  marginBottom: "16px",
                }}
              >
                <Lock size={13} color="#22c55e" />
                <span
                  style={{
                    fontSize: "12px",
                    color: "#22c55e",
                    fontFamily: FONTS.body,
                  }}
                >
                  iyzico güvencesiyle güvenli ödeme
                </span>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  width: "100%",
                  background: loading ? COLORS.border : COLORS.accent,
                  border: "none",
                  color: COLORS.white,
                  padding: "16px",
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
                  <>
                    <Spinner size={14} /> YÖNLENDİRİLİYOR...
                  </>
                ) : (
                  <>
                    ÖDEMEYE GEÇ <ChevronRight size={16} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function FormField({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input
        name={name}
        value={value}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        style={{ ...inputStyle, borderColor: error ? "#ef4444" : "#2A2A2A" }}
      />
      {error && <p style={errorStyle}>{error}</p>}
    </div>
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
