// src/pages/TermsPage.jsx
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  ShoppingBag,
  CreditCard,
  AlertTriangle,
  Scale,
  RefreshCw,
} from "lucide-react";
import { COLORS, FONTS } from "../styles/theme";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const SECTIONS = [
  {
    icon: FileText,
    color: "#3b82f6",
    title: "Genel Koşullar",
    items: [
      "Bu web sitesini kullanarak aşağıdaki koşulları kabul etmiş sayılırsınız.",
      "Kordbear, bu koşulları önceden haber vermeksizin değiştirme hakkını saklı tutar.",
      "Sitedeki tüm içerikler Kordbear'a aittir ve izinsiz kullanılamaz.",
      "18 yaşından küçük kullanıcıların ebeveyn gözetiminde site kullanması önerilir.",
    ],
  },
  {
    icon: ShoppingBag,
    color: "#f59e0b",
    title: "Sipariş Koşulları",
    items: [
      "Sipariş vermek için üye olmanız gerekmektedir.",
      "Sipariş onayı e-posta ile bildirilir. E-posta alınmadıysa sipariş tamamlanmamış sayılır.",
      "Stok tükenmesi veya fiyat hatası durumunda sipariş iptal edilebilir.",
      "Kişiye özel ürünlerde üretim başladıktan sonra iptal kabul edilmez.",
      "Sipariş adres bilgilerinin doğruluğundan müşteri sorumludur.",
    ],
  },
  {
    icon: CreditCard,
    color: "#8b5cf6",
    title: "Ödeme Koşulları",
    items: [
      "Tüm ödemeler iyzico güvenceli altyapısı üzerinden gerçekleştirilir.",
      "Fiyatlara KDV dahildir.",
      "Ödeme onaylanmadan sipariş işleme alınmaz.",
      "Sahte veya yetkisiz kart kullanımı yasal işlem başlatılmasına neden olur.",
    ],
  },
  {
    icon: AlertTriangle,
    color: "#ef4444",
    title: "Yasaklı Kullanımlar",
    items: [
      "Site içeriklerini kopyalamak veya dağıtmak yasaktır.",
      "Sistemi tehlikeye atacak yazılım veya kod çalıştırmak yasaktır.",
      "Diğer kullanıcıların bilgilerine izinsiz erişmek yasaktır.",
      "Yanlış veya yanıltıcı bilgi vermek yasaktır.",
    ],
  },
  {
    icon: Scale,
    color: "#22c55e",
    title: "Sorumluluk Sınırlaması",
    items: [
      "Kordbear, mücbir sebeplerden kaynaklanan gecikmelerden sorumlu tutulamaz.",
      "Kargo hasarı için kargo firması sorumlu tutulur.",
      "Kullanım hatalarından kaynaklanan ürün hasarları garanti kapsamı dışındadır.",
      "Site kesintilerinden doğan zararlar için sorumluluk kabul edilmez.",
    ],
  },
  {
    icon: RefreshCw,
    color: "#ec4899",
    title: "Uyuşmazlık Çözümü",
    items: [
      "Uyuşmazlıklarda Malatya Tüketici Hakem Heyeti ve Mahkemeleri yetkilidir.",
      "Türk Hukuku geçerlidir.",
      "Şikayetleriniz için önce info@kordbear.com adresine başvurmanızı tavsiye ederiz.",
    ],
  },
];

export default function TermsPage() {
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
          onClick={() => navigate("/")}
          style={backBtn}
          onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.text)}
          onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.textMuted)}
        >
          <ArrowLeft size={14} /> Geri Dön
        </button>

        <div style={{ marginBottom: "64px" }}>
          <p style={tag}>YASAL</p>
          <h1
            style={{
              fontFamily: FONTS.display,
              fontSize: "clamp(40px,7vw,80px)",
              color: COLORS.text,
              letterSpacing: "0.03em",
              lineHeight: 1,
              marginBottom: "32px",
            }}
          >
            KULLANIM KOŞULLARI
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
            Kordbear web sitesini ve hizmetlerini kullanmadan önce lütfen bu
            koşulları dikkatlice okuyun.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
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
                    fontSize: "22px",
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
