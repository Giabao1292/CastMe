export interface PromoSlide {
  id: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
}

export interface JobItem {
  id: string;
  postedAt: string;
  title: string;
  metadata: string;
  description: string;
  campaignImageUrl?: string;
  campaignImageAlt?: string;
  tags: string[];
  proposals: string;
  location: string;
  paymentVerified: boolean;
  rating: number;
}

export interface ProfileSummary {
  name: string;
  title: string;
  completion: number;
}

export type SearchScope = "Jobs" | "Talent";

export interface TalentProfile {
  id: string;
  name: string;
  headline: string;
  portraitImageUrl: string;
  avatarImageUrl: string;
  imageAlt: string;
  location: string;
  hourlyRate: string;
  earned: string;
  jobSuccess: number;
  availability: string;
  bio: string;
  skills: string[];
  badges: string[];
  audience: string;
  platforms: string[];
}
