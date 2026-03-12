// src/pages/CartPage.jsx
import { useNavigate } from "react-router-dom";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowLeft,
  ChevronRight,
  Package,
} from "lucide-react";
import { COLORS, FONTS } from "../styles/theme";
import { useCart } from "../context/CartContext";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function CartPage() {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, totalPrice, clearCart } =
    useCart();

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
        {/* Geri Butonu */}
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
            transition: "color 0.2s",
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
            ALIŞVERİŞ
          </p>
          <h1
            style={{
              fontFamily: FONTS.display,
              fontSize: "clamp(48px, 8vw, 72px)",
              color: COLORS.text,
              letterSpacing: "0.03em",
              lineHeight: 1,
            }}
          >
            SEPETİM
          </h1>
        </div>

        {items.length === 0 ? (
          /* ── BOŞ SEPET ── */
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <ShoppingBag
              size={64}
              color={COLORS.textMuted}
              style={{ marginBottom: "24px" }}
            />
            <h2
              style={{
                fontFamily: FONTS.display,
                fontSize: "36px",
                color: COLORS.text,
                marginBottom: "12px",
              }}
            >
              SEPETİNİZ BOŞ
            </h2>
            <p
              style={{
                color: COLORS.textMuted,
                fontFamily: FONTS.body,
                marginBottom: "32px",
              }}
            >
              Henüz sepetinize ürün eklemediniz.
            </p>
            <button
              onClick={() => navigate("/products")}
              style={{
                background: COLORS.accent,
                border: "none",
                color: COLORS.white,
                padding: "14px 40px",
                borderRadius: "3px",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                fontFamily: FONTS.body,
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              ALIŞVERİŞE BAŞLA <ChevronRight size={16} />
            </button>
          </div>
        ) : (
          /* ── DOLU SEPET ── */
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 360px",
              gap: "32px",
              alignItems: "start",
            }}
          >
            {/* Sol — Ürün Listesi */}
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: "16px",
                }}
              >
                <button
                  onClick={clearCart}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#ef4444",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontFamily: FONTS.body,
                    letterSpacing: "0.06em",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <Trash2 size={13} /> Sepeti Temizle
                </button>
              </div>

              <div
                style={{
                  background: COLORS.surface,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: "6px",
                  overflow: "hidden",
                }}
              >
                {items.map((item, i) => (
                  <div
                    key={item._id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "20px",
                      padding: "20px 24px",
                      borderTop: i > 0 ? `1px solid ${COLORS.border}` : "none",
                    }}
                  >
                    {/* Görsel */}
                    <div
                      style={{
                        width: "72px",
                        height: "72px",
                        background: "linear-gradient(135deg, #1a1a1a, #222)",
                        border: `1px solid ${COLORS.border}`,
                        borderRadius: "6px",
                        overflow: "hidden",
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
                          }}
                        >
                          <Package size={28} color={COLORS.border} />
                        </div>
                      )}
                    </div>

                    {/* Bilgi */}
                    <div style={{ flex: 1 }}>
                      <p
                        style={{
                          fontSize: "10px",
                          color: COLORS.textMuted,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          marginBottom: "4px",
                          fontFamily: FONTS.body,
                        }}
                      >
                        {item.category}
                      </p>
                      <h3
                        style={{
                          fontSize: "15px",
                          fontWeight: 600,
                          color: COLORS.text,
                          fontFamily: FONTS.body,
                          marginBottom: "4px",
                        }}
                      >
                        {item.name}
                      </h3>
                      <p
                        style={{
                          fontFamily: FONTS.display,
                          fontSize: "18px",
                          color: COLORS.accent,
                          letterSpacing: "0.05em",
                        }}
                      >
                        ₺{item.price}
                      </p>
                    </div>

                    {/* Adet */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        border: `1px solid ${COLORS.border}`,
                        borderRadius: "3px",
                        overflow: "hidden",
                      }}
                    >
                      <button
                        onClick={() =>
                          updateQuantity(item._id, item.quantity - 1)
                        }
                        style={{
                          background: "transparent",
                          border: "none",
                          color: COLORS.text,
                          width: "36px",
                          height: "36px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = COLORS.border)
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "transparent")
                        }
                      >
                        <Minus size={14} />
                      </button>
                      <span
                        style={{
                          width: "36px",
                          textAlign: "center",
                          color: COLORS.text,
                          fontSize: "14px",
                          fontFamily: FONTS.body,
                          fontWeight: 600,
                        }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item._id, item.quantity + 1)
                        }
                        style={{
                          background: "transparent",
                          border: "none",
                          color: COLORS.text,
                          width: "36px",
                          height: "36px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = COLORS.border)
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "transparent")
                        }
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Toplam */}
                    <div
                      style={{
                        fontFamily: FONTS.display,
                        fontSize: "20px",
                        color: COLORS.text,
                        letterSpacing: "0.05em",
                        minWidth: "80px",
                        textAlign: "right",
                      }}
                    >
                      ₺{item.price * item.quantity}
                    </div>

                    {/* Sil */}
                    <button
                      onClick={() => removeItem(item._id)}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: COLORS.textMuted,
                        cursor: "pointer",
                        padding: "6px",
                        display: "flex",
                        alignItems: "center",
                        borderRadius: "3px",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#ef4444";
                        e.currentTarget.style.background = "#ef444411";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = COLORS.textMuted;
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Sağ — Sipariş Özeti */}
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
                  fontSize: "28px",
                  color: COLORS.text,
                  letterSpacing: "0.05em",
                  marginBottom: "24px",
                }}
              >
                SİPARİŞ ÖZETİ
              </h3>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "12px",
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
                    fontWeight: 600,
                  }}
                >
                  ₺{totalPrice}
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
                    color: totalPrice >= 500 ? "#22c55e" : COLORS.text,
                    fontFamily: FONTS.body,
                    fontWeight: 600,
                  }}
                >
                  {totalPrice >= 500 ? "Ücretsiz" : "₺49"}
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "20px 0",
                  borderTop: `1px solid ${COLORS.border}`,
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
                  ₺{totalPrice >= 500 ? totalPrice : totalPrice + 49}
                </span>
              </div>

              {totalPrice < 500 && (
                <div
                  style={{
                    background: COLORS.accent + "11",
                    border: `1px solid ${COLORS.accent}33`,
                    borderRadius: "4px",
                    padding: "12px 16px",
                    marginBottom: "20px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "12px",
                      color: COLORS.accent,
                      fontFamily: FONTS.body,
                      lineHeight: 1.6,
                    }}
                  >
                    ₺{500 - totalPrice} daha ekleyin, kargo bedava!
                  </p>
                </div>
              )}

              <button
                onClick={() => navigate("/checkout")}
                style={{
                  width: "100%",
                  background: COLORS.accent,
                  border: "none",
                  color: COLORS.white,
                  padding: "16px",
                  borderRadius: "3px",
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  cursor: "pointer",
                  fontFamily: FONTS.body,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                SİPARİŞİ TAMAMLA <ChevronRight size={16} />
              </button>

              <button
                onClick={() => navigate("/products")}
                style={{
                  width: "100%",
                  background: "transparent",
                  border: `1px solid ${COLORS.border}`,
                  color: COLORS.textMuted,
                  padding: "12px",
                  borderRadius: "3px",
                  fontSize: "12px",
                  cursor: "pointer",
                  fontFamily: FONTS.body,
                  marginTop: "12px",
                  letterSpacing: "0.08em",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = COLORS.text;
                  e.currentTarget.style.color = COLORS.text;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = COLORS.border;
                  e.currentTarget.style.color = COLORS.textMuted;
                }}
              >
                <ArrowLeft size={14} /> ALIŞVERİŞE DEVAM ET
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
