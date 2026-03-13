import { useNavigate } from "react-router-dom";
import { ArrowLeft, Printer, Award, Users, Zap } from "lucide-react";
import { COLORS, FONTS } from "../styles/theme";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const VALUES = [
  {
    icon: Printer,
    color: "#3b82f6",
    title: "İleri Teknoloji",
    desc: "En son FDM ve reçine 3D baskı teknolojilerini kullanarak hassas ve dayanıklı ürünler üretiyoruz.",
  },
  {
    icon: Award,
    color: "#f59e0b",
    title: "Kalite Önce",
    desc: "Her ürün kalite kontrolünden geçer. Standartları karşılamayan hiçbir ürün müşteriye ulaşmaz.",
  },
  {
    icon: Users,
    color: "#8b5cf6",
    title: "Müşteri Odaklı",
    desc: "Müşteri memnuniyeti bizim için en önemli önceliktir. Her geri bildirimi dikkate alıyoruz.",
  },
  {
    icon: Zap,
    color: "#22c55e",
    title: "Hızlı Teslimat",
    desc: "Siparişlerinizi en kısa sürede hazırlayıp kargoya veriyoruz. Türkiye genelinde hızlı teslimat.",
  },
];

const TEAM = [
  { name: "x", role: "Kurucu & CEO", initial: "A" },
  { name: "x", role: "3D Tasarım Uzmanı", initial: "M" },
  { name: "x", role: "Ürün Geliştirme", initial: "A" },
  { name: "x", role: "Müşteri İlişkileri", initial: "F" },
];

export default function AboutPage() {
  const navigate = useNavigate();
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
        <div style={{ marginBottom: "80px" }}>
          <p style={tag}>BİZ KİMİZ</p>
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
            KORDBEAR
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
              maxWidth: "700px",
            }}
          >
            Kordbear, 3D baskı teknolojisini herkes için erişilebilir kılmak
            amacıyla kurulmuş bir Türk girişimidir. Yüksek kaliteli, fonksiyonel
            ve estetik 3D baskı ürünleri tasarlayıp üretiyor, doğrudan
            müşterilerimize ulaştırıyoruz.
          </p>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "1px",
            background: COLORS.border,
            border: `1px solid ${COLORS.border}`,
            borderRadius: "6px",
            overflow: "hidden",
            marginBottom: "80px",
          }}
        >
          {[
            { value: "2021", label: "Kuruluş Yılı" },
            { value: "500+", label: "Mutlu Müşteri" },
            { value: "1000+", label: "Tamamlanan Sipariş" },
            { value: "50+", label: "Farklı Ürün" },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                background: COLORS.surface,
                padding: "40px 24px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontFamily: FONTS.display,
                  fontSize: "48px",
                  color: COLORS.accent,
                  lineHeight: 1,
                  marginBottom: "8px",
                }}
              >
                {s.value}
              </p>
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: COLORS.textMuted,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontFamily: FONTS.body,
                }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Değerler */}
        <div style={{ marginBottom: "80px" }}>
          <p style={tag}>DEĞERLERİMİZ</p>
          <h2 style={sectionTitle}>NEDEN KORDBEAR?</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: "20px",
            }}
          >
            {VALUES.map(({ icon: Icon, color, title, desc }, i) => (
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
                    width: "44px",
                    height: "44px",
                    background: color + "22",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "16px",
                  }}
                >
                  <Icon size={22} color={color} />
                </div>
                <h3
                  style={{
                    fontFamily: FONTS.display,
                    fontSize: "22px",
                    color: COLORS.text,
                    letterSpacing: "0.03em",
                    marginBottom: "10px",
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    color: COLORS.textMuted,
                    fontFamily: FONTS.body,
                    lineHeight: 1.7,
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Takım */}
        <div>
          <p style={tag}>EKİBİMİZ</p>
          <h2 style={sectionTitle}>ARKAMIZDA KİMLER VAR?</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: "16px",
            }}
          >
            {TEAM.map((m, i) => (
              <div
                key={i}
                style={{
                  background: COLORS.surface,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: "6px",
                  padding: "28px",
                  textAlign: "center",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = COLORS.accent + "66")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = COLORS.border)
                }
              >
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    background: COLORS.accent + "33",
                    border: `2px solid ${COLORS.accent}44`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONTS.display,
                      fontSize: "28px",
                      color: COLORS.accent,
                    }}
                  >
                    {m.initial}
                  </span>
                </div>
                <h4
                  style={{
                    fontFamily: FONTS.display,
                    fontSize: "18px",
                    color: COLORS.text,
                    letterSpacing: "0.03em",
                    marginBottom: "6px",
                  }}
                >
                  {m.name}
                </h4>
                <p
                  style={{
                    fontSize: "12px",
                    color: COLORS.textMuted,
                    fontFamily: FONTS.body,
                    letterSpacing: "0.06em",
                  }}
                >
                  {m.role}
                </p>
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
const sectionTitle = {
  fontFamily: FONTS.display,
  fontSize: "48px",
  color: COLORS.text,
  letterSpacing: "0.03em",
  marginBottom: "40px",
};
