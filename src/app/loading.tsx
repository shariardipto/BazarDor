import Container from "@/components/ui/Container";

export default function Loading() {
  return (
    <Container className="py-8">
      <div className="h-64 animate-pulse rounded-2xl bg-gray-200" />

      <div className="mt-10 h-7 w-48 animate-pulse rounded bg-gray-200" />

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-40 animate-pulse rounded-2xl bg-gray-200"
          />
        ))}
      </div>
    </Container>
  );
}