import Container from "@/components/ui/Container";
import CategoryProducts from "@/components/category/CategoryProducts";
import EmptyCategory from "@/components/category/EmptyCategory";
import { getCategories, getProductsByCategory } from "@/lib/api";
import { toBn } from "@/lib/utils";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  const categories = await getCategories();

  const category = categories.find(
    (item) => item.slug === slug
  );

  if (!category) {
    return (
      <main>
        <Container className="py-10">
          <EmptyCategory />
        </Container>
      </main>
    );
  }

  const products = await getProductsByCategory(slug);

  if (!products.length) {
    return (
      <main>
        <Container className="py-10">
          <EmptyCategory />
        </Container>
      </main>
    );
  }

  return (
    <main>
      <Container className="py-8">
        <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-50 text-3xl">
              {category.icon}
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {category.nameBn}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                {category.nameBn} বিভাগের{" "}
                {toBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
              </p>
            </div>
          </div>
        </section>

        <CategoryProducts products={products} />
      </Container>
    </main>
  );
}