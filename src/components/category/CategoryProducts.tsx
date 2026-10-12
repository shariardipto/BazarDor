"use client";

import { useState } from "react";
import ProductCard from "@/components/product/ProductCard";
import type { Product } from "@/types/bazardor";
import { toBn } from "@/lib/utils";

interface Props {
  products: Product[];
}

type SortType = "default" | "low" | "high";

export default function CategoryProducts({ products }: Props) {
  const [sort, setSort] = useState<SortType>("default");

  const sortedProducts = [...products];

  if (sort === "low") {
    sortedProducts.sort((a, b) => a.today - b.today);
  }

  if (sort === "high") {
    sortedProducts.sort((a, b) => b.today - a.today);
  }

  return (
    <>
      <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-medium text-gray-600">
          মোট {products.length}টি পণ্য
        </p>

        <div className="flex items-center gap-2">
          <label
            htmlFor="sort"
            className="text-sm font-medium text-gray-600"
          >
            সাজান:
          </label>

          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortType)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-green-600"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low">দাম: কম থেকে বেশি</option>
            <option value="high">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </>
  );
}