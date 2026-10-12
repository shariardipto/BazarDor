import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

import Container from "@/components/ui/Container";
import { auth } from "@/lib/auth";
import { getProductBySlug } from "@/lib/api";
import {
  formatPct,
  formatPrice,
  unitBn,
} from "@/lib/utils";

interface ProductDetailsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  // --------------------------------
  // Protected Route
  // --------------------------------
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin?reason=protected");
  }

  // --------------------------------
  // Product
  // --------------------------------
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const markets = product.markets ?? [];

  // --------------------------------
  // Price Summary
  // --------------------------------
  const minimumPrice =
    markets.length > 0
      ? Math.min(
          ...markets.map((market) => market.min)
        )
      : product.today;

  const maximumPrice =
    markets.length > 0
      ? Math.max(
          ...markets.map((market) => market.max)
        )
      : product.today;

  const averagePrice =
    markets.length > 0
      ? markets.reduce((total, market) => {
          const marketAverage =
            (market.min + market.max) / 2;

          return total + marketAverage;
        }, 0) / markets.length
      : product.today;

  // --------------------------------
  // Change message
  // --------------------------------
  let changeMessage =
    "গতকালের তুলনায় আজ দাম অপরিবর্তিত";

  if (product.change.dir === "up") {
    changeMessage =
      "গতকালের তুলনায় আজ দাম বেড়েছে";
  }

  if (product.change.dir === "down") {
    changeMessage =
      "গতকালের তুলনায় আজ দাম কমেছে";
  }

  return (
    <main>
      <Container className="py-8">
        {/* Breadcrumb */}
        <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <Link
            href="/"
            className="hover:text-green-700"
          >
            হোম
          </Link>

          <span>›</span>

          <Link
            href={`/category/${product.category}`}
            className="hover:text-green-700"
          >
            {product.categoryNameBn}
          </Link>

          <span>›</span>

          <span className="text-gray-900">
            {product.nameBn}
          </span>
        </div>

        {/* Product Hero */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            {/* Left */}
            <div className="flex items-start gap-5">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-4xl">
                {product.image}
              </div>

              <div>
                <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                  {product.nameBn}
                </h1>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                    {product.categoryIcon}{" "}
                    {product.categoryNameBn}
                  </span>

                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                    প্রতি {unitBn(product.unit)}
                  </span>
                </div>

                <p className="mt-4 text-sm text-gray-500">
                  {changeMessage} ·{" "}
                  {formatPct(product.change.pct)}
                </p>
              </div>
            </div>

            {/* Current price */}
            <div className="rounded-2xl bg-green-50 p-5 md:min-w-56">
              <p className="text-sm text-gray-500">
                আজকের দাম
              </p>

              <p className="mt-2 text-3xl font-bold text-gray-900">
                {formatPrice(product.today)}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                টাকা / {unitBn(product.unit)}
              </p>

              <div
                className={`mt-4 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                  product.change.dir === "up"
                    ? "bg-red-50 text-red-500"
                    : product.change.dir === "down"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                }`}
              >
                {product.change.dir === "up"
                  ? "▲"
                  : product.change.dir === "down"
                    ? "▼"
                    : "—"}{" "}
                {formatPct(product.change.pct)}
              </div>
            </div>
          </div>
        </section>

        {/* Price Summary */}
        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="mb-5 text-xl font-bold text-gray-900">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid gap-4 md:grid-cols-3">
            {/* Min */}
            <div className="rounded-xl border border-gray-200 p-5">
              <p className="text-sm text-gray-500">
                সর্বনিম্ন দাম
              </p>

              <p className="mt-2 text-2xl font-bold text-green-700">
                {formatPrice(minimumPrice)} টাকা
              </p>

              <p className="mt-2 text-xs text-gray-400">
                সবচেয়ে কম দামের বাজার
              </p>
            </div>

            {/* Max */}
            <div className="rounded-xl border border-gray-200 p-5">
              <p className="text-sm text-gray-500">
                সর্বাধিক দাম
              </p>

              <p className="mt-2 text-2xl font-bold text-red-500">
                {formatPrice(maximumPrice)} টাকা
              </p>

              <p className="mt-2 text-xs text-gray-400">
                সবচেয়ে বেশি দামের বাজার
              </p>
            </div>

            {/* Average */}
            <div className="rounded-xl border border-gray-200 p-5">
              <p className="text-sm text-gray-500">
                গড় দাম
              </p>

              <p className="mt-2 text-2xl font-bold text-gray-900">
                {formatPrice(averagePrice)} টাকা
              </p>

              <p className="mt-2 text-xs text-gray-400">
                প্রতি {unitBn(product.unit)} হিসাবে
              </p>
            </div>
          </div>

          {/* Market Table */}
          <div className="mt-8">
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              বাজারভিত্তিক আজকের দাম
            </h2>

            {markets.length > 0 ? (
              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full min-w-[700px] text-left text-sm">
                  <thead className="bg-gray-50 text-gray-600">
                    <tr>
                      <th className="px-5 py-4 font-medium">
                        বাজার
                      </th>

                      <th className="px-5 py-4 font-medium">
                        বিভাগ
                      </th>

                      <th className="px-5 py-4 font-medium">
                        সর্বনিম্ন
                      </th>

                      <th className="px-5 py-4 font-medium">
                        সর্বাধিক
                      </th>

                      <th className="px-5 py-4 font-medium">
                        গড়
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {markets.map(
                      (market, index) => {
                        const avg =
                          (market.min +
                            market.max) /
                          2;

                        return (
                          <tr
                            key={`${market.market}-${index}`}
                            className="hover:bg-gray-50"
                          >
                            <td className="px-5 py-4 font-medium text-gray-900">
                              {market.market}
                            </td>

                            <td className="px-5 py-4 text-gray-500">
                              {market.division}
                            </td>

                            <td className="px-5 py-4">
                              {formatPrice(
                                market.min
                              )}{" "}
                              টাকা
                            </td>

                            <td className="px-5 py-4">
                              {formatPrice(
                                market.max
                              )}{" "}
                              টাকা
                            </td>

                            <td className="px-5 py-4 font-semibold">
                              {formatPrice(avg)} টাকা
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="rounded-xl border border-gray-200 p-8 text-center text-gray-500">
                বাজারভিত্তিক তথ্য পাওয়া যায়নি।
              </div>
            )}
          </div>
        </section>
      </Container>
    </main>
  );
}