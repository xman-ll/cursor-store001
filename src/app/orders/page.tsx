"use client";

import { useState } from "react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { queryStoreOrder, type StoreOrder } from "@/lib/store-api";

export default function OrdersPage() {
  const [orderNo, setOrderNo] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<StoreOrder | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setResult(null);

    try {
      const order = await queryStoreOrder({ orderNo, email });
      setResult(order);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "查询失败");
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="border-b border-slate-200 pb-5">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
              订单查询
            </h1>
            <p className="mt-3 text-sm leading-7 text-slate-500">
              请输入订单号和购买商品时填写的邮箱进行查询。
            </p>
          </div>

          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="order-id"
                className="mb-2 block text-sm font-medium text-slate-900"
              >
                订单号
              </label>
              <input
                id="order-id"
                type="text"
                value={orderNo}
                onChange={(event) => setOrderNo(event.target.value)}
                placeholder="请输入订单号"
                className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500"
              />
            </div>

            <div>
              <label
                htmlFor="order-email"
                className="mb-2 block text-sm font-medium text-slate-900"
              >
                邮箱
              </label>
              <input
                id="order-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="请输入购买时的邮箱"
                className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500"
              />
            </div>
            <button
              type="submit"
              className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-violet-400 to-violet-600 text-base font-semibold text-white shadow-[0_12px_30px_rgba(139,92,246,0.22)] transition hover:opacity-95"
            >
              查询订单
            </button>
          </form>

          {message ? <p className="mt-4 text-sm text-rose-500">{message}</p> : null}

          {result ? (
            <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-sm leading-7 text-slate-600">
              <p>订单号：{result.orderNo}</p>
              <p>商品：{result.productTitleSnapshot}</p>
              <p>状态：{result.status}</p>
              <p>数量：{result.quantity}</p>
              <p>金额：¥{result.totalAmount}</p>
              <p>邮件状态：{result.emailDeliveryStatus}</p>
              {result.emailSentAt ? <p>发送时间：{result.emailSentAt}</p> : null}
              {result.emailError ? <p>失败原因：{result.emailError}</p> : null}
              <p>
                已核销卡密：{result.redeemedCards.length}/{result.cardCodes.length}
              </p>
              <p>备注：{result.note}</p>
            </div>
          ) : null}
        </section>
      </main>
      <Footer />
    </div>
  );
}
