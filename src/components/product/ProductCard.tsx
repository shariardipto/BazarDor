import Link from "next/link";
import type { Product } from "@/types/bazardor";
import { formatPrice, unitBn } from "@/lib/utils";
import ChangeBadge from "./ChangeBadge";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="block rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f3f8f3] text-2xl">
          {product.image}
        </div>

        <div className="min-w-0">
          <h3 className="truncate font-semibold text-gray-900">
            {product.nameBn}
          </h3>

          <p className="text-sm text-gray-500">
            প্রতি {unitBn(product.unit)}
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-end justify-between gap-2">
        <div>
          <p className="text-xs text-gray-500">আজকের দাম</p>

          <p className="mt-1 text-xl font-bold text-gray-900">
            {formatPrice(product.today)}{" "}
            <span className="text-sm font-medium">টাকা</span>
          </p>
        </div>

        <ChangeBadge change={product.change} />
      </div>
    </Link>
  );
}