// src/components/admin/AdminDashboard.jsx
import { useEffect, useState } from "react";
import {
  ShoppingBag,
  Users,
  ClipboardList,
  TrendingUp,
  Package,
  Clock,
  MessageSquare,
  Mail,
  MailOpen,
} from "lucide-react";
import { COLORS, FONTS } from "../../styles/theme";
import api from "../../utils/api";

const STATS = [
  {
    key: "totalProducts",
    label: "TOPLAM ÜRÜN",
    icon: ShoppingBag,
    color: "#3b82f6",
  },
  {
    key: "totalOrders",
    label: "TOPLAM SİPARİŞ",
    icon: ClipboardList,
    color: "#f59e0b",
  },
  {
    key: "totalUsers",
    label: "TOPLAM KULLANICI",
    icon: Users,
    color: "#8b5cf6",
  },
  {
    key: "totalRevenue",
    label: "TOPLAM GELİR",
    icon: TrendingUp,
    color: "#22c55e",
    prefix: "₺",
  },
];

const STATUS_COLORS = {
  beklemede: "#f59e0b",
  hazırlanıyor: "#3b82f6",
  kargoda: "#8b5cf6",
  "teslim edildi": "#22c55e",
  iptal: "#ef4444",
};

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, ordersRes, usersRes, messagesRes] =
          await Promise.all([
            api.get("/products"),
            api.get("/orders"),
            api.get("/users"),
            api.get("/contact"),
          ]);

        const allOrders = ordersRes.data.orders;
        const allProducts = productsRes.data.products;
        const totalRevenue = allOrders
          .filter((o) => o.status !== "iptal")
          .reduce((sum, o) => sum + o.totalPrice + (o.shippingPrice || 0), 0);

        setStats({
          totalProducts: allProducts.length,
          totalOrders: allOrders.length,
          totalUsers: usersRes.data.users.length,
          totalRevenue,
        });

        setOrders(allOrders.slice(0, 5));
        setRecentProducts(allProducts.slice(0, 5));
        setRecentMessages(messagesRes.data.messages.slice(0, 5));
      } catch (err) {
        console.error("Dashboard verisi alınamadı:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return (
      <div style={{ textAlign: "center", padding: "80px 0" }}>
        <div
          style={{
            width: "40px",
            height: "40px",
            border: `3px solid ${COLORS.border}`,
            borderTop: `3px solid ${COLORS.accent}`,
            borderRadius: "50%",
            margin: "0 auto 16px",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <p style={{ color: COLORS.textMuted, fontFamily: FONTS.body }}>
          Yükleniyor...
        </p>
      </div>
    );

  return (
    <div>
      {/* ── BAŞLIK ── */}
      <h2
        style={{
          fontFamily: FONTS.display,
          fontSize: "40px",
          color: COLORS.text,
          letterSpacing: "0.03em",
          marginBottom: "32px",
        }}
      >
        DASHBOARD
      </h2>

      {/* ── STAT KARTLARI ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
          marginBottom: "40px",
        }}
      >
        {STATS.map(({ key, label, icon: Icon, color, prefix }) => (
          <div
            key={key}
            style={{
              background: COLORS.surface,
              border: `1px solid ${COLORS.border}`,
              borderRadius: "6px",
              padding: "24px",
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
            <div
              style={{
                position: "absolute",
                right: "-8px",
                bottom: "-8px",
                opacity: 0.06,
              }}
            >
              <Icon size={80} color={color} />
            </div>
            <div
              style={{
                width: "40px",
                height: "40px",
                background: color + "22",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px",
              }}
            >
              <Icon size={20} color={color} />
            </div>
            <p
              style={{
                fontFamily: FONTS.display,
                fontSize: "36px",
                color: COLORS.text,
                letterSpacing: "0.03em",
                lineHeight: 1,
                marginBottom: "6px",
              }}
            >
              {prefix}
              {stats?.[key]?.toLocaleString("tr-TR") || 0}
            </p>
            <p
              style={{
                fontSize: "10px",
                fontWeight: 700,
                color: COLORS.textMuted,
                letterSpacing: "0.12em",
                fontFamily: FONTS.body,
              }}
            >
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* ── SON SİPARİŞLER ── */}
      <div
        style={{
          background: COLORS.surface,
          border: `1px solid ${COLORS.border}`,
          borderRadius: "6px",
          overflow: "hidden",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 24px",
            borderBottom: `1px solid ${COLORS.border}`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Clock size={16} color={COLORS.accent} />
            <h3
              style={{
                fontFamily: FONTS.body,
                fontSize: "13px",
                fontWeight: 700,
                color: COLORS.text,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              SON SİPARİŞLER
            </h3>
          </div>
          <span
            style={{
              fontSize: "11px",
              color: COLORS.textMuted,
              fontFamily: FONTS.body,
            }}
          >
            Son 5 sipariş
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 140px 120px 100px",
            padding: "10px 24px",
            background: COLORS.surfaceHover,
            borderBottom: `1px solid ${COLORS.border}`,
          }}
        >
          {["SİPARİŞ NO", "MÜŞTERİ", "TUTAR", "DURUM"].map((h, i) => (
            <div
              key={i}
              style={{
                fontSize: "10px",
                fontWeight: 700,
                color: COLORS.textMuted,
                letterSpacing: "0.12em",
                fontFamily: FONTS.body,
              }}
            >
              {h}
            </div>
          ))}
        </div>

        {orders.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "48px",
              color: COLORS.textMuted,
              fontFamily: FONTS.body,
            }}
          >
            <Package
              size={40}
              color={COLORS.border}
              style={{ marginBottom: "12px" }}
            />
            <p>Henüz sipariş yok.</p>
          </div>
        ) : (
          orders.map((order, i) => (
            <div
              key={order._id}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 140px 120px 100px",
                alignItems: "center",
                padding: "14px 24px",
                borderTop: i > 0 ? `1px solid ${COLORS.border}` : "none",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = COLORS.surfaceHover)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: COLORS.text,
                  fontFamily: FONTS.body,
                  letterSpacing: "0.04em",
                }}
              >
                #{order._id.slice(-8).toUpperCase()}
              </span>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: COLORS.accent + "33",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Users size={13} color={COLORS.accent} />
                </div>
                <span
                  style={{
                    fontSize: "12px",
                    color: COLORS.textMuted,
                    fontFamily: FONTS.body,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {order.shippingAddress?.fullName || "—"}
                </span>
              </div>
              <span
                style={{
                  fontFamily: FONTS.display,
                  fontSize: "16px",
                  color: COLORS.accent,
                  letterSpacing: "0.05em",
                }}
              >
                ₺{order.totalPrice + (order.shippingPrice || 0)}
              </span>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: STATUS_COLORS[order.status] || COLORS.textMuted,
                  background:
                    (STATUS_COLORS[order.status] || COLORS.textMuted) + "22",
                  padding: "4px 10px",
                  borderRadius: "20px",
                  fontFamily: FONTS.body,
                  letterSpacing: "0.04em",
                  display: "inline-block",
                }}
              >
                {order.status}
              </span>
            </div>
          ))
        )}
      </div>

      {/* ── SON EKLENEN ÜRÜNLER ── */}
      <div
        style={{
          background: COLORS.surface,
          border: `1px solid ${COLORS.border}`,
          borderRadius: "6px",
          overflow: "hidden",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 24px",
            borderBottom: `1px solid ${COLORS.border}`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <ShoppingBag size={16} color={COLORS.accent} />
            <h3
              style={{
                fontFamily: FONTS.body,
                fontSize: "13px",
                fontWeight: 700,
                color: COLORS.text,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              SON EKLENEN ÜRÜNLER
            </h3>
          </div>
          <span
            style={{
              fontSize: "11px",
              color: COLORS.textMuted,
              fontFamily: FONTS.body,
            }}
          >
            Son 5 ürün
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "56px 1fr 120px 100px 120px",
            padding: "10px 24px",
            background: COLORS.surfaceHover,
            borderBottom: `1px solid ${COLORS.border}`,
          }}
        >
          {["", "ÜRÜN", "KATEGORİ", "FİYAT", "ETİKET"].map((h, i) => (
            <div
              key={i}
              style={{
                fontSize: "10px",
                fontWeight: 700,
                color: COLORS.textMuted,
                letterSpacing: "0.12em",
                fontFamily: FONTS.body,
              }}
            >
              {h}
            </div>
          ))}
        </div>

        {recentProducts.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "48px",
              color: COLORS.textMuted,
              fontFamily: FONTS.body,
            }}
          >
            <Package
              size={40}
              color={COLORS.border}
              style={{ marginBottom: "12px" }}
            />
            <p>Henüz ürün eklenmemiş.</p>
          </div>
        ) : (
          recentProducts.map((product, i) => (
            <div
              key={product._id}
              style={{
                display: "grid",
                gridTemplateColumns: "56px 1fr 120px 100px 120px",
                alignItems: "center",
                padding: "14px 24px",
                borderTop: i > 0 ? `1px solid ${COLORS.border}` : "none",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = COLORS.surfaceHover)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "4px",
                  overflow: "hidden",
                  border: `1px solid ${COLORS.border}`,
                  background: "#1a1a1a",
                }}
              >
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
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
                    <Package size={18} color={COLORS.border} />
                  </div>
                )}
              </div>
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: COLORS.text,
                  fontFamily: FONTS.body,
                }}
              >
                {product.name}
              </span>
              <span
                style={{
                  fontSize: "12px",
                  color: COLORS.textMuted,
                  fontFamily: FONTS.body,
                }}
              >
                {product.category}
              </span>
              <span
                style={{
                  fontFamily: FONTS.display,
                  fontSize: "16px",
                  color: COLORS.accent,
                  letterSpacing: "0.05em",
                }}
              >
                ₺{product.price}
              </span>
              <span
                style={{
                  fontSize: "11px",
                  fontFamily: FONTS.body,
                  color: product.tag ? COLORS.accent : COLORS.textMuted,
                }}
              >
                {product.tag || "—"}
              </span>
            </div>
          ))
        )}
      </div>

      {/* ── SON MESAJLAR ── */}
      <div
        style={{
          background: COLORS.surface,
          border: `1px solid ${COLORS.border}`,
          borderRadius: "6px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 24px",
            borderBottom: `1px solid ${COLORS.border}`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <MessageSquare size={16} color={COLORS.accent} />
            <h3
              style={{
                fontFamily: FONTS.body,
                fontSize: "13px",
                fontWeight: 700,
                color: COLORS.text,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              SON MESAJLAR
            </h3>
          </div>
          <span
            style={{
              fontSize: "11px",
              color: COLORS.textMuted,
              fontFamily: FONTS.body,
            }}
          >
            Son 5 mesaj
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "32px 1fr 1fr 140px 80px",
            padding: "10px 24px",
            background: COLORS.surfaceHover,
            borderBottom: `1px solid ${COLORS.border}`,
          }}
        >
          {["", "GÖNDEREN", "KONU", "TARİH", "DURUM"].map((h, i) => (
            <div
              key={i}
              style={{
                fontSize: "10px",
                fontWeight: 700,
                color: COLORS.textMuted,
                letterSpacing: "0.12em",
                fontFamily: FONTS.body,
              }}
            >
              {h}
            </div>
          ))}
        </div>

        {recentMessages.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "48px",
              color: COLORS.textMuted,
              fontFamily: FONTS.body,
            }}
          >
            <MessageSquare
              size={40}
              color={COLORS.border}
              style={{ marginBottom: "12px" }}
            />
            <p>Henüz mesaj yok.</p>
          </div>
        ) : (
          recentMessages.map((msg, i) => (
            <div
              key={msg._id}
              style={{
                display: "grid",
                gridTemplateColumns: "32px 1fr 1fr 140px 80px",
                alignItems: "center",
                padding: "14px 24px",
                borderTop: i > 0 ? `1px solid ${COLORS.border}` : "none",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = COLORS.surfaceHover)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              {msg.isRead ? (
                <MailOpen size={15} color={COLORS.textMuted} />
              ) : (
                <Mail size={15} color={COLORS.accent} />
              )}
              <div>
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: msg.isRead ? 500 : 700,
                    color: COLORS.text,
                    fontFamily: FONTS.body,
                  }}
                >
                  {msg.fullName}
                </p>
                <p
                  style={{
                    fontSize: "11px",
                    color: COLORS.textMuted,
                    fontFamily: FONTS.body,
                  }}
                >
                  {msg.email}
                </p>
              </div>
              <span
                style={{
                  fontSize: "13px",
                  color: COLORS.textMuted,
                  fontFamily: FONTS.body,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {msg.subject}
              </span>
              <span
                style={{
                  fontSize: "12px",
                  color: COLORS.textMuted,
                  fontFamily: FONTS.body,
                }}
              >
                {new Date(msg.createdAt).toLocaleDateString("tr-TR")}
              </span>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  fontFamily: FONTS.body,
                  color: msg.isRead ? COLORS.textMuted : COLORS.accent,
                  background: msg.isRead
                    ? COLORS.border + "44"
                    : COLORS.accent + "22",
                  padding: "3px 10px",
                  borderRadius: "20px",
                  display: "inline-block",
                }}
              >
                {msg.isRead ? "Okundu" : "Yeni"}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
