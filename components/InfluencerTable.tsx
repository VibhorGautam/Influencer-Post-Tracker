'use client';

import React, { useState } from 'react';
import { Influencer, StatusType, TableSort, SortField, SortDirection } from '../types/influencer';
import { formatNumber } from '../utils/calculations';
import { InstagramIcon, TikTokIcon, BothPlatformsIcon, ExternalLinkIcon, DeleteIcon, VideoIcon, ChevronUpIcon, ChevronDownIcon } from './Icons';
import InlineEdit from './InlineEdit';
import VideoDetails from './VideoDetails';

interface InfluencerTableProps {
  influencers: Influencer[];
  onUpdate: (id: string, updates: Partial<Influencer>) => void;
  onDelete: (id: string) => void;
  sort: TableSort;
  onSortChange: (sort: TableSort) => void;
}

const InfluencerTable: React.FC<InfluencerTableProps> = ({
  influencers,
  onUpdate,
  onDelete,
  sort,
  onSortChange
}) => {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRowExpansion = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const handleSort = (field: SortField) => {
    const direction: SortDirection =
      sort.field === field && sort.direction === 'asc' ? 'desc' : 'asc';
    onSortChange({ field, direction });
  };

  const getSortIcon = (field: SortField) => {
    if (sort.field !== field) {
      return <ChevronUpIcon className="opacity-30" size={14} />;
    }
    return sort.direction === 'asc' ?
      <ChevronUpIcon size={14} /> :
      <ChevronDownIcon size={14} />;
  };



  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Instagram':
        return InstagramIcon;
      case 'TikTok':
        return TikTokIcon;
      case 'Both':
        return BothPlatformsIcon;
      default:
        return InstagramIcon;
    }
  };

  const getPlatformBadgeClass = (platform: string) => {
    switch (platform) {
      case 'Instagram':
        return 'platform-instagram';
      case 'TikTok':
        return 'platform-tiktok';
      case 'Both':
        return 'platform-both';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  if (influencers.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-slate-500 text-lg font-medium">No influencers found</div>
        <div className="text-slate-400 text-sm mt-2">Add your first influencer to get started</div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200">
      <table className="table-modern">
        <thead className="table-header">
          <tr>
            <th className="table-header-cell w-16 sm:w-20">
              <span className="text-xs text-slate-500 font-medium hidden sm:inline">Details</span>
              <span className="text-xs text-slate-500 font-medium sm:hidden">•••</span>
            </th>
            <th className="table-header-cell table-cell-username">
              <button
                onClick={() => handleSort('username')}
                className="flex items-center gap-1 hover:text-slate-900 transition-colors"
              >
                <span className="hidden sm:inline">Influencer</span>
                <span className="sm:hidden">User</span>
                {getSortIcon('username')}
              </button>
            </th>
            <th className="table-header-cell table-cell-platform hidden sm:table-cell">
              <button
                onClick={() => handleSort('platform')}
                className="flex items-center gap-2 hover:text-slate-900 transition-colors"
              >
                Platform
                {getSortIcon('platform')}
              </button>
            </th>
            <th className="table-header-cell table-cell-views hidden lg:table-cell">
              <button
                onClick={() => handleSort('viewsMedian')}
                className="flex items-center gap-1 hover:text-slate-900 transition-colors"
              >
                <span className="hidden xl:inline">Views Median</span>
                <span className="xl:hidden">Median</span>
                {getSortIcon('viewsMedian')}
              </button>
            </th>
            <th className="table-header-cell table-cell-views hidden md:table-cell">
              <button
                onClick={() => handleSort('totalViews')}
                className="flex items-center gap-1 hover:text-slate-900 transition-colors"
              >
                <span className="hidden xl:inline">Total Views</span>
                <span className="xl:hidden">Total</span>
                {getSortIcon('totalViews')}
              </button>
            </th>
            <th className="table-header-cell table-cell-views">
              <button
                onClick={() => handleSort('viewsNow')}
                className="flex items-center gap-1 hover:text-slate-900 transition-colors"
              >
                <span className="hidden sm:inline">Views Now</span>
                <span className="sm:hidden">Now</span>
                {getSortIcon('viewsNow')}
              </button>
            </th>
            <th className="table-header-cell table-cell-status">
              <button
                onClick={() => handleSort('status')}
                className="flex items-center gap-1 hover:text-slate-900 transition-colors"
              >
                Status
                {getSortIcon('status')}
              </button>
            </th>
            <th className="table-header-cell hidden lg:table-cell">
              Videos
            </th>
            <th className="table-header-cell table-cell-actions">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {influencers.map((influencer) => {
            const PlatformIcon = getPlatformIcon(influencer.platform);
            const isExpanded = expandedRows.has(influencer.id);
            const statusOptions = [
              { value: 'Posted', label: 'Posted' },
              { value: 'Approve Needed', label: 'Approve Needed' },
              { value: 'Script Needed', label: 'Script Needed' },
              { value: 'Paid', label: 'Paid' }
            ];

            return (
              <React.Fragment key={influencer.id}>
                {/* Main Row */}
                <tr className="table-row expandable-row">
                  {/* Expand/Collapse Toggle */}
                  <td className="table-cell">
                    <button
                      onClick={() => toggleRowExpansion(influencer.id)}
                      className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-all duration-200 ${
                        isExpanded
                          ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                      title={isExpanded ? 'Hide video details' : 'View video details'}
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUpIcon size={14} />
                          <span className="hidden sm:inline">Hide</span>
                        </>
                      ) : (
                        <>
                          <ChevronDownIcon size={14} />
                          <span className="hidden sm:inline">View</span>
                        </>
                      )}
                    </button>
                  </td>

                  {/* Influencer Info */}
                  <td className="table-cell">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">
                        {influencer.username}
                      </div>
                      <div className="text-sm text-slate-500">
                        <a
                          href={influencer.profileLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <ExternalLinkIcon size={12} />
                          View Profile
                        </a>
                      </div>
                    </div>
                  </td>

                  {/* Platform */}
                  <td className="table-cell">
                    <span className={`platform-badge ${getPlatformBadgeClass(influencer.platform)} inline-flex items-center gap-1`}>
                      <PlatformIcon size={14} />
                      {influencer.platform}
                    </span>
                  </td>

                  {/* Views Median */}
                  <td className="table-cell">
                    <span className="font-medium text-slate-900">
                      {formatNumber(influencer.viewsMedian)}
                    </span>
                  </td>

                  {/* Total Views */}
                  <td className="table-cell">
                    <span className="font-bold text-slate-900">
                      {formatNumber(influencer.totalViews)}
                    </span>
                  </td>

                  {/* Views Now - Inline Editable */}
                  <td className="table-cell">
                    <InlineEdit
                      value={influencer.viewsNow}
                      onSave={(value) => onUpdate(influencer.id, { viewsNow: Number(value) })}
                      type="number"
                      placeholder="0"
                    />
                  </td>

                  {/* Status - Inline Editable */}
                  <td className="table-cell">
                    <InlineEdit
                      value={influencer.status}
                      onSave={(value) => onUpdate(influencer.id, { status: value as StatusType })}
                      type="select"
                      options={statusOptions}
                    />
                  </td>

                  {/* Videos Summary - Hidden on mobile, shown on larger screens */}
                  <td className="table-cell hidden lg:table-cell">
                    <div className="flex items-center gap-2">
                      <VideoIcon size={16} className="text-slate-400" />
                      <span className="text-sm font-medium text-slate-900">
                        {influencer.videoLinks.filter(link => link).length}/4
                      </span>
                      <span className="text-xs text-slate-500">posted</span>
                      {influencer.videoLinks.filter(link => link).length > 0 && (
                        <span className="text-xs text-blue-600 font-medium">
                          (click View to see details)
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="table-cell">
                    <div className="flex flex-col sm:flex-row gap-2">
                      {/* Mark as Paid button - only show for Posted status */}
                      {influencer.status === 'Posted' && (
                        <button
                          onClick={() => onUpdate(influencer.id, { status: 'Paid' as StatusType })}
                          className="inline-flex items-center gap-1 px-2 py-1 text-xs text-green-700 bg-green-50 hover:bg-green-100 border border-green-200 rounded-md transition-all duration-200"
                          title="Mark as paid"
                        >
                          <span className="text-green-600">💰</span>
                          <span className="hidden sm:inline">Mark Paid</span>
                          <span className="sm:hidden">Paid</span>
                        </button>
                      )}

                      {/* Delete button */}
                      <button
                        onClick={() => onDelete(influencer.id)}
                        className="inline-flex items-center gap-1 px-2 py-1 text-xs text-red-600 hover:text-red-800 hover:bg-red-50 border border-red-200 rounded-md transition-all duration-200"
                        title="Delete influencer"
                      >
                        <DeleteIcon size={12} />
                        <span className="hidden sm:inline">Delete</span>
                        <span className="sm:hidden">Del</span>
                      </button>
                    </div>
                  </td>
                </tr>

                {/* Expandable Row */}
                {isExpanded && (
                  <tr>
                    <td colSpan={9} className="expanded-content">
                      <VideoDetails
                        influencer={influencer}
                        onUpdate={(updates) => onUpdate(influencer.id, updates)}
                      />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default InfluencerTable;
