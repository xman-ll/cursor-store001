import { Suspense } from "react";
import { RedeemForm } from "@/components/redeem-form";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function RedeemPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="border-b border-slate-200 pb-5">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
              卡密核销
            </h1>
            <p className="mt-3 text-sm leading-7 text-slate-500">
              请填写订单号、WorkosCursorSessionToken 和收到的卡密进行核销。系统会先校验卡密是否属于该订单，再调用 Cursor 接口完成最终核销。每个卡密仅可核销一次，核销成功后将立即作废。
            </p>
          </div>
          <Suspense fallback={<p className="mt-6 text-sm text-slate-500">正在加载核销表单...</p>}>
            <RedeemForm />
          </Suspense>
        </section>
      </main>
      <Footer />
    </div>
  );
}
