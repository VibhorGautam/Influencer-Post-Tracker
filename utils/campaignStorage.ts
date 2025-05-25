import { Campaign, Influencer } from '../types/influencer';
import { generateId } from './calculations';

const CAMPAIGNS_STORAGE_KEY = 'influencer-tracker-campaigns';
const ACTIVE_CAMPAIGN_KEY = 'influencer-tracker-active-campaign';
const INFLUENCERS_STORAGE_KEY = 'influencer-tracker-data';

// Campaign Management
export const loadCampaigns = (): Campaign[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const stored = localStorage.getItem(CAMPAIGNS_STORAGE_KEY);
    if (!stored) {
      return [];
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error loading campaigns from localStorage:', error);
    return [];
  }
};

export const saveCampaigns = (campaigns: Campaign[]): void => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(CAMPAIGNS_STORAGE_KEY, JSON.stringify(campaigns));
  } catch (error) {
    console.error('Error saving campaigns to localStorage:', error);
  }
};

export const createCampaign = (name: string, description?: string): Campaign => {
  const campaign: Campaign = {
    id: generateId(),
    name,
    description,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isActive: true
  };

  const campaigns = loadCampaigns();
  campaigns.push(campaign);
  saveCampaigns(campaigns);

  return campaign;
};

export const updateCampaign = (campaignId: string, updates: Partial<Campaign>): Campaign | null => {
  const campaigns = loadCampaigns();
  const campaignIndex = campaigns.findIndex(c => c.id === campaignId);

  if (campaignIndex === -1) {
    return null;
  }

  campaigns[campaignIndex] = {
    ...campaigns[campaignIndex],
    ...updates,
    updatedAt: new Date().toISOString()
  };

  saveCampaigns(campaigns);
  return campaigns[campaignIndex];
};

export const deleteCampaign = (campaignId: string): boolean => {
  const campaigns = loadCampaigns();
  const filteredCampaigns = campaigns.filter(c => c.id !== campaignId);

  if (filteredCampaigns.length === campaigns.length) {
    return false; // Campaign not found
  }

  saveCampaigns(filteredCampaigns);

  // Also delete all influencers in this campaign
  const influencers = loadInfluencersForCampaign('all');
  const filteredInfluencers = influencers.filter(inf => inf.campaignId !== campaignId);
  saveInfluencersForCampaign(filteredInfluencers);

  // If this was the active campaign, clear active campaign
  if (getActiveCampaignId() === campaignId) {
    clearActiveCampaign();
  }

  return true;
};

// Active Campaign Management
export const getActiveCampaignId = (): string | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return localStorage.getItem(ACTIVE_CAMPAIGN_KEY);
  } catch (error) {
    console.error('Error getting active campaign:', error);
    return null;
  }
};

export const setActiveCampaign = (campaignId: string): void => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(ACTIVE_CAMPAIGN_KEY, campaignId);
  } catch (error) {
    console.error('Error setting active campaign:', error);
  }
};

export const clearActiveCampaign = (): void => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.removeItem(ACTIVE_CAMPAIGN_KEY);
  } catch (error) {
    console.error('Error clearing active campaign:', error);
  }
};

export const getActiveCampaign = (): Campaign | null => {
  const campaignId = getActiveCampaignId();
  if (!campaignId) {
    return null;
  }

  const campaigns = loadCampaigns();
  return campaigns.find(c => c.id === campaignId) || null;
};

// Enhanced Influencer Management with Campaign Support
export const loadInfluencersForCampaign = (campaignId: string): Influencer[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const stored = localStorage.getItem(INFLUENCERS_STORAGE_KEY);
    if (!stored) {
      return [];
    }

    const allInfluencers: Influencer[] = JSON.parse(stored);

    if (campaignId === 'all') {
      return allInfluencers;
    }

    return allInfluencers.filter(inf => inf.campaignId === campaignId);
  } catch (error) {
    console.error('Error loading influencers from localStorage:', error);
    return [];
  }
};

export const saveInfluencersForCampaign = (influencers: Influencer[]): void => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(INFLUENCERS_STORAGE_KEY, JSON.stringify(influencers));
  } catch (error) {
    console.error('Error saving influencers to localStorage:', error);
  }
};

export const addInfluencerToCampaign = (influencer: Omit<Influencer, 'campaignId'>, campaignId: string): Influencer => {
  const newInfluencer: Influencer = {
    ...influencer,
    campaignId
  };

  const allInfluencers = loadInfluencersForCampaign('all');
  allInfluencers.push(newInfluencer);
  saveInfluencersForCampaign(allInfluencers);

  return newInfluencer;
};

export const updateInfluencerInCampaign = (influencerId: string, updates: Partial<Influencer>): Influencer | null => {
  const allInfluencers = loadInfluencersForCampaign('all');
  const influencerIndex = allInfluencers.findIndex(inf => inf.id === influencerId);

  if (influencerIndex === -1) {
    return null;
  }

  allInfluencers[influencerIndex] = {
    ...allInfluencers[influencerIndex],
    ...updates
  };

  saveInfluencersForCampaign(allInfluencers);
  return allInfluencers[influencerIndex];
};

export const deleteInfluencerFromCampaign = (influencerId: string): boolean => {
  const allInfluencers = loadInfluencersForCampaign('all');
  const filteredInfluencers = allInfluencers.filter(inf => inf.id !== influencerId);

  if (filteredInfluencers.length === allInfluencers.length) {
    return false; // Influencer not found
  }

  saveInfluencersForCampaign(filteredInfluencers);
  return true;
};

// Migration function to add campaignId to existing influencers
export const migrateLegacyData = (): void => {
  const campaigns = loadCampaigns();

  // Create default campaign if none exist
  if (campaigns.length === 0) {
    const defaultCampaign = createCampaign('My First Campaign', 'Welcome to your influencer tracker!');
    setActiveCampaign(defaultCampaign.id);

    // Update all existing influencers to belong to default campaign
    const allInfluencers = loadInfluencersForCampaign('all');
    const updatedInfluencers = allInfluencers.map(inf => ({
      ...inf,
      campaignId: inf.campaignId || defaultCampaign.id
    }));

    saveInfluencersForCampaign(updatedInfluencers);
  }
};
