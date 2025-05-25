import { Influencer } from '../types/influencer';

const STORAGE_KEY = 'influencer-tracker-data';

export const loadInfluencers = (): Influencer[] => {
  if (typeof window === 'undefined') {
    return [];
  }
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [];
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error loading influencers from localStorage:', error);
    return [];
  }
};

export const saveInfluencers = (influencers: Influencer[]): void => {
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(influencers));
  } catch (error) {
    console.error('Error saving influencers to localStorage:', error);
  }
};

export const clearInfluencers = (): void => {
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing influencers from localStorage:', error);
  }
};
