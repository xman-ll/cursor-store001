"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";
import {
  closeStorePayment,
  getStorePaymentStatus,
  type PaymentCreateResult,
} from "@/lib/store-api";

type PaymentModalProps = {
  payment: PaymentCreateResult;
  amount: number;
  onClose: () => void;
  onPaid: (message: string) => void;
};

function formatCountdown(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export function PaymentModal({
  payment,
  amount,
  onClose,
  onPaid,
}: PaymentModalProps) {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("");
  const [statusText, setStatusText] = useState("等待支付");
  const [remainingMs, setRemainingMs] = useState(
    payment.expireAt ? new Date(payment.expireAt).getTime() - Date.now() : 0,
  );
  const [closing, setClosing] = useState(false);

  const countdown = useMemo(() => formatCountdown(remainingMs), [remainingMs]);

  useEffect(() => {
    let cancelled = false;

    async function generateQrCode() {
      if (!payment.qrCodeUrl) return;
      const dataUrl = await QRCode.toDataURL(payment.qrCodeUrl, {
        margin: 1,
        width: 220,
      });
      if (!cancelled) {
        setQrCodeDataUrl(dataUrl);
      }
    }

    void generateQrCode();

    return () => {
      cancelled = true;
    };
  }, [payment.qrCodeUrl]);

  useEffect(() => {
    if (!payment.expireAt) return;

    const timer = window.setInterval(() => {
      const nextRemaining = new Date(payment.expireAt as string).getTime() - Date.now();
      setRemainingMs(nextRemaining);
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [payment.expireAt]);

  useEffect(() => {
    if (remainingMs > 0) return;
    if (closing) return;

    let cancelled = false;

    async function expireOrder() {
      try {
        setClosing(true);
        const result = await closeStorePayment(payment.orderNo);
        if (!cancelled) {
          setStatusText(
            result.paymentStatus === "expired"
              ? "订单已超时关闭，请重新下单"
              : result.note,
          );
        }
      } catch {
        if (!cancelled) {
          setStatusText("订单超时，请关闭弹窗后重新下单");
        }
      }
    }

    void expireOrder();

    return () => {
      cancelled = true;
    };
  }, [closing, payment.orderNo, remainingMs]);

  useEffect(() => {
    const interval = window.setInterval(async () => {
      try {
        const result = await getStorePaymentStatus(payment.orderNo);

        if (result.paymentStatus === "paid" || result.status === "delivered") {
          window.clearInterval(interval);
          onPaid("支付成功，卡密和核销链接将发送到你的邮箱。");
          return;
        }

        if (result.paymentStatus === "expired" || result.paymentStatus === "closed") {
          window.clearInterval(interval);
          setStatusText(result.note);
        }
      } catch {
        setStatusText("支付状态查询失败，请稍后重试");
      }
    }, payment.pollingInterval || 3000);

    return () => {
      window.clearInterval(interval);
    };
  }, [onPaid, payment.orderNo, payment.pollingInterval]);

  async function handleManualClose() {
    try {
      setClosing(true);
      await closeStorePayment(payment.orderNo);
    } finally {
      onClose();
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-6 shadow-2xl sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-violet-600">支付宝支付</p>
            <h3 className="mt-2 text-2xl font-bold text-slate-950">请在 10 分钟内完成支付</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
          >
            关闭
          </button>
        </div>

        <div className="mt-6 rounded-3xl bg-slate-50 p-5 text-sm text-slate-600">
          <p>订单号：{payment.orderNo}</p>
          <p className="mt-2">应付金额：¥{amount.toFixed(2)}</p>
          <p className="mt-2">剩余时间：{countdown}</p>
          <p className="mt-2 text-violet-600">{statusText}</p>
        </div>

        <div className="mt-6 flex justify-center">
          {qrCodeDataUrl ? (
            <Image
              src={qrCodeDataUrl}
              alt="支付宝支付二维码"
              width={220}
              height={220}
              unoptimized
              className="h-[220px] w-[220px] rounded-2xl border border-slate-200 bg-white p-3"
            />
          ) : (
            <div className="flex h-[220px] w-[220px] items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-sm text-slate-500">
              正在生成支付二维码...
            </div>
          )}
        </div>

        <p className="mt-4 text-center text-sm leading-7 text-slate-500">
          请使用支付宝扫码支付。支付成功后系统会自动发送卡密和核销链接到你的邮箱。
        </p>

        <button
          type="button"
          onClick={() => void handleManualClose()}
          className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-2xl border border-slate-200 text-sm font-medium text-slate-700 transition hover:border-slate-300"
        >
          取消支付
        </button>
      </div>
    </div>
  );
}
