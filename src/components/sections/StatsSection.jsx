// src/components/sections/StatsSection.jsx
import { COLORS, FONTS } from '../../styles/theme';
import { STATS } from '../../data/mockData';

export default function StatsSection() {
  return (
    <section style={{
      background: COLORS.surface,
      borderTop:  `1px solid ${COLORS.border}`,
      borderBottom: `1px solid ${COLORS.border}`,
      padding: "64px 24px",
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* Grid — 4 sütun, aralarında çizgi */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",

          // Trick: border yerine gap + background kullanıyoruz
          // Böylece her hücre arasında ince çizgi görünür
          gap: "1px",
          background: COLORS.border,

          border: `1px solid ${COLORS.border}`,
          borderRadius: "6px",
          overflow: "hidden",
        }}>
          {STATS.map((stat) => (
            <StatCard key={stat.id} stat={stat} />
          ))}
        </div>

      </div>
    </section>
  );
}

// StatCard — ayrı component, tek bir istatistiği gösterir
function StatCard({ stat }) {
  return (
    <div style={{
      background: COLORS.surface,
      padding: "40px 32px",
      textAlign: "center",
      transition: "background 0.2s ease",
    }}
      onMouseEnter={e => e.currentTarget.style.background = COLORS.surfaceHover}
      onMouseLeave={e => e.currentTarget.style.background = COLORS.surface}
    >
      {/* Büyük sayı */}
      <div style={{
        fontFamily: FONTS.display,
        fontSize: "52px",
        color: COLORS.accent,
        letterSpacing: "0.05em",
        lineHeight: 1,
        marginBottom: "8px",
      }}>
        {stat.value}
      </div>

      {/* Açıklama */}
      <div style={{
        fontSize: "12px",
        color: COLORS.textMuted,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        fontFamily: FONTS.body,
      }}>
        {stat.label}
      </div>
    </div>
  );
}