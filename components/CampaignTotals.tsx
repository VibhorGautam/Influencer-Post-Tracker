'use client';

import { Influencer } from '../types/influencer';
import { calculateCampaignTotalViews, calculateCampaignCurrentViews, formatNumber } from '../utils/calculations';
import { UsersIcon, EyeIcon, TrendingUpIcon, TargetIcon } from './Icons';

interface CampaignTotalsProps {
  influencers: Influencer[];
}

const CampaignTotals: React.FC<CampaignTotalsProps> = ({ influencers }) => {
  const totalViews = calculateCampaignTotalViews(influencers);
  const currentViews = calculateCampaignCurrentViews(influencers);
  const totalInfluencers = influencers.length;

  const statusCounts = influencers.reduce((acc, inf) => {
    acc[inf.status] = (acc[inf.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="card animate-fade-in">
      <div className="card-content">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Influencers */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-500 rounded-xl">
                <UsersIcon className="text-white" size={24} />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-700">{totalInfluencers}</div>
                <div className="text-sm font-medium text-blue-600">Total Influencers</div>
              </div>
            </div>
          </div>

          {/* Total Views */}
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 border border-emerald-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-500 rounded-xl">
                <TargetIcon className="text-white" size={24} />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-emerald-700">{formatNumber(totalViews)}</div>
                <div className="text-sm font-medium text-emerald-600">Expected Views</div>
              </div>
            </div>
          </div>

          {/* Current Views */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-500 rounded-xl">
                <EyeIcon className="text-white" size={24} />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-purple-700">{formatNumber(currentViews)}</div>
                <div className="text-sm font-medium text-purple-600">Current Views</div>
              </div>
            </div>
          </div>

          {/* Completion Rate */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 border border-amber-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-amber-500 rounded-xl">
                <TrendingUpIcon className="text-white" size={24} />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-amber-700">
                  {totalViews > 0 ? Math.round((currentViews / totalViews) * 100) : 0}%
                </div>
                <div className="text-sm font-medium text-amber-600">Completion Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Status Breakdown */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Status Breakdown</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200">
              <span className="text-sm font-semibold text-emerald-800">Posted</span>
              <span className="text-2xl font-bold text-emerald-700">{statusCounts['Posted'] || 0}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl border border-amber-200">
              <span className="text-sm font-semibold text-amber-800">Approve Needed</span>
              <span className="text-2xl font-bold text-amber-700">{statusCounts['Approve Needed'] || 0}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-xl border border-red-200">
              <span className="text-sm font-semibold text-red-800">Script Needed</span>
              <span className="text-2xl font-bold text-red-700">{statusCounts['Script Needed'] || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignTotals;
