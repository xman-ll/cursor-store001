import {
  categories as fallbackCategories,
  getCategoryBySlug as getFallbackCategoryBySlug,
  getProductBySlug as getFallbackProductBySlug,
  getProductsByCategory as getFallbackProductsByCategory,
  products as fallbackProducts,
} from "@/lib/store-data";

export type StoreCategory = {
  id: string;
  name: string;
  slug: string;
  summary: string;
  seoTitle: string;
  seoDescription: string;
};

export type StoreProduct = {
  id: string;
  title: string;
  slug: string;
  categoryId: string;
  categorySlug: string;
  imageUrl: string | null;
  price: number;
  marketPrice: number;
  unit: string;
  badge: string;
  stock: number;
  sales: number;
  shortDescription: string;
  description: string;
  highlights: string[];
  purchaseGuideHtml: string;
  heroLabel: string;
  seoTitle: string;
  seoDescription: string;
};

export type SupportGroup = {
  id: string;
  groupName: string;
  groupNo: string;
  joinScheme: string;
  notice: string;
  status: "active" | "inactive";
};

export type StoreOrder = {
  id: string;
  orderNo: string;
  outTradeNo: string;
  buyerEmail: string;
  status: "pending" | "paid" | "delivered" | "closed";
  paymentStatus: "unpaid" | "paid" | "expired" | "failed" | "closed";
  totalAmount: number;
  productId: string;
  productTitleSnapshot: string;
  unitPriceSnapshot: number;
  quantity: number;
  paymentChannel: "alipay";
  qrCodeUrl: string | null;
  paymentCreatedAt: string | null;
  paymentExpireAt: string | null;
  alipayTradeNo: string | null;
  paymentNotifiedAt: string | null;
  paymentRawPayload: Record<string, string> | null;
  note: string;
  cardCodes: string[];
  redeemedCards: Array<{
    cardCode: string;
    redeemedAt: string;
  }>;
  emailDeliveryStatus: "pending" | "sent" | "failed";
  emailSentAt: string | null;
  emailError: string | null;
  createdAt: string;
  paidAt: string | null;
  deliveredAt: string | null;
  closedAt: string | null;
};

export type RedeemResult = {
  success: boolean;
  orderNo: string;
  cardCode: string;
  redeemedAt: string;
  redeemedCount: number;
  totalCount: number;
  note: string;
};

export type PaymentCreateResult = {
  orderNo: string;
  outTradeNo: string;
  qrCodeUrl: string | null;
  expireAt: string | null;
  paymentStatus: "unpaid" | "paid" | "expired" | "failed" | "closed";
  pollingInterval: number;
  error?: string;
};

export type PaymentStatusResult = {
  orderNo: string;
  outTradeNo: string;
  paymentStatus: "unpaid" | "paid" | "expired" | "failed" | "closed";
  status: "pending" | "paid" | "delivered" | "closed";
  qrCodeUrl: string | null;
  expireAt: string | null;
  closedAt: string | null;
  paidAt: string | null;
  deliveredAt: string | null;
  note: string;
  totalAmount: number;
};

const STORE_API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:3001";

type StoreRequestInit = RequestInit & {
  next?: {
    revalidate?: number;
  };
};

async function request<T>(path: string, init?: StoreRequestInit): Promise<T> {
  const response = await fetch(`${STORE_API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    cache: init?.method && init.method !== "GET" ? "no-store" : init?.cache,
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json() as Promise<T>;
}

function buildFallbackCategories(): StoreCategory[] {
  return fallbackCategories
    .filter((category) => category.slug !== "all")
    .map((category, index) => ({
      id: `fallback-category-${index + 1}`,
      ...category,
    }));
}

function buildFallbackProduct(product: (typeof fallbackProducts)[number]): StoreProduct {
  return {
    id: `fallback-product-${product.slug}`,
    title: product.title,
    slug: product.slug,
    categoryId: `fallback-${product.categorySlug}`,
    categorySlug: product.categorySlug,
    imageUrl: null,
    price: product.price,
    marketPrice: product.marketPrice,
    unit: product.unit,
    badge: product.badge,
    stock: product.stock,
    sales: product.sales,
    shortDescription: product.shortDescription,
    description: product.description,
    highlights: product.highlights,
    purchaseGuideHtml: [
      "<p>1. 选择适合的商品方案，确认价格与适用范围。</p>",
      "<p>2. 阅读商品描述、亮点和适用人群，再进入下单流程。</p>",
      "<p>3. 支付成功后请查收邮箱中的卡密与核销链接。</p>",
    ].join(""),
    heroLabel: product.heroLabel,
    seoTitle: product.seoTitle,
    seoDescription: product.seoDescription,
  };
}

export async function getStoreCategories() {
  try {
    return await request<StoreCategory[]>("/store/categories", {
      next: { revalidate: 60 },
    });
  } catch {
    return buildFallbackCategories();
  }
}

export async function getCategoryTabs() {
  const categories = await getStoreCategories();
  return [
    {
      id: "all",
      name: "全部商品",
      slug: "all",
      summary: "汇总平台热门 AI 工具会员、积分、插件与接口服务。",
      seoTitle: "AI 工具商城首页",
      seoDescription: "浏览热门 AI 会员、Cursor 系列、Windsurf 积分和插件服务。",
    },
    ...categories,
  ];
}

export async function getStoreProducts(categorySlug?: string) {
  try {
    const query = categorySlug ? `?categorySlug=${categorySlug}` : "";
    return await request<StoreProduct[]>(`/store/products${query}`, {
      next: { revalidate: 60 },
    });
  } catch {
    return (categorySlug
      ? getFallbackProductsByCategory(categorySlug)
      : fallbackProducts
    ).map(buildFallbackProduct);
  }
}

export async function getStoreProduct(slug: string) {
  try {
    return await request<StoreProduct>(`/store/products/${slug}`, {
      next: { revalidate: 60 },
    });
  } catch {
    const product = getFallbackProductBySlug(slug);
    return product ? buildFallbackProduct(product) : null;
  }
}

export async function getStoreCategoryBySlug(slug: string) {
  const categories = await getStoreCategories();
  const category = categories.find((item) => item.slug === slug);

  if (category) {
    return category;
  }

  const fallback = getFallbackCategoryBySlug(slug);
  return fallback
    ? {
        id: `fallback-category-${fallback.slug}`,
        ...fallback,
      }
    : null;
}

export async function createStoreOrder(payload: {
  productSlug: string;
  quantity: number;
  email: string;
  paymentChannel?: "alipay";
}) {
  return request<StoreOrder>("/store/orders", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function createStorePayment(payload: {
  productSlug: string;
  quantity: number;
  email: string;
  paymentChannel?: "alipay";
}) {
  return request<PaymentCreateResult>("/store/payments/create", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getStorePaymentStatus(orderNo: string) {
  return request<PaymentStatusResult>(`/store/payments/status/${orderNo}`, {
    method: "GET",
  });
}

export async function closeStorePayment(orderNo: string) {
  return request<PaymentStatusResult>(`/store/payments/close/${orderNo}`, {
    method: "POST",
  });
}

export async function queryStoreOrder(payload: {
  orderNo: string;
  email: string;
}) {
  return request<StoreOrder>("/store/orders/query", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function redeemStoreCard(payload: {
  orderNo: string;
  cardCode: string;
  workosCursorSessionToken: string;
}) {
  return request<RedeemResult>("/store/redeem", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getSupportGroup() {
  try {
    return await request<SupportGroup>("/store/support-group", {
      next: { revalidate: 60 },
    });
  } catch {
    const groupNo = "1093175908";
    return {
      id: "fallback-support-group",
      groupName: "售后交流群",
      groupNo,
      joinScheme: `mqqapi://card/show_pslcard?src_type=internal&version=1&uin=${groupNo}&card_type=group&source=qrcode`,
      notice: "加入我们的官方交流群获取资讯、优惠信息和技术支持。",
      status: "active" as const,
    };
  }
}
