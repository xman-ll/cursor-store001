import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BannerCarousel } from "@/components/banner-carousel";
import { CategoryTabs } from "@/components/category-tabs";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ProductCard } from "@/components/product-card";
import {
  getCategoryTabs,
  getStoreCategoryBySlug,
  getStoreProducts,
} from "@/lib/store-api";
import { siteConfig } from "@/lib/store-data";

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return [
    { slug: "cursor-ultra" },
    { slug: "cursor-plugin" },
    { slug: "windsurf" },
    { slug: "api-service" },
  ];
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getStoreCategoryBySlug(slug);

  if (!category) {
    return {};
  }

  return {
    title: category.seoTitle,
    description: category.seoDescription,
    alternates: {
      canonical: `/categories/${category.slug}`,
    },
    openGraph: {
      title: category.seoTitle,
      description: category.seoDescription,
      url: `${siteConfig.domain}/categories/${category.slug}`,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const [category, categoryProducts, categories] = await Promise.all([
    getStoreCategoryBySlug(slug),
    getStoreProducts(slug),
    getCategoryTabs(),
  ]);

  if (!category || category.slug === "all") {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.name,
    description: category.summary,
    url: `${siteConfig.domain}/categories/${category.slug}`,
    mainEntity: categoryProducts.map((product) => ({
      "@type": "Product",
      name: product.title,
      description: product.shortDescription,
      offers: {
        "@type": "Offer",
        priceCurrency: "CNY",
        price: product.price,
        availability: "https://schema.org/InStock",
        url: `${siteConfig.domain}/products/${product.slug}`,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <BannerCarousel />

        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-medium text-blue-700">分类页面</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950">
            {category.name}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
            {category.summary}
          </p>

          <div className="mt-6">
            <CategoryTabs categories={categories} activeSlug={category.slug} />
          </div>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {categoryProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </section>

        <section className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
            为什么分类页对 SEO 有帮助
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600">
            <p>
              分类页能把同主题商品集中展示，形成更明确的关键词聚合内容，例如
              “Cursor Ultra 商品”“AI API 服务”“Windsurf 试用积分”等。
            </p>
            <p>
              当商品数量继续增加时，可以继续扩展选购说明、对比内容、交付方式和常见问题，让该类目页获得更多自然搜索入口。
            </p>
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
