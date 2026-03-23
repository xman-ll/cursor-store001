"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { redeemStoreCard } from "@/lib/store-api";

export function RedeemForm() {
  const searchParams = useSearchParams();
  const defaultOrderNo = useMemo(
    () => searchParams.get("orderNo") || "",
    [searchParams],
  );
  const [orderNo, setOrderNo] = useState(defaultOrderNo);
  const [cardCode, setCardCode] = useState("");
  const [workosCursorSessionToken, setWorkosCursorSessionToken] = useState("");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");
    setSuccessMessage("");

    if (!workosCursorSessionToken.trim()) {
      setMessage("请输入 WorkosCursorSessionToken");
      setSubmitting(false);
      return;
    }

    try {
      const result = await redeemStoreCard({
        orderNo,
        cardCode,
        workosCursorSessionToken,
      });
      setSuccessMessage(
        `核销成功。订单 ${result.orderNo} 已核销 ${result.redeemedCount}/${result.totalCount} 个卡密，本次核销时间：${result.redeemedAt}`,
      );
      setCardCode("");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "核销失败");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="redeem-order-no"
            className="mb-2 block text-sm font-medium text-slate-900"
          >
            订单号
          </label>
          <input
            id="redeem-order-no"
            type="text"
            value={orderNo}
            onChange={(event) => setOrderNo(event.target.value)}
            placeholder="请输入邮件中的订单号"
            className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500"
          />
        </div>

        <div>
          <label
            htmlFor="redeem-session-token"
            className="mb-2 block text-sm font-medium text-slate-900"
          >
            WorkosCursorSessionToken
          </label>
          <input
            id="redeem-session-token"
            type="text"
            value={workosCursorSessionToken}
            onChange={(event) => setWorkosCursorSessionToken(event.target.value)}
            placeholder="请输入 WorkosCursorSessionToken"
            className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500"
          />
        </div>

        <div>
          <label
            htmlFor="redeem-card-code"
            className="mb-2 block text-sm font-medium text-slate-900"
          >
            卡密
          </label>
          <input
            id="redeem-card-code"
            type="text"
            value={cardCode}
            onChange={(event) => setCardCode(event.target.value.toUpperCase())}
            placeholder="请输入待核销卡密"
            className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-violet-400 to-violet-600 text-base font-semibold text-white shadow-[0_12px_30px_rgba(139,92,246,0.22)] transition hover:opacity-95 disabled:opacity-60"
        >
          {submitting ? "核销中..." : "立即核销"}
        </button>
      </form>

      {message ? <p className="mt-4 text-sm text-rose-500">{message}</p> : null}
      {successMessage ? (
        <div className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm leading-7 text-emerald-700">
          {successMessage}
        </div>
      ) : null}
    </>
  );
}
