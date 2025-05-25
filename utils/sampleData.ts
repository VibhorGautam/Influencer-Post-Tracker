import { Influencer } from '../types/influencer';
import { generateId } from './calculations';

// Default campaign ID for sample data
const DEFAULT_CAMPAIGN_ID = 'default-campaign-id';

export const sampleInfluencers: Influencer[] = [
  {
    id: generateId(),
    username: '@joycecruz',
    profileLink: 'https://www.instagram.com/joycecruz',
    platform: 'Instagram',
    viewsMedian: 56400,
    totalViews: 282000,
    viewsNow: 78300,
    videoLinks: [
      'https://www.instagram.com/p/C2xYz1A2bcd/',
      'https://www.instagram.com/p/C2zAb3C4def/',
      'https://www.instagram.com/p/C31Cd5E6ghi/',
      'https://www.instagram.com/p/C33Ef7G8jkl/'
    ],
    videoTitles: [
      'Morning Routine with Brand Products',
      'Unboxing & First Impressions',
      'Day in My Life featuring Brand',
      'Final Review & Recommendations'
    ],
    postedOn: ['2025-01-04', '2025-01-08', '2025-01-12', '2025-01-16'],
    videoStatuses: ['Posted', 'Posted', 'Posted', 'Posted'],
    status: 'Posted',
    createdAt: new Date().toISOString(),
    campaignId: DEFAULT_CAMPAIGN_ID
  },
  {
    id: generateId(),
    username: '@kiki_mya_music',
    profileLink: 'https://www.instagram.com/kiki_mya_music',
    platform: 'Instagram',
    viewsMedian: 26000,
    totalViews: 130000,
    viewsNow: 42200,
    videoLinks: [
      'https://www.instagram.com/p/C2mNp1Q2rst/',
      'https://www.instagram.com/p/C2oRs3T4uvw/',
      '',
      ''
    ],
    videoTitles: [
      'Music Video Behind the Scenes',
      'Studio Session with Brand Gear',
      '',
      ''
    ],
    postedOn: ['2025-01-05', '2025-01-11', '', ''],
    videoStatuses: ['Posted', 'Posted', 'Script Needed', 'Script Needed'],
    status: 'Posted',
    createdAt: new Date().toISOString(),
    campaignId: DEFAULT_CAMPAIGN_ID
  },
  {
    id: generateId(),
    username: '@imbigz',
    profileLink: 'https://www.tiktok.com/@imbigz',
    platform: 'TikTok',
    viewsMedian: 16400,
    totalViews: 82000,
    viewsNow: 2548,
    videoLinks: [
      'https://www.tiktok.com/@imbigz/video/7321456789012345678',
      'https://www.tiktok.com/@imbigz/video/7321567890123456789',
      'https://www.tiktok.com/@imbigz/video/7321678901234567890',
      ''
    ],
    videoTitles: [
      'Brand Challenge Dance',
      'Product Review in 60 Seconds',
      'Before & After Transformation',
      ''
    ],
    postedOn: ['2025-01-05', '2025-01-09', '2025-01-13', ''],
    videoStatuses: ['Posted', 'Posted', 'Posted', 'Script Needed'],
    status: 'Posted',
    createdAt: new Date().toISOString(),
    campaignId: DEFAULT_CAMPAIGN_ID
  },
  {
    id: generateId(),
    username: '@anna_marie_1',
    profileLink: 'https://www.instagram.com/anna_marie_1',
    platform: 'Instagram',
    viewsMedian: 52600,
    totalViews: 263000,
    viewsNow: 31400,
    videoLinks: [
      'https://www.instagram.com/p/C2aBC1d2efg/',
      'https://www.instagram.com/p/C2cDE3f4hij/',
      'https://www.instagram.com/p/C2eFG5h6klm/',
      ''
    ],
    videoTitles: [
      'Get Ready With Me using Brand',
      'Honest Product Review',
      'Brand Integration in Daily Life',
      ''
    ],
    postedOn: ['2025-01-07', '2025-01-14', '2025-01-21', ''],
    videoStatuses: ['Posted', 'Posted', 'Posted', 'Script Needed'],
    status: 'Posted',
    createdAt: new Date().toISOString(),
    campaignId: DEFAULT_CAMPAIGN_ID
  },
  {
    id: generateId(),
    username: '@thehappycanuck',
    profileLink: 'https://www.instagram.com/thehappycanuck',
    platform: 'Instagram',
    viewsMedian: 7200,
    totalViews: 36000,
    viewsNow: 0,
    videoLinks: ['', '', '', ''],
    videoTitles: ['', '', '', ''],
    postedOn: ['', '', '', ''],
    videoStatuses: ['Script Needed', 'Script Needed', 'Script Needed', 'Script Needed'],
    status: 'Script Needed',
    createdAt: new Date().toISOString(),
    campaignId: DEFAULT_CAMPAIGN_ID
  },
  {
    id: generateId(),
    username: '@melheavenwalking',
    profileLink: 'https://www.instagram.com/melheavenwalking',
    platform: 'Instagram',
    viewsMedian: 17500,
    totalViews: 87500,
    viewsNow: 3725,
    videoLinks: ['https://www.instagram.com/p/video1', '', '', ''],
    videoTitles: ['Walking Tour with Brand Shoes', '', '', ''],
    postedOn: ['2025-01-14', '', '', ''],
    videoStatuses: ['Posted', 'Script Needed', 'Script Needed', 'Script Needed'],
    status: 'Posted',
    createdAt: new Date().toISOString(),
    campaignId: DEFAULT_CAMPAIGN_ID
  },
  {
    id: generateId(),
    username: '@daveyguide',
    profileLink: 'https://www.instagram.com/daveyguide',
    platform: 'Instagram',
    viewsMedian: 1300,
    totalViews: 6500,
    viewsNow: 0,
    videoLinks: ['', '', '', ''],
    videoTitles: ['', '', '', ''],
    postedOn: ['', '', '', ''],
    videoStatuses: ['Approve Needed', 'Approve Needed', 'Approve Needed', 'Approve Needed'],
    status: 'Approve Needed',
    createdAt: new Date().toISOString(),
    campaignId: DEFAULT_CAMPAIGN_ID
  },
  {
    id: generateId(),
    username: '@dafnefox_halfmoon',
    profileLink: 'https://www.tiktok.com/@dafnefox_halfmoon',
    platform: 'TikTok',
    viewsMedian: 42600,
    totalViews: 213000,
    viewsNow: 260000,
    videoLinks: ['https://www.tiktok.com/@dafnefox_halfmoon/video/1', '', '', ''],
    videoTitles: ['Brand Transformation Challenge', '', '', ''],
    postedOn: ['2025-01-25', '', '', ''],
    videoStatuses: ['Posted', 'Script Needed', 'Script Needed', 'Script Needed'],
    status: 'Posted',
    createdAt: new Date().toISOString(),
    campaignId: DEFAULT_CAMPAIGN_ID
  },
  {
    id: generateId(),
    username: '@tiffany.zuck',
    profileLink: 'https://www.instagram.com/tiffany.zuck',
    platform: 'Instagram',
    viewsMedian: 2400,
    totalViews: 12000,
    viewsNow: 0,
    videoLinks: ['', '', '', ''],
    videoTitles: ['', '', '', ''],
    postedOn: ['', '', '', ''],
    videoStatuses: ['Script Needed', 'Script Needed', 'Script Needed', 'Script Needed'],
    status: 'Script Needed',
    createdAt: new Date().toISOString(),
    campaignId: DEFAULT_CAMPAIGN_ID
  },
  {
    id: generateId(),
    username: '@crossplatform_creator',
    profileLink: 'https://linktr.ee/crossplatform_creator',
    platform: 'Both',
    viewsMedian: 45000,
    totalViews: 225000,
    viewsNow: 89500,
    videoLinks: [
      'https://www.instagram.com/p/C2xPQ1r2stu/',
      'https://www.tiktok.com/@crossplatform_creator/video/7321789012345678901',
      'https://www.instagram.com/p/C2zRS3t4vwx/',
      'https://www.tiktok.com/@crossplatform_creator/video/7321890123456789012'
    ],
    videoTitles: [
      'Instagram Reel: Brand Lifestyle',
      'TikTok: Quick Brand Tips',
      'Instagram: Product Showcase',
      'TikTok: Brand Challenge'
    ],
    postedOn: ['2025-01-10', '2025-01-10', '2025-01-17', '2025-01-17'],
    videoStatuses: ['Posted', 'Posted', 'Posted', 'Posted'],
    status: 'Posted',
    createdAt: new Date().toISOString(),
    campaignId: DEFAULT_CAMPAIGN_ID
  },
  {
    id: generateId(),
    username: '@multi_platform_star',
    profileLink: 'https://linktr.ee/multi_platform_star',
    platform: 'Both',
    viewsMedian: 28000,
    totalViews: 140000,
    viewsNow: 0,
    videoLinks: ['', '', '', ''],
    videoTitles: ['', '', '', ''],
    postedOn: ['', '', '', ''],
    videoStatuses: ['Approve Needed', 'Approve Needed', 'Approve Needed', 'Approve Needed'],
    status: 'Approve Needed',
    createdAt: new Date().toISOString(),
    campaignId: DEFAULT_CAMPAIGN_ID
  }
];

export const loadSampleData = () => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('influencer-tracker-data', JSON.stringify(sampleInfluencers));
  }
};
