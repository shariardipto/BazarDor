import Link from "next/link";

import Container from "@/components/ui/Container";
import SignUpForm from "@/components/auth/SignUpForm";

export default function SignUpPage() {
  return (
    <main>
      <Container className="flex min-h-[620px] flex-col items-center justify-center py-12">
        <SignUpForm />

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