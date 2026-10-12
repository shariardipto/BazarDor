import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import Container from "@/components/ui/Container";
import { auth } from "@/lib/auth";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin?reason=protected");
  }

  const user = session.user;

  return (
    <main>
      <Container className="py-10">
        <div className="mx-auto max-w-2xl">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              আমার প্রোফাইল
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
            </p>
          </div>

          {/* User card */}
          <section className="rounded-2xl border border-gray-200 bg-white p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              {user.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.image}
                  alt={user.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-2xl">
                  👤
                </div>
              )}

              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold text-gray-900">
                  {user.name}
                </h2>

                <p className="mt-1 truncate text-sm text-gray-500">
                  {user.email}
                </p>
              </div>
            </div>
          </section>

          {/* Information */}
          <section className="mt-5 rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-bold text-gray-900">
              তথ্য
            </h2>

            <div className="mt-5 space-y-5">
              <div>
                <p className="text-xs text-gray-400">
                  নাম
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  {user.name}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  ইমেইল
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  {user.email}
                </p>
              </div>
            </div>

            <Link
              href="/profile/update"
              className="mt-7 block w-full rounded-lg bg-green-700 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-green-800"
            >
              তথ্য আপডেট করুন
            </Link>
          </section>
        </div>
      </Container>
    </main>
  );
}