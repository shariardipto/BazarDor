import Container from "@/components/ui/Container";

export default function ProductLoading() {
  return (
    <main>
      <Container className="py-8">
        <div className="h-6 w-60 animate-pulse rounded bg-gray-200" />

        <div className="mt-5 h-56 animate-pulse rounded-2xl bg-gray-200" />

        <div className="mt-8 h-7 w-52 animate-pulse rounded bg-gray-200" />

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map(
            (_, index) => (
              <div
                key={index}
                className="h-32 animate-pulse rounded-xl bg-gray-200"
              />
            )
          )}
        </div>

        <div className="mt-8 h-96 animate-pulse rounded-2xl bg-gray-200" />
      </Container>
    </main>
  );
}