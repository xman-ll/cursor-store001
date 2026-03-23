import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ProductCard } from "@/components/product-card";
import { PurchasePanel } from "@/components/purchase-panel";
import {
  getStoreProduct,
  getStoreProducts,
} from "@/lib/store-api";
import { formatPrice, products, siteConfig } from "@/lib/store-data";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getStoreProduct(slug);

  if (!product) {
    return {};
  }

  return {
    title: product.seoTitle,
    description: product.seoDescription,
    alternates: {
      canonical: `/products/${product.slug}`,
    },
    openGraph: {
      title: product.seoTitle,
      description: product.seoDescription,
      url: `${siteConfig.domain}/products/${product.slug}`,
      type: "article",
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getStoreProduct(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = (await getStoreProducts(product.categorySlug))
    .filter((item) => item.slug !== product.slug)
    .slice(0, 3);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    category: product.categorySlug,
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "CNY",
      price: product.price,
      availability: "https://schema.org/InStock",
      url: `${siteConfig.domain}/products/${product.slug}`,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "首页",
        item: siteConfig.domain,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "商品详情",
        item: `${siteConfig.domain}/products/${product.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <nav className="text-sm text-slate-500">
          <Link href="/" className="transition hover:text-slate-900">
            首页
          </Link>
          <span className="mx-2">/</span>
          <span>{product.title}</span>
        </nav>

        <section className="mt-6 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
            <div className="bg-[linear-gradient(135deg,_#020617_0%,_#111827_40%,_#4338ca_100%)] p-8">
              {product.imageUrl ? (
                <div className="relative h-[340px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-[340px] items-center justify-center rounded-[2rem] border border-white/10 bg-white/5 text-7xl font-bold tracking-[0.3em] text-white">
                  {product.heroLabel}
                </div>
              )}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
              {product.badge}
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">
              {product.title}
            </h1>
            <p className="mt-4 text-base leading-8 text-slate-600">
              {product.description}
            </p>

            <div className="mt-6 rounded-3xl bg-slate-50 p-6">
              <div className="flex flex-wrap items-end gap-4">
                <span className="text-3xl font-bold text-rose-600">
                  {formatPrice(product.price)}
                </span>
                <span className="text-slate-400 line-through">
                  {formatPrice(product.marketPrice)}
                </span>
                <span className="rounded-full bg-white px-3 py-1 text-sm text-slate-500">
                  {product.unit}
                </span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4 text-sm text-slate-600">
                <div className="rounded-2xl bg-white px-4 py-3">库存：{product.stock}</div>
                <div className="rounded-2xl bg-white px-4 py-3">月售：{product.sales}</div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/#products"
                className="rounded-full bg-slate-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                返回商品列表
              </Link>
              <Link
                href={`/categories/${product.categorySlug}`}
                className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
              >
                查看同类商品
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <article className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
              商品亮点
            </h2>
            <div className="mt-5 grid gap-4">
              {product.highlights.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </article>

          <aside className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
              购买说明
            </h2>
            <div
              className="mt-5 max-w-none space-y-4 text-sm leading-7 text-slate-600 [&_a]:text-blue-600 [&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-slate-200 [&_blockquote]:pl-4 [&_img]:my-4 [&_img]:max-w-full [&_img]:rounded-2xl [&_img]:border [&_img]:border-slate-200 [&_img]:shadow-sm [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:leading-7 [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-5"
              dangerouslySetInnerHTML={{ __html: product.purchaseGuideHtml }}
            />
          </aside>
        </section>

        <PurchasePanel price={product.price} productSlug={product.slug} />

        {relatedProducts.length > 0 ? (
          <section className="mt-10">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-blue-700">相关推荐</p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                  同类商品
                </h2>
              </div>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {relatedProducts.map((item) => (
                <ProductCard key={item.slug} product={item} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </div>
  );
}
