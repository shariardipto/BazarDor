"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import Container from "@/components/ui/Container";
import { authClient } from "@/lib/auth-client";

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
  const router = useRouter();

  const { data: session, isPending } =
    authClient.useSession();

  const handleLogout = async () => {
    try {
      await authClient.signOut();

      toast.success("সাইন আউট হয়েছে");

      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করা যায়নি");
    }
  };

  return (
    <div className="border-b border-gray-200 bg-white">
      <Container className="flex min-h-20 items-center justify-between gap-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-700 text-xl">
            🛒
          </div>

          <div>
            <h1 className="text-lg font-bold leading-tight">
              বাজার দর
            </h1>

            <p className="mt-1 text-xs text-gray-500">
              {getBanglaDate()}
            </p>
          </div>
        </Link>

        {isPending ? (
          <div className="h-9 w-24 animate-pulse rounded-lg bg-gray-200" />
        ) : session ? (
          <details className="relative">
            <summary className="cursor-pointer list-none rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-100">
              {session.user.name} ▾
            </summary>

            <div className="absolute right-0 z-50 mt-2 w-60 rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
              <div className="border-b border-gray-100 px-3 py-3">
                <p className="font-semibold">
                  {session.user.name}
                </p>

                <p className="mt-1 truncate text-xs text-gray-500">
                  {session.user.email}
                </p>
              </div>

              <Link
                href="/profile"
                className="mt-1 block rounded-lg px-3 py-2 text-sm hover:bg-gray-100"
              >
                👤 আমার প্রোফাইল
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="block w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
              >
                ↩ সাইন আউট
              </button>
            </div>
          </details>
        ) : (
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
        )}
      </Container>
    </div>
  );
}