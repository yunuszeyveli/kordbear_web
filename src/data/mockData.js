import { Palette, ClipboardList, Settings2, Package } from "lucide-react";

export const STATS = [
  { id: 1, value: "2.400+", label: "Teslim Edilen Ürün" },
  { id: 2, value: "%99", label: "Müşteri Memnuniyeti" },
  { id: 3, value: "48s", label: "Ortalama Üretim Süresi" },
  { id: 4, value: "12", label: "Farklı Malzeme" },
];

export const HOW_IT_WORKS = [
  {
    step: "01",
    icon: Palette,
    title: "Tasarımı Seç",
    desc: "Katalogumuzdan ürününüzü seçin veya özel tasarım talebi oluşturun.",
  },
  {
    step: "02",
    icon: ClipboardList,
    title: "Sipariş Ver",
    desc: "Malzeme ve renk tercihlerinizi belirleyerek siparişinizi onaylayın.",
  },
  {
    step: "03",
    icon: Settings2,
    title: "Üretim Başlar",
    desc: "3D yazıcılarımız 48 saat içinde ürününüzü hassasiyetle üretir.",
  },
  {
    step: "04",
    icon: Package,
    title: "Kapınıza Teslim",
    desc: "Özenle paketlenen ürününüz güvenli kargo ile adresinize gelir.",
  },
];
