import Link from "next/link";

import Container from "@/components/ui/Container";
import SignInForm from "@/components/auth/SignInForm";
import ProtectedRouteToast from "@/components/auth/ProtectedRouteToast";

interface SignInPageProps {
  searchParams: Promise<{
    reason?: string;
  }>;
}

export default async function SignInPage({
  searchParams,
}: SignInPageProps) {
  const params = await searchParams;

  const isProtectedRedirect =
    params.reason === "protected";

  return (
    <main>
      {isProtectedRedirect && (
        <ProtectedRouteToast />
      )}

      <Container className="flex min-h-[600px] flex-col items-center justify-center py-12">
        <SignInForm />

        <Link
          href="/"
          className="mt-6 text-sm text-gray-500 hover:text-green-700"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </Container>
    </main>
  );
}