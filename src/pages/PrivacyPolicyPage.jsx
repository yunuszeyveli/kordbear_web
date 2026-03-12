import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, Eye, Lock, Trash2, Bell, Mail } from "lucide-react";
import { COLORS, FONTS } from "../styles/theme";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const SECTIONS = [
  {
    icon: Eye,
    color: "#3b82f6",
    title: "Toplanan Veriler",
    content:
      "Hizmetlerimizi kullanırken ad, soyad, e-posta adresi, telefon numarası ve teslimat adresi gibi kişisel bilgilerinizi topluyoruz. Ayrıca ödeme işlemleri sırasında iyzico güvenceli altyapısı üzerinden ödeme bilgileri işlenmektedir. Bu bilgiler tarafımızca saklanmamaktadır.",
  },
  {
    icon: Shield,
    color: "#22c55e",
    title: "Verilerin Kullanımı",
    content:
      "Toplanan veriler; sipariş işlemleri, kargo takibi, müşteri hizmetleri ve yasal yükümlülüklerin yerine getirilmesi amacıyla kullanılmaktadır. Kişisel verileriniz açık rızanız olmadan üçüncü taraflarla paylaşılmamaktadır.",
  },
  {
    icon: Lock,
    color: "#8b5cf6",
    title: "Veri Güvenliği",
    content:
      "Verilerinizin güvenliği için SSL şifreleme, güvenli sunucu altyapısı ve erişim kontrol mekanizmaları kullanılmaktadır. Ödeme bilgileriniz hiçbir şekilde sunucularımızda saklanmamakta, tüm ödeme işlemleri iyzico'nun PCI-DSS uyumlu altyapısı üzerinden gerçekleşmektedir.",
  },
  {
    icon: Bell,
    color: "#f59e0b",
    title: "Çerezler",
    content:
      "Web sitemizde kullanıcı deneyimini iyileştirmek amacıyla çerezler kullanılmaktadır. Zorunlu çerezler sitenin çalışması için gereklidir. Analitik çerezler site performansını ölçmek için kullanılır. Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz.",
  },
  {
    icon: Trash2,
    color: "#ef4444",
    title: "Veri Silme Hakkı",
    content:
      "KVKK kapsamında kişisel verilerinize erişim, düzeltme, silme ve itiraz haklarına sahipsiniz. Verilerinizin silinmesini talep etmek için info@kordbear.com adresine yazabilirsiniz. Talepler 30 gün içinde sonuçlandırılır.",
  },
  {
    icon: Mail,
    color: "#ec4899",
    title: "İletişim",
    content:
      "Gizlilik politikamız hakkında sorularınız için info@kordbear.com adresine e-posta gönderebilirsiniz. Tüm talepler en kısa sürede yanıtlanacaktır.",
  },
];

export default function PrivacyPolicyPage() {
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
            GİZLİLİK POLİTİKASI
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
            Kişisel verilerinizin güvenliği bizim için en önemli önceliktir. Bu
            sayfa, verilerinizi nasıl topladığımızı, kullandığımızı ve
            koruduğumuzu açıklamaktadır.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {SECTIONS.map(({ icon: Icon, color, title, content }, i) => (
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
                  marginBottom: "16px",
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
              <p
                style={{
                  fontSize: "14px",
                  color: COLORS.textMuted,
                  fontFamily: FONTS.body,
                  lineHeight: 1.8,
                }}
              >
                {content}
              </p>
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
          Son güncelleme: Mart 2026 • KVKK uyumlu
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
