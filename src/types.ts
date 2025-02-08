export interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'influencer' | 'ambassador' | 'pro';
  avatar?: string;
}

export interface Merchant extends User {
  role: 'client';
  companyName: string;
  shopifyDomain: string;
  shopifyAccessToken?: string;
}

export interface Influencer extends User {
  role: 'influencer';
  followers: number;
  platforms: Platform[];
  categories: string[];
  description: string;
  engagementRate: number;
  rating: number;
  reviewCount: number;
  completedCampaigns: number;
}

export interface Ambassador extends User {
    _id: string;
    clerkId: string;
    name: string;
    email: string;
    roles: string[]; // Peut inclure "ambassador" et d'autres rôles éventuels
    socialMediaLinks: SocialMedia[];
    categories: string[];
    description: string;
    avatar: string;
    rating: number;
    reviewCount: number;
    completedCampaigns: number;
    createdAt: string; // ISO string format
    subscription: {
      status: "trial" | "active" | "expired";
    };
}

export interface Professional extends User {
  role: 'pro';
  followers: number;
  platforms: Platform[];
  categories: string[];
  description: string;
  engagementRate: number;
  rating: number;
  reviewCount: number;
  completedCampaigns: number;
}
export interface SocialMedia {
  metrics: {
    followers: number;
    following: number;
    engagement: number;
    likes: number;
    posts: number;
    lastUpdated: string; // ISO string format for date
  };
  _id: string;
  userId: string;
  platform: "tiktok" | "instagram" | "shopify" | "youtube";
  platformUserId: string;
  username: string;
  profilePictureUrl: string;
  bio: string;
  status: "active" | "expired" | "revoked";
  createdAt: string; // ISO string format for date
}


export interface Platform {
  name: 'Instagram' | 'TikTok' | 'YouTube' | 'Twitter';
  followers: number;
  handle: string;
}

export interface Campaign {
  id: string;
  clientId: string;
  influencerId: string;
  status: 'pending' | 'active' | 'completed';
  amount: number;
  startDate: Date;
  endDate?: Date;
  description: string;
}