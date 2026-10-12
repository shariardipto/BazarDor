import { formatPct } from "@/lib/utils";
import type { Product } from "@/types/bazardor";

interface Props {
  change: Product["change"];
}

export default function ChangeBadge({ change }: Props) {
  if (change.dir === "up") {
    return (
      <span className="rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-500">
        ▲ {formatPct(change.pct)}
      </span>
    );
  }

  if (change.dir === "down") {
    return (
      <span className="rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
        ▼ {formatPct(change.pct)}
      </span>
    );
  }

  return (
    <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-500">
      — {formatPct(change.pct)}
    </span>
  );
}