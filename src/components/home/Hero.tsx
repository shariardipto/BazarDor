import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";

export default function Hero() {
  return (
    <Container className="pt-6">
      <section className="grid items-center gap-8 rounded-2xl border border-gray-200 bg-white px-6 py-8 md:grid-cols-[1fr_320px] md:px-10">
        <div>
          <span className="inline-block rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
            আজকের বাজার আপডেট
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h2>

          <p className="mt-4 max-w-2xl leading-7 text-gray-600">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
            বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের
            পরিবর্তন এক জায়গায়।
          </p>

          <Link
            href="#সব-পণ্য"
            className="mt-6 inline-block rounded-lg bg-green-700 px-5 py-3 text-sm font-semibold text-white hover:bg-green-800"
          >
            সব পণ্য দেখুন
          </Link>
        </div>

        <div className="flex justify-center md:justify-end">
          <Image
            src="/bazar-hero.png"
            alt="বাজারের পণ্য"
            width={280}
            height={280}
            priority
            className="h-auto w-52 md:w-64"
          />
        </div>
      </section>
    </Container>
  );
}