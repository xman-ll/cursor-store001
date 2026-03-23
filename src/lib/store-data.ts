export type Category = {
  slug: string;
  name: string;
  summary: string;
  seoTitle: string;
  seoDescription: string;
};

export type Product = {
  slug: string;
  title: string;
  categorySlug: string;
  price: number;
  marketPrice: number;
  unit: string;
  badge: string;
  stock: number;
  sales: number;
  shortDescription: string;
  description: string;
  highlights: string[];
  heroLabel: string;
  seoTitle: string;
  seoDescription: string;
};

export const siteConfig = {
  name: "羽音购卡小铺",
  domain: "https://store.example.com",
  description:
    "专注 AI 工具会员、额度与插件服务的在线商城，提供简洁选购体验、清晰商品说明与适合搜索引擎收录的内容结构。",
  keywords: [
    "AI工具商城",
    "Cursor Ultra",
    "Cursor Pro",
    "Antigravity",
    "Windsurf",
    "AI会员购买",
    "AI插件商城",
  ],
};

export const categories: Category[] = [
  {
    slug: "all",
    name: "全部商品",
    summary: "汇总平台热门 AI 工具会员、积分、插件与接口服务。",
    seoTitle: "AI 工具商城首页",
    seoDescription: "浏览热门 AI 会员、Cursor 系列、Windsurf 积分和插件服务。",
  },
  {
    slug: "cursor-ultra",
    name: "Cursor Ultra",
    summary: "以20倍使用限额和高级功能优先访问权限，获取最大价值。",
    seoTitle: "Cursor Ultra 商品专区",
    seoDescription: "查看 Cursor Ultra 额度、保底方案和相关会员商品。",
  },
  {
    slug: "cursor-plugin",
    name: "Cursor 插件",
    summary: "覆盖对话增强、辅助编程与效率工具。",
    seoTitle: "Cursor 插件购买专区",
    seoDescription: "查看适配 Cursor 的对话插件、扩展服务与实用工具。",
  },
  {
    slug: "windsurf",
    name: "Windsurf",
    summary: "提供 Windsurf 试用积分与长期使用方案。",
    seoTitle: "Windsurf 试用与积分专区",
    seoDescription: "浏览 Windsurf 官方试用积分、月卡和相关服务。",
  },
  {
    slug: "api-service",
    name: "API 服务",
    summary: "适合开发接入与团队快速调用的 API 商品。",
    seoTitle: "AI API 接入服务专区",
    seoDescription: "查看 AI API 即开即用服务、额度包与稳定接入方案。",
  },
];

export const products: Product[] = [
  {
    slug: "antigravity-ultra-official",
    title: "Antigravity 反重力 官方 Ultra",
    categorySlug: "cursor-ultra",
    price: 145,
    marketPrice: 199,
    unit: "月",
    badge: "热门推荐",
    stock: 29,
    sales: 86,
    shortDescription: "适合高频编程场景，稳定、直达、开通快。",
    description:
      "面向重度 AI 编程用户的高频使用方案，突出稳定性、开通效率与清晰的交付说明。",
    highlights: [
      "支持高频使用场景",
      "商品说明清晰，适合新手下单",
      "简洁流程页，便于搜索引擎抓取",
    ],
    heroLabel: "A",
    seoTitle: "Antigravity 反重力官方 Ultra 购买",
    seoDescription:
      "购买 Antigravity 反重力官方 Ultra 方案，适合高频 AI 编程用户，页面说明清晰、下单流程简洁。",
  },
  {
    slug: "cursor-ultra-800",
    title: "Cursor 额度 800 刀",
    categorySlug: "cursor-ultra",
    price: 50,
    marketPrice: 69,
    unit: "份",
    badge: "高性价比",
    stock: 17,
    sales: 55,
    shortDescription: "适合阶段性使用与项目冲刺，开通快。",
    description:
      "以轻量额度包满足短周期开发或测试需求，突出即买即用和成本友好。",
    highlights: [
      "适合短周期项目",
      "额度型商品说明直观",
      "展示价格与适用人群",
    ],
    heroLabel: "C",
    seoTitle: "Cursor 额度 800 刀商品详情",
    seoDescription:
      "查看 Cursor 额度 800 刀商品详情，适合短期项目冲刺与灵活补充使用额度。",
  },
  {
    slug: "cursor-chat-plugin",
    title: "Cursor 对话插件",
    categorySlug: "cursor-plugin",
    price: 15,
    marketPrice: 19.5,
    unit: "月",
    badge: "新手友好",
    stock: 12,
    sales: 41,
    shortDescription: "增强对话体验，降低切换成本。",
    description:
      "提供更轻量的对话增强能力，适合希望在单一工作流中完成提问、生成与整理的用户。",
    highlights: [
      "适合对话增强需求",
      "页面结构简单易浏览",
      "支持独立详情页收录",
    ],
    heroLabel: "P",
    seoTitle: "Cursor 对话插件购买",
    seoDescription: "购买 Cursor 对话插件，适合提升 AI 对话效率与开发辅助体验。",
  },
  {
    slug: "windsurf-trial-100",
    title: "Windsurf 试用号 100 积分",
    categorySlug: "windsurf",
    price: 5,
    marketPrice: 9.9,
    unit: "次",
    badge: "低门槛体验",
    stock: 48,
    sales: 102,
    shortDescription: "适合先体验再决定长期使用。",
    description:
      "用于试用与轻量评估的 Windsurf 入门商品，适合新用户快速感受功能能力。",
    highlights: [
      "体验成本低",
      "适合第一次使用",
      "明确展示积分和适用范围",
    ],
    heroLabel: "W",
    seoTitle: "Windsurf 试用号 100 积分购买",
    seoDescription: "查看 Windsurf 试用号 100 积分商品，适合新用户低门槛体验。",
  },
  {
    slug: "cursor-ultra-400-assured",
    title: "Cursor Ultra 400 刀保底",
    categorySlug: "cursor-ultra",
    price: 200,
    marketPrice: 260,
    unit: "份",
    badge: "稳定方案",
    stock: 8,
    sales: 27,
    shortDescription: "适合注重稳定交付与使用保障的用户。",
    description:
      "主打保底与稳定使用场景，适用于对额度消耗有预期、对开通稳定性有要求的用户。",
    highlights: [
      "强调稳定交付",
      "适合中高频用户",
      "详情页可承接更多说明内容",
    ],
    heroLabel: "U",
    seoTitle: "Cursor Ultra 400 刀保底方案",
    seoDescription:
      "购买 Cursor Ultra 400 刀保底方案，适合重视稳定交付和可预期使用体验的用户。",
  },
  {
    slug: "cursor-api-ready",
    title: "Cursor API 导入即用",
    categorySlug: "api-service",
    price: 180,
    marketPrice: 240,
    unit: "500次",
    badge: "开发接入",
    stock: 35,
    sales: 64,
    shortDescription: "适合开发者快速接入，降低配置复杂度。",
    description:
      "面向有 API 调用需求的开发者与团队，突出快速接入、说明清晰和可复制的交付体验。",
    highlights: [
      "适合开发接入与测试",
      "突出快速可用",
      "适合长尾 SEO 关键词布局",
    ],
    heroLabel: "API",
    seoTitle: "Cursor API 导入即用服务",
    seoDescription:
      "查看 Cursor API 导入即用服务，适合需要快速接入 AI 能力的开发者和小团队。",
  },
];

export const faqList = [
  {
    question: "这个商城首页适合做 SEO 吗？",
    answer:
      "适合。页面采用服务端渲染结构、明确的语义化标题、独立分类页、商品详情页、站点地图和结构化数据，便于搜索引擎理解页面内容。",
  },
  {
    question: "为什么页面设计保持简洁？",
    answer:
      "简洁布局更利于首屏加载、用户浏览和搜索引擎抓取，也方便后续扩展商品、公告、评价和活动模块。",
  },
  {
    question: "商品页面是否支持独立收录？",
    answer:
      "支持。每个商品都拥有独立详情页、标题、描述和面向搜索引擎的结构化信息，便于形成长尾搜索流量。",
  },
];

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(slug: string) {
  if (slug === "all") {
    return products;
  }

  return products.filter((product) => product.categorySlug === slug);
}

export function formatPrice(price: number) {
  return `¥${price.toFixed(2)}`;
}
