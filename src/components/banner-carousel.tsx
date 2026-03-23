"use client";

import { useEffect, useState } from "react";

const bannerItems = [
  {
    tag: "主推活动",
    title: "反重力 Ultra 使用指南",
    description: "这里先放占位轮播图，后续可替换为真实活动海报或商品推广图。",
  },
  {
    tag: "限时优惠",
    title: "Cursor 热门商品专区",
    description: "支持后续接入真实 Banner 数据，当前用于占位展示页面结构。",
  },
  {
    tag: "新手推荐",
    title: "Windsurf 试用与积分",
    description: "可用于展示新手体验包、教程说明或分类专题入口。",
  },
];

export function BannerCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % bannerItems.length);
    }, 3500);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  const activeItem = bannerItems[activeIndex];

  return (
    <section className="mb-8">
      <div className="overflow-hidden rounded-[2rem] border border-blue-100 bg-white p-4 shadow-[0_20px_60px_rgba(59,130,246,0.10)] sm:p-6">
        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[1.75rem] bg-gradient-to-br from-blue-600 via-blue-500 to-violet-600 p-8 text-white transition-all duration-500">
            <p className="text-sm font-medium text-blue-100">{activeItem.tag}</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{activeItem.title}</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-50 sm:text-base">
              {activeItem.description}
            </p>

            <div className="mt-6 flex gap-2">
              {bannerItems.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  aria-label={`切换到 ${item.title}`}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    index === activeIndex ? "w-8 bg-white" : "w-2.5 bg-white/55"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            {bannerItems.map((item, index) => (
              <div
                key={item.title}
                className={`rounded-[1.5rem] border p-5 transition-all duration-300 ${
                  index === activeIndex
                    ? "border-blue-200 bg-blue-50 shadow-sm"
                    : "border-slate-100 bg-slate-50"
                }`}
              >
                <p
                  className={`text-xs font-medium ${
                    index === activeIndex ? "text-blue-700" : "text-slate-500"
                  }`}
                >
                  {item.tag}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
