import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Truck,
  RefreshCw,
  Package,
  AlertCircle,
} from "lucide-react";
import { COLORS, FONTS } from "../styles/theme";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const SECTIONS = [
  {
    icon: Truck,
    color: "#3b82f6",
    title: "Kargo Bilgileri",
    items: [
      "500₺ ve üzeri siparişlerde kargo ücretsizdir.",
      "500₺ altı siparişlerde kargo ücreti 49₺'dir.",
      "Yurtiçi Kargo ve Aras Kargo ile çalışmaktayız.",
      "Siparişler 1-3 iş günü içinde kargoya verilir.",
      "Kargoya verilen siparişler 1-3 iş günü içinde teslim edilir.",
      "Kargo takip numarası e-posta ile bildirilir.",
    ],
  },
  {
    icon: RefreshCw,
    color: "#22c55e",
    title: "İade Koşulları",
    items: [
      "Ürünü teslim aldıktan sonra 14 gün içinde iade edebilirsiniz.",
      "İade edilecek ürün kullanılmamış ve orijinal ambalajında olmalıdır.",
      "Kişiye özel üretilen ürünler iade kapsamı dışındadır.",
      "İade kargo ücreti alıcıya aittir.",
      "Üretim hatası durumunda kargo ücreti tarafımızca karşılanır.",
      "İade onayından sonra ödeme 3-5 iş günü içinde iade edilir.",
    ],
  },
  {
    icon: Package,
    color: "#f59e0b",
    title: "Değişim Koşulları",
    items: [
      "Yanlış veya hasarlı ürün gönderilmesi durumunda ücretsiz değişim yapılır.",
      "Değişim talebi teslimattan itibaren 14 gün içinde yapılmalıdır.",
      "Değişim için ürünün kullanılmamış olması gerekmektedir.",
      "Değişim kargo ücreti ilk değişimde tarafımızca karşılanır.",
    ],
  },
  {
    icon: AlertCircle,
    color: "#ef4444",
    title: "Önemli Notlar",
    items: [
      "Hasarlı teslimatlarda kargo firmasına tutanak tutturulması gerekmektedir.",
      "Paket açılış videosu çekilmesi hasar durumunda hak talebini kolaylaştırır.",
      "İade ve değişim için info@kordbear.com adresine yazabilirsiniz.",
      "Tüm işlemler Tüketici Koruma Kanunu kapsamında gerçekleştirilmektedir.",
    ],
  },
];

export default function ShippingPolicyPage() {
  const navigate = useNavigate();
  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh" }}>
      <Navbar />
      <div
        style={{
          maxWidth: "900px",
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

        <div style={{ marginBottom: "64px" }}>
          <p style={tag}>POLİTİKALARIMIZ</p>
          <h1
            style={{
              fontFamily: FONTS.display,
              fontSize: "clamp(48px,8vw,80px)",
              color: COLORS.text,
              letterSpacing: "0.03em",
              lineHeight: 1,
              marginBottom: "32px",
            }}
          >
            KARGO & İADE POLİTİKASI
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
            }}
          >
            Müşteri memnuniyetini ön planda tutarak şeffaf ve adil bir kargo ve
            iade politikası uyguluyoruz.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {SECTIONS.map(({ icon: Icon, color, title, items }, i) => (
            <div
              key={i}
              style={{
                background: COLORS.surface,
                border: `1px solid ${COLORS.border}`,
                borderRadius: "6px",
                padding: "28px",
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
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  marginBottom: "20px",
                }}
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
                  <Icon size={22} color={color} />
                </div>
                <h2
                  style={{
                    fontFamily: FONTS.display,
                    fontSize: "24px",
                    color: COLORS.text,
                    letterSpacing: "0.03em",
                  }}
                >
                  {title}
                </h2>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {items.map((item, j) => (
                  <div
                    key={j}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: color,
                        marginTop: "7px",
                        flexShrink: 0,
                      }}
                    />
                    <p
                      style={{
                        fontSize: "14px",
                        color: COLORS.textMuted,
                        fontFamily: FONTS.body,
                        lineHeight: 1.7,
                      }}
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Son güncelleme */}
        <p
          style={{
            fontSize: "12px",
            color: COLORS.textMuted,
            fontFamily: FONTS.body,
            textAlign: "center",
            marginTop: "40px",
          }}
        >
          Son güncelleme: Mart 2026
        </p>
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
