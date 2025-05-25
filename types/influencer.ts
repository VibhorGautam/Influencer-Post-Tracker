export interface Influencer {
  id: string;
  username: string;
  profileLink: string;
  platform: 'Instagram' | 'TikTok' | 'Both';
  viewsMedian: number;
  totalViews: number; // auto-calculated: viewsMedian * 5
  viewsNow: number;
  videoLinks: [string, string, string, string]; // 4 video URLs
  videoTitles: [string, string, string, string]; // 4 video titles/descriptions
  postedOn: [string, string, string, string]; // 4 dates (ISO strings)
  videoStatuses: [StatusType, StatusType, StatusType, StatusType]; // 4 video statuses
  status: StatusType; // Overall influencer status
  createdAt: string; // ISO string
  campaignId: string; // Reference to campaign
}

export interface Campaign {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export type InfluencerFormData = Omit<Influencer, 'id' | 'totalViews' | 'createdAt' | 'campaignId'>;

export type StatusType = 'Posted' | 'Script Needed' | 'Approve Needed' | 'Paid';
export type PlatformType = 'Instagram' | 'TikTok' | 'Both';

export type SortDirection = 'asc' | 'desc';
export type SortField = 'username' | 'platform' | 'viewsMedian' | 'totalViews' | 'viewsNow' | 'status' | 'createdAt';

export interface TableFilters {
  search: string;
  platform: PlatformType | 'all';
  status: StatusType | 'all';
  viewsMedianMin?: number;
  viewsMedianMax?: number;
  totalViewsMin?: number;
  totalViewsMax?: number;
  viewsNowMin?: number;
  viewsNowMax?: number;
  dateFrom?: string;
  dateTo?: string;
}

export interface TableSort {
  field: SortField;
  direction: SortDirection;
}
