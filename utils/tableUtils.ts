import { Influencer, TableFilters, TableSort } from '../types/influencer';

export const filterInfluencers = (influencers: Influencer[], filters: TableFilters): Influencer[] => {
  return influencers.filter(influencer => {
    // Search filter
    if (filters.search && !influencer.username.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }

    // Platform filter
    if (filters.platform !== 'all' && influencer.platform !== filters.platform) {
      return false;
    }

    // Status filter
    if (filters.status !== 'all' && influencer.status !== filters.status) {
      return false;
    }

    // Views Median range filter
    if (filters.viewsMedianMin !== undefined && influencer.viewsMedian < filters.viewsMedianMin) {
      return false;
    }
    if (filters.viewsMedianMax !== undefined && influencer.viewsMedian > filters.viewsMedianMax) {
      return false;
    }

    // Total Views range filter
    if (filters.totalViewsMin !== undefined && influencer.totalViews < filters.totalViewsMin) {
      return false;
    }
    if (filters.totalViewsMax !== undefined && influencer.totalViews > filters.totalViewsMax) {
      return false;
    }

    // Current Views range filter
    if (filters.viewsNowMin !== undefined && influencer.viewsNow < filters.viewsNowMin) {
      return false;
    }
    if (filters.viewsNowMax !== undefined && influencer.viewsNow > filters.viewsNowMax) {
      return false;
    }

    // Date range filter
    if (filters.dateFrom || filters.dateTo) {
      const postedDates = influencer.postedOn.filter(date => date);
      
      if (postedDates.length === 0) {
        // If no posted dates and date filter is active, exclude this influencer
        return false;
      }

      const hasDateInRange = postedDates.some(dateStr => {
        const date = new Date(dateStr);
        
        if (filters.dateFrom) {
          const fromDate = new Date(filters.dateFrom);
          if (date < fromDate) return false;
        }
        
        if (filters.dateTo) {
          const toDate = new Date(filters.dateTo);
          if (date > toDate) return false;
        }
        
        return true;
      });

      if (!hasDateInRange) {
        return false;
      }
    }

    return true;
  });
};

export const sortInfluencers = (influencers: Influencer[], sort: TableSort): Influencer[] => {
  return [...influencers].sort((a, b) => {
    let aValue: any;
    let bValue: any;

    switch (sort.field) {
      case 'username':
        aValue = a.username.toLowerCase();
        bValue = b.username.toLowerCase();
        break;
      case 'platform':
        aValue = a.platform;
        bValue = b.platform;
        break;
      case 'viewsMedian':
        aValue = a.viewsMedian;
        bValue = b.viewsMedian;
        break;
      case 'totalViews':
        aValue = a.totalViews;
        bValue = b.totalViews;
        break;
      case 'viewsNow':
        aValue = a.viewsNow;
        bValue = b.viewsNow;
        break;
      case 'status':
        // Custom sort order for status
        const statusOrder = { 'Script Needed': 0, 'Approve Needed': 1, 'Posted': 2 };
        aValue = statusOrder[a.status];
        bValue = statusOrder[b.status];
        break;
      case 'createdAt':
        aValue = new Date(a.createdAt);
        bValue = new Date(b.createdAt);
        break;
      default:
        return 0;
    }

    // Handle comparison
    let comparison = 0;
    if (aValue < bValue) {
      comparison = -1;
    } else if (aValue > bValue) {
      comparison = 1;
    }

    return sort.direction === 'desc' ? -comparison : comparison;
  });
};

export const applyTableFiltersAndSort = (
  influencers: Influencer[], 
  filters: TableFilters, 
  sort: TableSort
): Influencer[] => {
  const filtered = filterInfluencers(influencers, filters);
  return sortInfluencers(filtered, sort);
};
