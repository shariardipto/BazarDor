import Container from "@/components/ui/Container";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-white">
      <Container className="flex flex-col gap-3 py-6 text-sm text-gray-600 sm:flex-row sm:items-center sm:justify-between">
        <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>

        <p>
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </Container>
    </footer>
  );
}