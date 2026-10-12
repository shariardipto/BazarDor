import type { Product } from "@/types/bazardor";
import ProductCard from "@/components/product/ProductCard";

interface Props {
  title: string;
  products: Product[];
  type: "up" | "down";
}

export default function ProductSection({
  title,
  products,
  type,
}: Props) {
  return (
    <section className="mt-10">
      <h2 className="mb-5 flex items-center gap-2 text-xl font-bold text-gray-900">
        <span className={type === "up" ? "text-red-500" : "text-green-600"}>
          {type === "up" ? "▲" : "▼"}
        </span>

        {title}
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}