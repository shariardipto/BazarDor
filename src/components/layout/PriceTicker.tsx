import Link from "next/link";
import type { Product } from "@/types/bazardor";
import { formatPct, formatPrice, unitBn } from "@/lib/utils";

interface Props {
  products: Product[];
}

function TickerItems({ products }: Props) {
  return (
    <>
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/product/${product.slug}`}
          className="flex shrink-0 items-center gap-1 border-r border-gray-200 px-5 py-2 text-xs text-gray-700 hover:bg-gray-50"
        >
          <span>{product.image}</span>

          <span className="font-medium">{product.nameBn}</span>

          <span>
            {formatPrice(product.today)} টাকা/{unitBn(product.unit)}
          </span>

          {product.change.dir === "up" && (
            <span className="font-semibold text-red-500">
              ▲ {formatPct(product.change.pct)}
            </span>
          )}

          {product.change.dir === "down" && (
            <span className="font-semibold text-green-600">
              ▼ {formatPct(product.change.pct)}
            </span>
          )}

          {product.change.dir === "flat" && (
            <span className="text-gray-500">
              — {formatPct(product.change.pct)}
            </span>
          )}
        </Link>
      ))}
    </>
  );
}

export default function PriceTicker({ products }: Props) {
  if (!products.length) return null;

  return (
    <div className="overflow-hidden border-b border-gray-200 bg-white">
      <div className="ticker-track flex w-max">
        <div className="flex shrink-0">
          <TickerItems products={products} />
        </div>

        <div className="flex shrink-0" aria-hidden="true">
          <TickerItems products={products} />
        </div>
      </div>
    </div>
  );
}