import Image from "next/image";
import Link from "next/link";
import type { StoreProduct } from "@/lib/store-api";
import { formatPrice } from "@/lib/store-data";

type ProductCardProps = {
  product: StoreProduct;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60">
      <div className="relative overflow-hidden bg-[linear-gradient(135deg,_#020617_0%,_#111827_45%,_#334155_100%)] px-6 py-8">
        <span className="absolute right-4 top-4 rounded-full bg-white/10 px-3 py-1 text-xs text-white/80 backdrop-blur">
          {product.badge}
        </span>
        {product.imageUrl ? (
          <div className="relative h-28 overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 shadow-inner">
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              unoptimized
              className="object-cover"
            />
          </div>
        ) : (
          <div className="flex h-28 items-center justify-center rounded-[1.75rem] border border-white/10 bg-white/5 text-4xl font-bold tracking-widest text-white shadow-inner">
            {product.heroLabel}
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold text-slate-950">{product.title}</h3>
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
            库存 {product.stock}
          </span>
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
          {product.shortDescription}
        </p>

        <div className="mt-4 flex items-center gap-3 text-sm">
          <span className="text-xl font-bold text-rose-600">{formatPrice(product.price)}</span>
          <span className="text-slate-400 line-through">{formatPrice(product.marketPrice)}</span>
          <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-500">
            {product.unit}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
          <span>月售 {product.sales}</span>
          <span>{product.badge}</span>
        </div>

        <Link
          href={`/products/${product.slug}`}
          className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-500"
        >
          查看详情
        </Link>
      </div>
    </article>
  );
}
