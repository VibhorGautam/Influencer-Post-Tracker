import { Influencer } from '../types/influencer';

export const calculateTotalViews = (viewsMedian: number): number => {
  return viewsMedian * 5;
};

export const calculateCampaignTotalViews = (influencers: Influencer[]): number => {
  return influencers.reduce((total, influencer) => total + influencer.totalViews, 0);
};

export const calculateCampaignCurrentViews = (influencers: Influencer[]): number => {
  return influencers.reduce((total, influencer) => total + influencer.viewsNow, 0);
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toLocaleString();
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
