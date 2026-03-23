import Link from "next/link";
import type { StoreCategory } from "@/lib/store-api";

type CategoryTabsProps = {
  categories: StoreCategory[];
  activeSlug?: string;
};

export function CategoryTabs({
  categories,
  activeSlug = "all",
}: CategoryTabsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => {
        const href = category.slug === "all" ? "/" : `/categories/${category.slug}`;
        const isActive = activeSlug === category.slug;

        return (
          <Link
            key={category.slug}
            href={href}
            scroll={false}
            className={`rounded-full px-4 py-2 text-sm transition ${
              isActive
                ? "bg-slate-950 text-white shadow-lg shadow-slate-900/10"
                : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-950"
            }`}
          >
            {category.name}
          </Link>
        );
      })}
    </div>
  );
}
