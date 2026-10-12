"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/types/bazardor";
import Container from "@/components/ui/Container";

interface Props {
  categories: Category[];
}

export default function CategoryNav({ categories }: Props) {
  const pathname = usePathname();

  return (
    <div className="border-b border-gray-100 bg-white">
      <Container>
        <nav className="flex gap-2 overflow-x-auto py-3">
          {categories.map((category) => {
            const href = `/category/${category.slug}`;
            const active = pathname === href;

            return (
              <Link
                key={category.id}
                href={href}
                className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                  active
                    ? "bg-green-700 text-white"
                    : "text-gray-700 hover:bg-green-50"
                }`}
              >
                <span>{category.icon}</span>
                {category.nameBn}
              </Link>
            );
          })}
        </nav>
      </Container>
    </div>
  );
}