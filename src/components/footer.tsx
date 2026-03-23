import Link from "next/link";
import { siteConfig } from "@/lib/store-data";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 text-sm text-slate-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="font-semibold text-slate-900">{siteConfig.name}</p>
          <p className="mt-2 max-w-2xl leading-7">{siteConfig.description}</p>
        </div>

        <div className="flex flex-wrap gap-5">
          <Link href="/" className="transition hover:text-slate-900">
            首页
          </Link>
          <Link href="/categories/cursor-ultra" className="transition hover:text-slate-900">
            Cursor Ultra
          </Link>
          <Link href="/categories/api-service" className="transition hover:text-slate-900">
            API 服务
          </Link>
        </div>
      </div>
    </footer>
  );
}
