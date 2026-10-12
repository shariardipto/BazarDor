import Container from "@/components/ui/Container";

export default function CategoryLoading() {
  return (
    <Container className="py-8">
      <div className="h-28 animate-pulse rounded-2xl bg-gray-200" />

      <div className="mt-6 h-20 animate-pulse rounded-2xl bg-gray-200" />

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