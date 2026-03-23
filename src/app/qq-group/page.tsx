"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { getSupportGroup, type SupportGroup } from "@/lib/store-api";

export default function QqGroupPage() {
  const [copied, setCopied] = useState(false);
  const [joinMessage, setJoinMessage] = useState("");
  const [group, setGroup] = useState<SupportGroup | null>(null);

  useEffect(() => {
    async function load() {
      const data = await getSupportGroup();
      setGroup(data);
    }

    void load();
  }, []);

  async function handleCopy() {
    if (!group) return;

    try {
      await navigator.clipboard.writeText(group.groupNo);
      setCopied(true);
      setJoinMessage("群号已复制，可在 QQ 中搜索加入。");
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
      setJoinMessage("复制失败，请手动记下群号加入。");
    }
  }

  function handleJoin() {
    if (!group) return;

    setJoinMessage("正在尝试拉起 QQ 客户端...");
    window.location.href = group.joinScheme;

    window.setTimeout(() => {
      setJoinMessage("如果没有自动打开 QQ，请点击下方“复制群号”后在 QQ 中搜索加入。");
    }, 1200);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="mx-auto flex max-w-7xl justify-center px-4 py-10 sm:px-6 lg:px-8">
        <section className="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-7 text-center shadow-[0_20px_80px_rgba(15,23,42,0.08)] sm:p-8">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-sky-400 to-cyan-500 text-4xl shadow-[0_16px_32px_rgba(14,165,233,0.28)]">
            QQ
          </div>

          <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-950">
            加入 QQ 交流群
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-500">
            {group?.notice ?? "加入我们的官方交流群获取资讯、优惠信息和技术支持。"}
          </p>

          <div className="mt-7 rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 px-6 py-6">
            <p className="text-xs tracking-[0.2em] text-slate-400">QQ群号</p>
            <p className="mt-3 text-4xl font-bold tracking-[0.25em] text-slate-900">
              {group?.groupNo ?? "加载中..."}
            </p>
          </div>

          <div className="mt-6 grid gap-4">
            <button
              type="button"
              onClick={handleJoin}
              className="inline-flex h-13 items-center justify-center rounded-2xl bg-gradient-to-r from-sky-400 to-cyan-500 px-6 text-base font-semibold text-white shadow-[0_12px_32px_rgba(14,165,233,0.28)] transition hover:opacity-95"
            >
              一键加入 QQ 群
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex h-13 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 px-6 text-base font-semibold text-white shadow-[0_12px_32px_rgba(99,102,241,0.26)] transition hover:opacity-95"
            >
              {copied ? "已复制群号" : "复制群号"}
            </button>
          </div>

          <p className="mt-4 min-h-6 text-sm text-slate-500">{joinMessage}</p>

          <Link
            href="/"
            className="mt-6 inline-flex text-sm text-slate-400 transition hover:text-slate-600"
          >
            返回商城首页
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
