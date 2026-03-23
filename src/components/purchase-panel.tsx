"use client";

import { useMemo, useState } from "react";
import { PaymentModal } from "@/components/payment-modal";
import {
  createStorePayment,
  type PaymentCreateResult,
} from "@/lib/store-api";
import { formatPrice } from "@/lib/store-data";

type PurchasePanelProps = {
  price: number;
  productSlug: string;
};

export function PurchasePanel({ price, productSlug }: PurchasePanelProps) {
  const [quantity, setQuantity] = useState(1);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [payment, setPayment] = useState<PaymentCreateResult | null>(null);

  const totalPrice = useMemo(() => price * quantity, [price, quantity]);

  async function handleSubmit() {
    if (!email.trim()) {
      setMessage("请输入接收卡密的邮箱");
      return;
    }

    setSubmitting(true);
    setMessage("");

    try {
      const paymentResult = await createStorePayment({
        productSlug,
        quantity,
        email,
        paymentChannel: "alipay",
      });

      if (!paymentResult.qrCodeUrl) {
        setMessage(paymentResult.error || "支付单创建失败，请稍后重试");
        return;
      }

      setPayment(paymentResult);
      setMessage(`订单创建成功，订单号：${paymentResult.orderNo}`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "下单失败，请稍后重试");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="mt-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
      <div className="p-6 sm:p-8">
        <div className="grid gap-6">
          <div className="grid gap-3 sm:grid-cols-[88px_1fr] sm:items-center">
            <p className="text-base text-slate-600">购买数量</p>
            <div className="flex h-12 w-fit items-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
              <button
                type="button"
                aria-label="减少购买数量"
                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                className="flex h-full w-12 items-center justify-center border-r border-slate-200 text-2xl text-slate-700 transition hover:bg-slate-100"
              >
                -
              </button>
              <div className="flex h-full min-w-16 items-center justify-center bg-white px-4 text-lg text-slate-900">
                {quantity}
              </div>
              <button
                type="button"
                aria-label="增加购买数量"
                onClick={() => setQuantity((current) => current + 1)}
                className="flex h-full w-12 items-center justify-center border-l border-slate-200 text-2xl text-slate-700 transition hover:bg-slate-100"
              >
                +
              </button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-[88px_1fr] sm:items-center">
            <label htmlFor="receive-email" className="text-base text-slate-600">
              邮箱
            </label>
            <input
              id="receive-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="接收卡密的邮箱"
              className="h-12 rounded-2xl border border-slate-200 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-[88px_1fr] sm:items-center">
            <p className="text-base text-slate-600">支付方式</p>
            <div className="flex items-center">
              <button
                type="button"
                className="inline-flex h-13 w-fit items-center gap-3 rounded-2xl border-2 border-indigo-500 bg-white px-5 py-3 text-lg font-medium text-slate-900 shadow-[0_10px_30px_rgba(79,70,229,0.08)]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-500 text-xl font-bold text-white">
                  支
                </span>
                支付宝
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 border-t border-slate-200 bg-slate-50/60 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex items-end gap-3">
          <span className="text-base text-slate-500">应付金额:</span>
          <span className="text-4xl font-bold text-rose-500">{formatPrice(totalPrice)}</span>
        </div>

        <button
          type="button"
          disabled={submitting}
          onClick={() => void handleSubmit()}
          className="inline-flex h-14 min-w-[190px] items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 px-8 text-xl font-semibold text-white shadow-[0_10px_30px_rgba(99,102,241,0.35)] transition hover:opacity-95"
        >
          {submitting ? "提交中..." : "立即购买"}
        </button>
      </div>

      {message ? (
        <div className="border-t border-slate-200 px-6 py-4 text-sm text-slate-500 sm:px-8">
          {message}
        </div>
      ) : null}

      {payment ? (
        <PaymentModal
          payment={payment}
          amount={totalPrice}
          onClose={() => setPayment(null)}
          onPaid={(paidMessage) => {
            setPayment(null);
            setMessage(paidMessage);
          }}
        />
      ) : null}
    </section>
  );
}
