"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { siteConfig } from "@/lib/store-data";

const navigation = [
  { name: "首页", href: "/" },
  { name: "订单查询", href: "/orders" },
  { name: "售后QQ群", href: "/qq-group" },
  { name: "热门商品", href: "/#product-list" },
  { name: "选购指南", href: "/#guide" },
  { name: "常见问题", href: "/#faq" },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();

  function handleGoToProducts(event: React.MouseEvent<HTMLAnchorElement>) {
    if (pathname === "/") {
      event.preventDefault();
      document.getElementById("product-list")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      return;
    }

    event.preventDefault();
    router.push("/#product-list");
  }

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 text-sm font-bold text-white shadow-lg shadow-blue-500/20">
            AI
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">{siteConfig.name}</p>
            <p className="text-xs text-slate-500">简洁稳定的 AI 工具商城</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`rounded-full px-4 py-2 text-sm transition ${
                pathname === item.href
                  ? "bg-violet-50 font-medium text-violet-700"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <Link
          href="/#product-list"
          onClick={handleGoToProducts}
          className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          立即选购
        </Link>
      </div>
    </header>
  );
}
