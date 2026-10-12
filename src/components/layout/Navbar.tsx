import Link from "next/link";
import Container from "@/components/ui/Container";

function getBanglaDate() {
  return new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date());
}

export default function Navbar() {
  return (
    <div className="border-b border-gray-200 bg-white">
      <Container className="flex min-h-20 items-center justify-between gap-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-700 text-xl">
            🛒
          </div>

          <div>
            <h1 className="text-lg font-bold leading-tight text-gray-900">
              বাজার দর
            </h1>

            <p className="mt-1 text-xs text-gray-500">
              {getBanglaDate()}
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/signin"
            className="rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-100"
          >
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            className="rounded-lg bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-800"
          >
            সাইন আপ
          </Link>
        </div>
      </Container>
    </div>
  );
}