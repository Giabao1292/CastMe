export type CampaignStatus = "Active" | "Draft" | "Completed";

export interface CampaignItem {
  id: string;
  name: string;
  brand: string;
  productImageUrl: string;
  productImageAlt: string;
  budget: number;
  kolCount: number;
  progress: number;
  status: CampaignStatus;
  goal: string;
  duration: string;
  basePayPerKol: number;
  bonusPerSale: number;
  views: number;
  sales: number;
}

export interface KolCampaignPerformance {
  id: string;
  name: string;
  avatar: string;
  platform: "TikTok" | "Instagram" | "YouTube";
  videoLink: string;
  views: number;
  sales: number;
  status: "Pending" | "Completed" | "Paid";
}

export interface DiscoveryKol {
  id: string;
  name: string;
  avatar: string;
  platform: "TikTok" | "Instagram" | "YouTube";
  niche: "Beauty" | "Food" | "Fashion";
  followers: number;
  avgViews: number;
  engagementRate: number;
  country: string;
}

export const campaignsData: CampaignItem[] = [
  {
    id: "cmp-1",
    name: "Velvet Lip Launch Wave 1",
    brand: "Ari Beauty",
    productImageUrl:
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=1000&q=80",
    productImageAlt: "Velvet lipstick product set",
    budget: 18000000,
    kolCount: 14,
    progress: 72,
    status: "Active",
    goal: "Sell 1,000 lipstick units",
    duration: "Mar 01 - Mar 31, 2026",
    basePayPerKol: 500000,
    bonusPerSale: 10000,
    views: 420000,
    sales: 648,
  },
  {
    id: "cmp-2",
    name: "Serum 14-Day Result Challenge",
    brand: "GlowLab",
    productImageUrl:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1000&q=80",
    productImageAlt: "Skincare serum bottle close-up",
    budget: 24000000,
    kolCount: 18,
    progress: 61,
    status: "Active",
    goal: "Generate 2,500 product trial sign-ups",
    duration: "Feb 20 - Apr 10, 2026",
    basePayPerKol: 600000,
    bonusPerSale: 8000,
    views: 610000,
    sales: 920,
  },
  {
    id: "cmp-3",
    name: "Spring Capsule Collection Drop",
    brand: "Mode House",
    productImageUrl:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80",
    productImageAlt: "Fashion capsule clothing rack",
    budget: 15000000,
    kolCount: 9,
    progress: 35,
    status: "Draft",
    goal: "Reach 300,000 views before launch date",
    duration: "Apr 05 - Apr 30, 2026",
    basePayPerKol: 550000,
    bonusPerSale: 9000,
    views: 98000,
    sales: 124,
  },
  {
    id: "cmp-4",
    name: "Gaming New Season Hype",
    brand: "NovaPlay",
    productImageUrl:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1000&q=80",
    productImageAlt: "Mobile gaming campaign artwork",
    budget: 22000000,
    kolCount: 20,
    progress: 100,
    status: "Completed",
    goal: "Drive 8,000 app installs",
    duration: "Jan 10 - Feb 28, 2026",
    basePayPerKol: 700000,
    bonusPerSale: 12000,
    views: 970000,
    sales: 1760,
  },
];

export const monthlyViews = [
  { month: "Oct", views: 230000 },
  { month: "Nov", views: 260000 },
  { month: "Dec", views: 310000 },
  { month: "Jan", views: 355000 },
  { month: "Feb", views: 430000 },
  { month: "Mar", views: 520000 },
] as const;

export const recentActivities = [
  {
    id: "act-1",
    type: "Invited KOL",
    detail:
      "Minh Anh (@minhanh.beauty) invited to Serum 14-Day Result Challenge",
    time: "10 min ago",
  },
  {
    id: "act-2",
    type: "KOL submitted video",
    detail: "Linh Tran submitted TikTok video for Velvet Lip Launch Wave 1",
    time: "1 hour ago",
  },
  {
    id: "act-3",
    type: "Payment completed",
    detail: "Payment of 2,200,000 VND sent for Gaming New Season Hype",
    time: "Today, 09:14",
  },
] as const;

export const campaignKols: Record<string, KolCampaignPerformance[]> = {
  "cmp-1": [
    {
      id: "k1",
      name: "Linh Tran",
      avatar: "LT",
      platform: "TikTok",
      videoLink: "tiktok.com/@linhtran/video/9041",
      views: 82000,
      sales: 156,
      status: "Paid",
    },
    {
      id: "k2",
      name: "Bao Chau",
      avatar: "BC",
      platform: "Instagram",
      videoLink: "instagram.com/reel/VELVET-004",
      views: 56000,
      sales: 94,
      status: "Completed",
    },
    {
      id: "k3",
      name: "Mai Thu",
      avatar: "MT",
      platform: "TikTok",
      videoLink: "tiktok.com/@maithu/video/2391",
      views: 37000,
      sales: 52,
      status: "Pending",
    },
  ],
  "cmp-2": [
    {
      id: "k4",
      name: "Gia Han",
      avatar: "GH",
      platform: "TikTok",
      videoLink: "tiktok.com/@giahan/video/8432",
      views: 93000,
      sales: 180,
      status: "Paid",
    },
    {
      id: "k5",
      name: "Trang Le",
      avatar: "TL",
      platform: "YouTube",
      videoLink: "youtube.com/watch?v=serumreview4",
      views: 74000,
      sales: 124,
      status: "Completed",
    },
  ],
};

export const discoveryKols: DiscoveryKol[] = [
  {
    id: "d1",
    name: "Ngoc Yen",
    avatar: "NY",
    platform: "TikTok",
    niche: "Beauty",
    followers: 185000,
    avgViews: 62000,
    engagementRate: 6.4,
    country: "Vietnam",
  },
  {
    id: "d2",
    name: "Duc Pham",
    avatar: "DP",
    platform: "YouTube",
    niche: "Food",
    followers: 98000,
    avgViews: 41000,
    engagementRate: 5.1,
    country: "Vietnam",
  },
  {
    id: "d3",
    name: "Luna Hoang",
    avatar: "LH",
    platform: "Instagram",
    niche: "Fashion",
    followers: 260000,
    avgViews: 54000,
    engagementRate: 4.8,
    country: "Vietnam",
  },
  {
    id: "d4",
    name: "An Nhi",
    avatar: "AN",
    platform: "TikTok",
    niche: "Beauty",
    followers: 72000,
    avgViews: 28000,
    engagementRate: 7.2,
    country: "Vietnam",
  },
];
