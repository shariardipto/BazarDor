import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import Container from "@/components/ui/Container";
import UpdateProfileForm from "@/components/auth/UpdateProfileForm";
import { auth } from "@/lib/auth";

export default async function UpdateProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin?reason=protected");
  }

  return (
    <main>
      <Container className="py-10">
        <div className="mx-auto max-w-xl">
          <Link
            href="/profile"
            className="text-sm text-gray-500 hover:text-green-700"
          >
            ← প্রোফাইলে ফিরে যান
          </Link>

          <div className="mb-6 mt-5">
            <h1 className="text-3xl font-bold text-gray-900">
              তথ্য আপডেট করুন
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              আপনার নাম পরিবর্তন করুন।
            </p>
          </div>

          <UpdateProfileForm
            currentName={
              session.user.name ?? ""
            }
          />
        </div>
      </Container>
    </main>
  );
}