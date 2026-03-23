import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="max-w-lg rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-sm">
        <p className="text-sm font-medium text-blue-700">404</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
          页面不存在
        </h1>
        <p className="mt-4 text-sm leading-7 text-slate-600">
          你访问的页面可能已下线或链接有误，可以返回首页继续浏览商品与分类页面。
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          返回首页
        </Link>
      </div>
    </div>
  );
}
