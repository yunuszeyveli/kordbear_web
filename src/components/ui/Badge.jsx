// src/components/ui/Badge.jsx
import { COLORS, FONTS } from '../../styles/theme';

// accent prop'u true ise turuncu, değilse gri görünür
export default function Badge({ children, accent }) {
  return (
    <span style={{
      display: "inline-block",
      padding: "2px 10px",
      borderRadius: "2px",
      fontSize: "10px",
      fontWeight: 700,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      fontFamily: FONTS.body,
      background: accent ? COLORS.accent     : COLORS.border,
      color:      accent ? COLORS.white      : COLORS.textMuted,
    }}>
      {children}
    </span>
  );
}