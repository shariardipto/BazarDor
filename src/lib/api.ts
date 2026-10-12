import { cache } from "react";
import type { Category, Product } from "@/types/bazardor";

const API_URLS = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function getData<T>(path: string): Promise<T> {
  for (const baseUrl of API_URLS) {
    try {
      const response = await fetch(`${baseUrl}${path}`, {
        cache: "no-store",
      });

      if (response.ok) {
        return response.json();
      }
    } catch {
      // try next API
    }
  }

  throw new Error("Failed to fetch BazarDor data");
}

export const getProducts = cache(async () => {
  return getData<Product[]>("/products");
});

export const getCategories = cache(async () => {
  return getData<Category[]>("/categories");
});

export const getProductsByCategory = cache(async (category: string) => {
  return getData<Product[]>(
    `/products?category=${encodeURIComponent(category)}`
  );
});

export const getProductBySlug = cache(async (slug: string) => {
  const products = await getProducts();

  return (
    products.find(
      (product) =>
        product.slug === slug ||
        String(product.id) === slug
    ) ?? null
  );
});