import type {
  JobItem,
  ProfileSummary,
  PromoSlide,
  TalentProfile,
} from "./types";

export const promoSlides: PromoSlide[] = [
  {
    id: "boosted-proposals",
    title: "Get hired faster",
    subtitle:
      "Boosted Proposals first place winners see up to 2X increase in hires",
    ctaLabel: "Learn how",
  },
  {
    id: "expert-vetted",
    title: "Stand out in search",
    subtitle:
      "Expert-Vetted talent appears earlier in relevant client searches",
    ctaLabel: "Explore now",
  },
  {
    id: "profile-upgrade",
    title: "Upgrade your profile",
    subtitle:
      "Profiles with strong introductions receive more invites every week",
    ctaLabel: "Improve profile",
  },
  {
    id: "skills-test",
    title: "Show skill credibility",
    subtitle:
      "Verified assessments make it easier for clients to trust your expertise",
    ctaLabel: "Take assessment",
  },
];

export const jobsData: JobItem[] = [
  {
    id: "job-1",
    postedAt: "Posted 5 hours ago",
    title: "KOC Needed for Skincare Product Review Campaign",
    metadata: "Fixed price: $180 - Intermediate - Est. Time: 1 week",
    description:
      "We are launching a new vitamin C serum and need KOC creators in Vietnam to produce authentic short-form review videos. The deliverables include 2 TikTok videos, 1 story set, and clear CTA to product page.",
    campaignImageUrl:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
    campaignImageAlt: "Skincare serum campaign preview",
    tags: ["KOC", "TikTok", "Beauty Review", "UGC"],
    proposals: "20 to 50",
    location: "Vietnam",
    paymentVerified: true,
    rating: 5,
  },
  {
    id: "job-2",
    postedAt: "Posted yesterday",
    title: "Gaming KOL for Mobile RPG Launch (SEA Market)",
    metadata:
      "Hourly: $25 - $45 - Expert - Est. Time: Less than 1 month, 10-15 hrs/week",
    description:
      "We are looking for gaming KOLs to promote a new mobile RPG. Scope includes gameplay highlights, livestream session, and one conversion-focused short video. Experience in game community engagement is required.",
    campaignImageUrl:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
    campaignImageAlt: "Mobile game promotion preview",
    tags: ["Gaming KOL", "Livestream", "Mobile Game", "Community"],
    proposals: "10 to 15",
    location: "Singapore",
    paymentVerified: true,
    rating: 5,
  },
  {
    id: "job-3",
    postedAt: "Posted 2 days ago",
    title: "Fashion KOL Collaboration for New Collection Drop",
    metadata: "Fixed price: $350 - Intermediate - Est. Time: 2 weeks",
    description:
      "A local fashion brand needs 3 KOL creators for collection launch content: outfit reel, mirror styling video, and 1 product-feature carousel. Priority for creators with strong female audience in HCM/Hanoi.",
    campaignImageUrl:
      "https://images.unsplash.com/photo-1463100099107-aa0980c362e6?auto=format&fit=crop&w=1200&q=80",
    campaignImageAlt: "Fashion campaign preview",
    tags: ["Fashion KOL", "Instagram Reels", "Styling", "Campaign Launch"],
    proposals: "5 to 10",
    location: "Vietnam",
    paymentVerified: true,
    rating: 4,
  },
];

export const profileSummary: ProfileSummary = {
  name: "GiaBao T.",
  title: "Website Development",
  completion: 80,
};

export const jobTabs = ["Best Matches", "Most Recent", "Saved Jobs"] as const;

export const talentProfiles: TalentProfile[] = [
  {
    id: "talent-1",
    name: "Linh Tran",
    headline: "Beauty KOL | Campaign Creator | Livestream Host",
    portraitImageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCGrU28fGt_oqQmctLX8cqU1ZrVSqFCDHkEV34fbdcnIRZj5QC6QuvEIwlX7-dgcm5qr2Z7a82roUL9OMIjNoQ2j6TvL1Qtlv80797UD61UySvQ4Q-GEnMN2NF1Wk2g_x3KkgcJgf43o_YaanmjrPAO69ZZ_4Xrc3vr_OWSTZLuN8GNSGAGNn97jVpW-nvh0raAOhyyx6mMu-lMej6Bfx0cuAymEsPQTFz4dobsSOQbfd3BtLVABDJREgRwOQErN94aBY2kvBMy",
    avatarImageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAVZkIwgpFTkA9jL5VIVCSxySRgctp-Lx9D7oE8fjQ05pP2jcxeLFC9XfoU88BYv8NYpeVOXUtFdeScFAfvZGgEDWPB86wS31QrRp50Jrrr-XHKGo9UIILfDbsEkyiUQa7W1uTxNBz3Fri4ZNkkBliUSJUfgrPcN67kteLHJx-PXd3ITKd9ynskUd39NniunO5KQUCL3A7gQn58RMXVTiPXIgflbpvCLa6w_tzlfLFn0ZyZ4umJYEbU9o8QraoOEGb_TLhp6SRW",
    imageAlt: "Minimalist portrait style",
    location: "Ho Chi Minh City, Vietnam",
    hourlyRate: "$35/hr",
    earned: "$18K+ earned",
    jobSuccess: 98,
    availability: "Available now",
    bio: "KOL specialized in beauty and skincare campaigns. I create conversion-focused short-form content and can host high-energy livestream launches.",
    skills: [
      "TikTok",
      "Instagram Reels",
      "Beauty Review",
      "UGC Video",
      "Live Commerce",
    ],
    badges: ["Top Rated KOL", "Fast delivery"],
    audience: "420K followers",
    platforms: ["TikTok", "Instagram"],
  },
  {
    id: "talent-2",
    name: "Minh Nguyen",
    headline: "KOC Reviewer | Product Seeding | Conversion Clips",
    portraitImageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBj59Ada5Zei6JZTqoIv1hr1y2YnRvryxPMFhKdZsarIvxYYwhrk6ngQvUDSkyKxQwlWtCO-IQHjB2uicud4VKFaL7vmIsf8aKu257l4XY3bhZJQBMNLfXWGPwsTvJHPQy0yQrNupOUPD8hxX2Kg_sTHcmyDb3H9CrhyHdLMDKw9RW9CaCFm8qZ6GmxyldE-jpd_E9rHIFbkmIsBcjlW25rZVakEpYkdx1oykgAXkCMc0lAcmlE_K13A-zWu5_ZqwWwng5GP1lG",
    avatarImageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAeRHdAcDwTFEax9lF75OhqHjJAFuGTlgz78G0selKyNGFhw3MwGGA8ArYA1QeQccw0nbCZ-Gryv-odhcte205Rzv5srZbBOibG8NScqebmjID--IyhK101VPEbAdjaZZqaPXRnk1H-Ki6gVLyhRXHxNXYTmeASgeNfSPTh6lrjtRcfuKEXtj0u7ug5dU69_iDaIMUzW3vk0xyy_WX9CK65oXTciT5lxTjqAVvkgOfXVB9TALw1q2LCGQYN3GbhkpxPs7YShLH0",
    imageAlt: "Vintage aesthetic portrait",
    location: "Hanoi, Vietnam",
    hourlyRate: "$22/hr",
    earned: "$9K+ earned",
    jobSuccess: 96,
    availability: "Available this week",
    bio: "KOC focused on authentic review content for FMCG and beauty products. Strong at seeding workflows and measurable CTR in paid boosting.",
    skills: [
      "KOC Review",
      "Product Seeding",
      "Affiliate",
      "Short Video",
      "Scriptwriting",
    ],
    badges: ["High CTR content", "Reliable communication"],
    audience: "130K followers",
    platforms: ["TikTok", "Facebook"],
  },
  {
    id: "talent-3",
    name: "An Studio Nails",
    headline: "Nail Salon Partner | Trend Design | Promo Collaboration",
    portraitImageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCsjzp-wrKakoDnjjYr4LYGAWBdHteegZMHMWdo_NzexrMCIcjrRbNle4oxnMR5gErCk3XzF-eIYyMY9HQbWg1Ih9I_SsD6OR57h41_otGKC_dtDGMWw6XK2gCptorK1BHpGMGx3WE9hy4xvHxPr6bbrdkOSBbH1bqlxJApUN1XH9JaNKrY-UUhYrFGkaYa7MA7PTe1XdAJJUSiUUwfILxsqvbbvJie1UuYOs1nv391CsEn2P3CtVHeEX_UJlvThFRcvn3qhUuW",
    avatarImageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAWJ8LKTKLfHrddqU74Kte0Z-1H8TgobudhRG0pGUi2s8oPr_-_JU8-jiPz0iynXJNFAs7N9xIjL3yz5UvWw2sv3SeGqa8mxFVszVcNo4lYwoZ95APaqQPeaU4ctvnP6HUe4rTSbnXSVrv2s5M4Twbg__kpJiSzQ7ZwBzD3nbqSCyv8MGTBUWQkMhtKIE6WQWLqlIgfOweRvqYZJrHkwEN_pwvqTsNVlY04bfAZhnUirJgGobAZEx---HAPErjRnTLGzI-X62-f",
    imageAlt: "Y2K portrait style",
    location: "Da Nang, Vietnam",
    hourlyRate: "$28/hr",
    earned: "$12K+ earned",
    jobSuccess: 99,
    availability: "Open to brand collab",
    bio: "Premium nail studio supporting local campaign shoots and co-branded promotions. Ideal for beauty brand activation and influencer events.",
    skills: [
      "Nail Art",
      "Campaign Partner",
      "Studio Setup",
      "Beauty Event",
      "UGC Space",
    ],
    badges: ["Brand-safe studio", "Event ready"],
    audience: "45K community reach",
    platforms: ["Instagram", "Facebook"],
  },
  {
    id: "talent-4",
    name: "Gia Bao",
    headline: "Model + Makeup Creative | Fashion & Commercial",
    portraitImageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCPnkNWQ1ZtNqAr9VurRdVUwXEG65t8W6du4Kced2ZXOj0lsbXO-BGTRPJHMnKty2J1VSuZtDdOpF428mNOY4BFqWPrMKQqkMh45KkpEyr5K4CH0P0wC095DZwaUJLzDBBfLPBi9HAcFlY2O-ads819dIi19w7lHWVQav2n7XX79HOVBq44cnQbTU_bmmv3Gi85UU8e2hFpUEFw_itiXOrU0ye1bdLHRl9-mOUAp79OC2S6h3fKfwrVav2G2ZqoUvtftwhSR9N2",
    avatarImageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAe_6jsofs8w69-jgfI6y85rt-FTXHVSkWsaM050V2E3p_aVIV7M6XsQ9BX9qL1GS1yDiQs8ylBa3gWOJ0D82QuVS9GdSz4l25yrMO19Y4zwb8rAVrkeHk7F9rZqn9pfp3szfmiXiTlKcDQd1MMN_93zIbq9nAGAux8mv-fkBSAQuwqM2CDL3aIvcrrp6jbinnZ5S2Si1WFI3kOGJRtbtOtrdrSZm_13IWSAKQPrAELi_s5aNvPe9b_sRepzJ2--Dts4NdmLaPH",
    imageAlt: "Urban streetwear portrait",
    location: "Ho Chi Minh City, Vietnam",
    hourlyRate: "$40/hr",
    earned: "$25K+ earned",
    jobSuccess: 97,
    availability: "Bookable in 48h",
    bio: "Model and makeup creative for fashion, lifestyle, and product visuals. Experienced in campaign moodboards, styling, and brand storytelling.",
    skills: [
      "Modeling",
      "Makeup",
      "Lookbook",
      "Brand Photoshoot",
      "Commercial Video",
    ],
    badges: ["Premium visual quality", "Creative direction"],
    audience: "210K followers",
    platforms: ["Instagram", "TikTok", "YouTube"],
  },
];
