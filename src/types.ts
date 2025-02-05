export interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'influencer';
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