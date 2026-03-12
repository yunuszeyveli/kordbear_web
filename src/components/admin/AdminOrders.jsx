// src/components/admin/AdminOrders.jsx
import { useState, useEffect } from "react";
import { COLORS, FONTS } from "../../styles/theme";
import api from "../../utils/api";

const STATUS_OPTIONS = [
  { value: "beklemede", label: "Beklemede", color: "#f59e0b" },
  { value: "hazırlanıyor", label: "Hazırlanıyor", color: "#3b82f6" },
  { value: "kargoda", label: "Kargoda", color: "#8b5cf6" },
  { value: "teslim edildi", label: "Teslim Edildi", color: "#22c55e" },
];

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await api.get("/orders");
      setOrders(response.data.orders);
    } catch (err) {
      setError("Siparişler yüklenemedi");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status: newStatus });
      // Listeyi güncelle — API'ye gitmeden local state'i güncelle
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o)),
      );
    } catch (err) {
      alert("Durum güncellenemedi");
    }
  };

  const getStatusStyle = (status) => {
    const found = STATUS_OPTIONS.find((s) => s.value === status);
    return found ? found.color : COLORS.textMuted;
  };

  if (loading) {
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
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "80px 0" }}>
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>⚠️</div>
        <p style={{ color: "#ef4444", fontFamily: FONTS.body }}>{error}</p>
      </div>
    );
  }

  return (
    <div>
      {/* ── BAŞLIK ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "32px",
        }}
      >
        <h2
          style={{
            fontFamily: FONTS.display,
            fontSize: "40px",
            color: COLORS.text,
            letterSpacing: "0.03em",
          }}
        >
          SİPARİŞLER
        </h2>
        <div
          style={{
            background: COLORS.accentDim,
            border: `1px solid ${COLORS.accent}44`,
            borderRadius: "3px",
            padding: "6px 16px",
          }}
        >
          <span
            style={{
              fontSize: "12px",
              color: COLORS.accent,
              fontFamily: FONTS.body,
              fontWeight: 600,
              letterSpacing: "0.08em",
            }}
          >
            {orders.length} SİPARİŞ
          </span>
        </div>
      </div>

      {/* ── ÖZET KARTLAR ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: "16px",
          marginBottom: "32px",
        }}
      >
        {STATUS_OPTIONS.map((status) => {
          const count = orders.filter((o) => o.status === status.value).length;
          return (
            <div
              key={status.value}
              style={{
                background: COLORS.surface,
                border: `1px solid ${COLORS.border}`,
                borderRadius: "6px",
                padding: "20px",
                borderLeft: `3px solid ${status.color}`,
              }}
            >
              <div
                style={{
                  fontFamily: FONTS.display,
                  fontSize: "32px",
                  color: status.color,
                  marginBottom: "4px",
                }}
              >
                {count}
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: COLORS.textMuted,
                  fontFamily: FONTS.body,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {status.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── SİPARİŞ LİSTESİ ── */}
      {orders.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "64px",
            background: COLORS.surface,
            border: `1px solid ${COLORS.border}`,
            borderRadius: "6px",
            color: COLORS.textMuted,
            fontFamily: FONTS.body,
          }}
        >
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🧾</div>
          <p>Henüz sipariş yok.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {orders.map((order) => (
            <div
              key={order._id}
              style={{
                background: COLORS.surface,
                border: `1px solid ${
                  expanded === order._id ? COLORS.accent + "55" : COLORS.border
                }`,
                borderRadius: "6px",
                overflow: "hidden",
                transition: "border-color 0.2s",
              }}
            >
              {/* ── SİPARİŞ SATIRI ── */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 140px 120px 160px 40px",
                  alignItems: "center",
                  padding: "16px 24px",
                  gap: "16px",
                }}
              >
                {/* Sol — Sipariş bilgisi */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "4px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: FONTS.body,
                        fontSize: "13px",
                        fontWeight: 700,
                        color: COLORS.text,
                      }}
                    >
                      #{order._id.slice(-8).toUpperCase()}
                    </span>
                    <span
                      style={{
                        fontSize: "11px",
                        color: COLORS.textMuted,
                        fontFamily: FONTS.body,
                      }}
                    >
                      {new Date(order.createdAt).toLocaleDateString("tr-TR")}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: COLORS.textMuted,
                      fontFamily: FONTS.body,
                    }}
                  >
                    {order.user?.name || "Kullanıcı"} •{" "}
                    {order.user?.email || ""}
                  </div>
                </div>

                {/* Ürün sayısı */}
                <div
                  style={{
                    fontSize: "12px",
                    color: COLORS.textMuted,
                    fontFamily: FONTS.body,
                  }}
                >
                  {order.items.reduce((sum, i) => sum + i.quantity, 0)} ürün
                </div>

                {/* Toplam */}
                <div
                  style={{
                    fontFamily: FONTS.display,
                    fontSize: "18px",
                    color: COLORS.accent,
                    letterSpacing: "0.05em",
                  }}
                >
                  ₺{order.totalPrice + (order.shippingPrice || 0)}
                </div>

                {/* Durum */}
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusUpdate(order._id, e.target.value)
                  }
                  style={{
                    background: COLORS.bg,
                    border: `1px solid ${getStatusStyle(order.status)}44`,
                    color: getStatusStyle(order.status),
                    padding: "6px 10px",
                    borderRadius: "3px",
                    fontSize: "11px",
                    fontWeight: 700,
                    fontFamily: FONTS.body,
                    cursor: "pointer",
                    outline: "none",
                    letterSpacing: "0.05em",
                  }}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>

                {/* Detay aç/kapat */}
                <button
                  onClick={() =>
                    setExpanded(expanded === order._id ? null : order._id)
                  }
                  style={{
                    background: "transparent",
                    border: "none",
                    color: COLORS.textMuted,
                    cursor: "pointer",
                    fontSize: "18px",
                    padding: "4px",
                    transition: "transform 0.2s",
                    transform:
                      expanded === order._id
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                  }}
                >
                  ↓
                </button>
              </div>

              {/* ── SİPARİŞ DETAYI ── */}
              {expanded === order._id && (
                <div
                  style={{
                    borderTop: `1px solid ${COLORS.border}`,
                    padding: "20px 24px",
                    background: COLORS.surfaceHover,
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "24px",
                  }}
                >
                  {/* Ürünler */}
                  <div>
                    <p
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        color: COLORS.textMuted,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        marginBottom: "12px",
                        fontFamily: FONTS.body,
                      }}
                    >
                      ÜRÜNLER
                    </p>
                    {order.items.map((item, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          marginBottom: "10px",
                        }}
                      >
                        <span style={{ fontSize: "20px" }}>{item.emoji}</span>
                        <div style={{ flex: 1 }}>
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
                            x{item.quantity} • ₺{item.price} / adet
                          </p>
                        </div>
                        <span
                          style={{
                            fontFamily: FONTS.body,
                            fontSize: "13px",
                            color: COLORS.accent,
                            fontWeight: 700,
                          }}
                        >
                          ₺{item.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Teslimat Adresi */}
                  <div>
                    <p
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        color: COLORS.textMuted,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        marginBottom: "12px",
                        fontFamily: FONTS.body,
                      }}
                    >
                      TESLİMAT ADRESİ
                    </p>
                    <div
                      style={{
                        background: COLORS.surface,
                        border: `1px solid ${COLORS.border}`,
                        borderRadius: "4px",
                        padding: "16px",
                      }}
                    >
                      {[
                        {
                          label: "Ad Soyad",
                          value: order.shippingAddress?.fullName,
                        },
                        {
                          label: "Telefon",
                          value: order.shippingAddress?.phone,
                        },
                        { label: "İl", value: order.shippingAddress?.city },
                        {
                          label: "İlçe",
                          value: order.shippingAddress?.district,
                        },
                        {
                          label: "Adres",
                          value: order.shippingAddress?.address,
                        },
                      ].map(({ label, value }) => (
                        <div
                          key={label}
                          style={{
                            display: "flex",
                            gap: "8px",
                            marginBottom: "8px",
                            fontSize: "13px",
                            fontFamily: FONTS.body,
                          }}
                        >
                          <span
                            style={{
                              color: COLORS.textMuted,
                              minWidth: "70px",
                            }}
                          >
                            {label}:
                          </span>
                          <span style={{ color: COLORS.text, fontWeight: 600 }}>
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
