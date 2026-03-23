import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.16),_transparent_32%),radial-gradient(circle_at_top_right,_rgba(139,92,246,0.14),_transparent_24%),linear-gradient(180deg,_#f8fbff_0%,_#ffffff_55%)]" />

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-20">
        <div>
          <span className="inline-flex rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-medium text-blue-700 shadow-sm">
            AI 会员 · 插件 · API 一站式展示
          </span>
          <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            简洁高转化的 AI 工具商城首页
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            页面基于服务端渲染与语义化结构构建，兼顾简洁审美、商品转化与搜索引擎收录，适合展示
            Cursor、Windsurf、插件和 API 服务。
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/#products"
              className="rounded-full bg-slate-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              查看热门商品
            </Link>
            <Link
              href="/categories/cursor-ultra"
              className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
            >
              浏览 Cursor 专区
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { value: "6+", label: "预置商品示例" },
              { value: "3", label: "SEO 落地页面类型" },
              { value: "100%", label: "静态内容可索引" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-white/70 bg-white/80 p-5 shadow-sm ring-1 ring-slate-100"
              >
                <p className="text-2xl font-semibold text-slate-950">{item.value}</p>
                <p className="mt-1 text-sm text-slate-500">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="rounded-[2rem] border border-blue-100 bg-white p-6 shadow-[0_20px_80px_rgba(59,130,246,0.12)]">
            <div className="rounded-[1.5rem] bg-gradient-to-br from-blue-600 via-blue-500 to-violet-600 p-6 text-white">
              <p className="text-sm font-medium text-blue-100">主推内容</p>
              <h2 className="mt-3 text-3xl font-bold">反重力 Ultra 使用指南</h2>
              <p className="mt-4 max-w-md text-sm leading-7 text-blue-50">
                用 Banner 承接重点商品、教程与优惠活动，保持大标题清晰、信息块简洁、按钮路径明确。
              </p>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
                <p className="text-sm font-medium text-slate-500">推荐做法</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">分类清晰</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  首页聚合，分类页承接关键词，详情页承接长尾搜索。
                </p>
              </div>
              <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
                <p className="text-sm font-medium text-slate-500">页面特性</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">首屏简洁</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  视觉轻量，重点突出商品与 CTA，兼顾浏览效率与转化率。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
