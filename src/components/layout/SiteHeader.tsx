import Navbar from "./Navbar";
import CategoryNav from "./CategoryNav";
import PriceTicker from "./PriceTicker";
import { getCategories, getProducts } from "@/lib/api";
import type { Category, Product } from "@/types/bazardor";

export default async function SiteHeader() {
  let categories: Category[] = [];
  let products: Product[] = [];

  try {
    [categories, products] = await Promise.all([
      getCategories(),
      getProducts(),
    ]);
  } catch {
    categories = [];
    products = [];
  }

  return (
    <header>
      <Navbar />
      <CategoryNav categories={categories} />
      <PriceTicker products={products} />
    </header>
  );
}