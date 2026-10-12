import Link from "next/link";

export default function EmptyCategory() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center">
      <div className="text-5xl">😕</div>

      <h2 className="mt-5 text-2xl font-bold text-gray-900">
        কোনো পণ্য পাওয়া যায়নি
      </h2>

      <p className="mt-2 text-gray-500">
        এই ক্যাটাগরিটি পাওয়া যায়নি অথবা এখানে কোনো পণ্য নেই।
      </p>

      <Link
        href="/"
        className="mt-6 inline-block rounded-lg bg-green-700 px-5 py-3 text-sm font-semibold text-white hover:bg-green-800"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}