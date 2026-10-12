import Container from "@/components/ui/Container";

export default function ProfileLoading() {
  return (
    <main>
      <Container className="py-10">
        <div className="mx-auto max-w-2xl">
          <div className="h-9 w-48 animate-pulse rounded bg-gray-200" />

          <div className="mt-6 h-32 animate-pulse rounded-2xl bg-gray-200" />

          <div className="mt-5 h-64 animate-pulse rounded-2xl bg-gray-200" />
        </div>
      </Container>
    </main>
  );
}