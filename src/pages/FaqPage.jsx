import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { COLORS, FONTS } from "../styles/theme";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const FAQS = [
  {
    q: "Sipariş verdikten sonra ne kadar sürede kargoya verilir?",
    a: "Siparişleriniz genellikle 1-3 iş günü içinde hazırlanıp kargoya verilir. Yoğun dönemlerde bu süre 5 iş gününe kadar uzayabilir.",
  },
  {
    q: "Hangi kargo firmasıyla çalışıyorsunuz?",
    a: "Yurtiçi Kargo ve Aras Kargo ile çalışıyoruz. Siparişiniz kargoya verildiğinde takip numarası e-posta ile gönderilir.",
  },
  {
    q: "Ürünlerin malzemeleri nelerdir?",
    a: "Ürünlerimizde çevre dostu PLA+, PETG, ABS ve özel reçine malzemeleri kullanıyoruz. Her ürün sayfasında malzeme bilgisi belirtilmiştir.",
  },
  {
    q: "Özel tasarım sipariş verebilir miyim?",
    a: "Evet! Özel tasarım talepleriniz için iletişim sayfamızdan bize ulaşabilirsiniz. Tasarım dosyanızı paylaşabilir veya fikirlerinizi anlatabilirsiniz.",
  },
  {
    q: "İade ve değişim koşulları nelerdir?",
    a: "Ürünü teslim aldıktan sonra 14 gün içinde iade talebinde bulunabilirsiniz. Kişiye özel üretilen ürünler iade kapsamı dışındadır.",
  },
  {
    q: "Ürünler ne kadar dayanıklıdır?",
    a: "PLA+ malzemeli ürünlerimiz normal kullanım koşullarında yıllarca dayanır. Aşırı sıcaklık (60°C üzeri) ve uzun süreli UV maruziyetinden kaçınılması önerilir.",
  },
  {
    q: "Toplu sipariş indirimi var mı?",
    a: "10 adet ve üzeri siparişlerde özel fiyatlandırma sunuyoruz. Toplu sipariş talepleriniz için info@kordbear.com adresine yazabilirsiniz.",
  },
  {
    q: "Ödeme yöntemleri nelerdir?",
    a: "Kredi kartı, banka kartı ve havale/EFT ile ödeme yapabilirsiniz. Taksit seçenekleri için iyzico güvenceli ödeme sistemimizi kullanabilirsiniz.",
  },
];

export default function FaqPage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(null);

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
          <p style={tag}>YARDIM MERKEZİ</p>
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
            SIKÇA SORULAN SORULAR
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
            Merak ettiklerinizi burada bulabilirsiniz. Cevap bulamazsanız bize
            yazın.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {FAQS.map((faq, i) => (
            <div
              key={i}
              style={{
                background: COLORS.surface,
                border: `1px solid ${open === i ? COLORS.accent + "55" : COLORS.border}`,
                borderRadius: "6px",
                overflow: "hidden",
                transition: "border-color 0.2s",
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  padding: "20px 24px",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                <span
                  style={{
                    fontSize: "15px",
                    fontWeight: 600,
                    color: COLORS.text,
                    fontFamily: FONTS.body,
                    textAlign: "left",
                  }}
                >
                  {faq.q}
                </span>
                {open === i ? (
                  <ChevronUp
                    size={18}
                    color={COLORS.accent}
                    style={{ flexShrink: 0 }}
                  />
                ) : (
                  <ChevronDown
                    size={18}
                    color={COLORS.textMuted}
                    style={{ flexShrink: 0 }}
                  />
                )}
              </button>
              {open === i && (
                <div
                  style={{
                    padding: "0 24px 20px",
                    borderTop: `1px solid ${COLORS.border}`,
                  }}
                >
                  <p
                    style={{
                      fontSize: "14px",
                      color: COLORS.textMuted,
                      fontFamily: FONTS.body,
                      lineHeight: 1.8,
                      paddingTop: "16px",
                    }}
                  >
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          style={{
            marginTop: "48px",
            background: COLORS.surface,
            border: `1px solid ${COLORS.border}`,
            borderRadius: "6px",
            padding: "32px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "16px",
              color: COLORS.text,
              fontFamily: FONTS.body,
              fontWeight: 600,
              marginBottom: "8px",
            }}
          >
            Cevabını bulamadın mı?
          </p>
          <p
            style={{
              fontSize: "14px",
              color: COLORS.textMuted,
              fontFamily: FONTS.body,
              marginBottom: "20px",
            }}
          >
            Bize doğrudan ulaşabilirsin, en kısa sürede yardımcı olacağız.
          </p>
          <button
            onClick={() => navigate("/contact")}
            style={{
              background: COLORS.accent,
              border: "none",
              color: COLORS.white,
              padding: "12px 28px",
              borderRadius: "3px",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              fontFamily: FONTS.body,
            }}
          >
            BİZE YAZIN →
          </button>
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
