// kordbear-web/src/hooks/useProducts.js
// Custom hook — ürün verilerini API'den çeker
// Birden fazla sayfada kullanılabilir

import { useState, useEffect } from "react";
import api from "../utils/api";

export default function useProducts(category = null) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        // Kategori varsa query parameter ekle
        const url = category ? `/products?category=${category}` : "/products";

        const response = await api.get(url);
        setProducts(response.data.products);
      } catch (err) {
        setError(err.response?.data?.message || "Ürünler yüklenemedi");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return { products, loading, error };
}
