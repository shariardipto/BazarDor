import Link from "next/link";
import Container from "@/components/ui/Container";

export default function NotFound() {
  return (
    <main>
      <Container className="py-20">
        <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center">
          <p className="text-6xl font-bold text-green-700">
            404
          </p>

          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            পেজটি পাওয়া যায়নি
          </h1>

          <p className="mt-2 text-gray-500">
            আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যায়নি।
          </p>

          <Link
            href="/"
            className="mt-6 inline-block rounded-lg bg-green-700 px-5 py-3 text-sm font-semibold text-white hover:bg-green-800"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </Container>
    </main>
  );
}