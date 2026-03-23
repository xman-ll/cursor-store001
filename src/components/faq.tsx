import { faqList } from "@/lib/store-data";

export function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-blue-700">常见问题</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
          简洁页面也能兼顾搜索流量与转化
        </h2>
        <p className="mt-4 text-base leading-7 text-slate-600">
          通过独立详情页、分类聚合页、FAQ 内容和结构化数据，搜索引擎更容易理解页面主题。
        </p>
      </div>

      <div className="mt-8 grid gap-4">
        {faqList.map((item) => (
          <details
            key={item.question}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <summary className="cursor-pointer list-none text-base font-semibold text-slate-950">
              {item.question}
            </summary>
            <p className="mt-4 text-sm leading-7 text-slate-600">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
