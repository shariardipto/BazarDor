import Container from "@/components/ui/Container";
import Hero from "@/components/home/Hero";
import ProductSection from "@/components/home/ProductSection";
import ProductCard from "@/components/product/ProductCard";
import { getProducts } from "@/lib/api";
import { toBn } from "@/lib/utils";

export default async function Home() {
  const products = await getProducts();

  const risers = [...products]
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = [...products]
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <main className="pb-10">
      <Hero />

      <Container>
        <ProductSection
          title="আজ দাম বেড়েছে"
          products={risers}
          type="up"
        />

        <ProductSection
          title="আজ দাম কমেছে"
          products={fallers}
          type="down"
        />

        <section id="সব-পণ্য" className="mt-12 scroll-mt-36">
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-gray-900">
              সব পণ্য
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              মোট {toBn(products.length)}টি পণ্য দেখানো হচ্ছে
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}