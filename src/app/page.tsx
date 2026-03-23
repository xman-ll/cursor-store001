import { BannerCarousel } from "@/components/banner-carousel";
import { CategoryTabs } from "@/components/category-tabs";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ProductCard } from "@/components/product-card";
import { getCategoryTabs, getStoreProducts } from "@/lib/store-api";
import { siteConfig } from "@/lib/store-data";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.domain,
  description: siteConfig.description,
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteConfig.domain}/categories/{category}`,
    "query-input": "required name=category",
  },
};

export default async function Home() {
  const [categories, storeProducts] = await Promise.all([
    getCategoryTabs(),
    getStoreProducts(),
  ]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="py-8 sm:py-10">
        <section id="products" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <BannerCarousel />

          <div className="mb-6">
            <p className="mb-3 text-sm font-medium text-slate-500">商品分类</p>
            <CategoryTabs categories={categories} activeSlug="all" />
          </div>

          <div
            id="product-list"
            className="scroll-mt-24 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <p className="text-sm font-medium text-blue-700">热门商品</p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {storeProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
