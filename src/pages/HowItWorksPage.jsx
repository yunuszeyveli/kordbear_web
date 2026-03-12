import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Upload,
  Settings,
  CheckCircle,
  Truck,
  Layers,
  Cpu,
  Droplets,
} from "lucide-react";
import { COLORS, FONTS } from "../styles/theme";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const STEPS = [
  {
    num: "01",
    icon: Upload,
    color: "#3b82f6",
    title: "Tasarım",
    desc: "Ürün tasarımları uzman ekibimiz tarafından 3D modelleme yazılımları kullanılarak oluşturulur. Müşteri talepleri doğrultusunda özel tasarımlar da yapılabilir.",
  },
  {
    num: "02",
    icon: Settings,
    color: "#f59e0b",
    title: "Dilimleme",
    desc: "Oluşturulan 3D model, yazıcı parametrelerine göre dilimleme yazılımıyla işlenir. Katman kalınlığı, dolgu oranı ve destek yapıları optimize edilir.",
  },
  {
    num: "03",
    icon: Cpu,
    color: "#8b5cf6",
    title: "Baskı",
    desc: "Optimize edilen dosya FDM veya reçine yazıcımıza gönderilir. Baskı süreci boyunca kalite kontrol yapılır, olası hatalar anında müdahale edilir.",
  },
  {
    num: "04",
    icon: Droplets,
    color: "#ec4899",
    title: "Son İşlem",
    desc: "Baskı tamamlandıktan sonra destek temizleme, zımparalama, boyama veya kaplama gibi son işlemler uygulanır. Ürün istenen kaliteye getirilir.",
  },
  {
    num: "05",
    icon: CheckCircle,
    color: "#22c55e",
    title: "Kalite Kontrol",
    desc: "Her ürün gönderilmeden önce titiz bir kalite kontrolünden geçer. Boyutsal doğruluk, yüzey kalitesi ve dayanıklılık test edilir.",
  },
  {
    num: "06",
    icon: Truck,
    color: "#f97316",
    title: "Teslimat",
    desc: "Kalite kontrolden geçen ürünler özenle paketlenir ve kargo ile müşteriye gönderilir. Türkiye genelinde 1-3 iş günü içinde teslimat yapılır.",
  },
];

const TECHNOLOGIES = [
  {
    icon: Layers,
    color: "#3b82f6",
    title: "FDM Baskı",
    desc: "Fused Deposition Modeling teknolojisi ile PLA, PETG, ABS gibi filamentler kullanılarak dayanıklı parçalar üretilir.",
  },
  {
    icon: Droplets,
    color: "#8b5cf6",
    title: "Reçine Baskı",
    desc: "SLA/MSLA teknolojisi ile ultra yüksek detaylı, pürüzsüz yüzeyli ürünler üretilir. Mücevher, figür ve hassas parçalar için idealdir.",
  },
  {
    icon: Cpu,
    color: "#22c55e",
    title: "Çok Renkli Baskı",
    desc: "Bambu Lab X1C yazıcılarımızla tek baskıda 16 farklı renk kullanılabilir. Çok renkli ve çok malzemeli ürünler üretilebilir.",
  },
];

export default function HowItWorksPage() {
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
          <p style={tag}>SÜRECİMİZ</p>
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
            NASIL ÜRETİYORUZ?
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
            Tasarımdan teslimatına kadar her adımı titizlikle yürütüyoruz.
            Endüstriyel 3D baskı ekipmanlarımız ve uzman ekibimizle en yüksek
            kalitede ürünler üretiyoruz.
          </p>
        </div>

        {/* Adımlar */}
        <div style={{ marginBottom: "80px" }}>
          <p style={tag}>ÜRETİM SÜRECİ</p>
          <h2 style={sectionTitle}>6 ADIMDA ÜRETİM</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: "20px",
            }}
          >
            {STEPS.map(({ num, icon: Icon, color, title, desc }, i) => (
              <div
                key={i}
                style={{
                  background: COLORS.surface,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: "6px",
                  padding: "28px",
                  position: "relative",
                  overflow: "hidden",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = color + "66")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = COLORS.border)
                }
              >
                {/* Büyük numara */}
                <div
                  style={{
                    position: "absolute",
                    top: "-10px",
                    right: "16px",
                    fontFamily: FONTS.display,
                    fontSize: "80px",
                    color: color,
                    opacity: 0.08,
                    lineHeight: 1,
                  }}
                >
                  {num}
                </div>
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
                <p
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    color: color,
                    letterSpacing: "0.12em",
                    marginBottom: "8px",
                    fontFamily: FONTS.body,
                  }}
                >
                  {num}
                </p>
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

        {/* Teknolojiler */}
        <div>
          <p style={tag}>TEKNOLOJİLERİMİZ</p>
          <h2 style={sectionTitle}>KULLANDIĞIMIZ TEKNOLOJİLER</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: "20px",
            }}
          >
            {TECHNOLOGIES.map(({ icon: Icon, color, title, desc }, i) => (
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
