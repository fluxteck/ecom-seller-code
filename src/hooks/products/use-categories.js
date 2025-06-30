// hooks/useProductMeta.js
import { useEffect, useState } from "react";

export default function useCategories() {
  const [categories, setCategories] = useState({
    categories: [],
    tags: [],
    productTypes: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "http://localhost:8080/api/products/fetch-categories"
        );

        if (!res.ok) throw new Error("Failed to fetch categoriesData");

        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
}
