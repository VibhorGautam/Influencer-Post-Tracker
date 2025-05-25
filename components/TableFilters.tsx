'use client';

import { useState } from 'react';
import { TableFilters, PlatformType, StatusType } from '../types/influencer';
import { SearchIcon, FilterIcon, XIcon, CalendarIcon } from './Icons';

interface TableFiltersProps {
  filters: TableFilters;
  onFiltersChange: (filters: TableFilters) => void;
}

const TableFiltersComponent: React.FC<TableFiltersProps> = ({ filters, onFiltersChange }) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const updateFilter = (key: keyof TableFilters, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      platform: 'all',
      status: 'all',
      viewsMedianMin: undefined,
      viewsMedianMax: undefined,
      totalViewsMin: undefined,
      totalViewsMax: undefined,
      viewsNowMin: undefined,
      viewsNowMax: undefined,
      dateFrom: undefined,
      dateTo: undefined
    });
  };

  const hasActiveFilters = () => {
    return filters.search !== '' ||
           filters.platform !== 'all' ||
           filters.status !== 'all' ||
           filters.viewsMedianMin !== undefined ||
           filters.viewsMedianMax !== undefined ||
           filters.totalViewsMin !== undefined ||
           filters.totalViewsMax !== undefined ||
           filters.viewsNowMin !== undefined ||
           filters.viewsNowMax !== undefined ||
           filters.dateFrom !== undefined ||
           filters.dateTo !== undefined;
  };

  return (
    <div className="space-y-4">
      {/* Basic Filters Row */}
      <div className="flex flex-wrap gap-4 items-center">
        {/* Search */}
        <div className="flex-1 min-w-64">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search by username..."
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-slate-900 placeholder-slate-600"
            />
          </div>
        </div>

        {/* Platform Filter */}
        <div className="min-w-32">
          <select
            value={filters.platform}
            onChange={(e) => updateFilter('platform', e.target.value as PlatformType | 'all')}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-slate-900 appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: 'right 0.5rem center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1.5em 1.5em',
              paddingRight: '2.5rem'
            }}
          >
            <option value="all">All Platforms</option>
            <option value="Instagram">Instagram</option>
            <option value="TikTok">TikTok</option>
            <option value="Both">Both</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="min-w-36">
          <select
            value={filters.status}
            onChange={(e) => updateFilter('status', e.target.value as StatusType | 'all')}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-slate-900 appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: 'right 0.5rem center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1.5em 1.5em',
              paddingRight: '2.5rem'
            }}
          >
            <option value="all">All Statuses</option>
            <option value="Posted">Posted</option>
            <option value="Approve Needed">Approve Needed</option>
            <option value="Script Needed">Script Needed</option>
            <option value="Paid">Paid</option>
          </select>
        </div>

        {/* Advanced Filters Toggle */}
        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
            showAdvancedFilters || hasActiveFilters()
              ? 'bg-blue-50 border-blue-200 text-blue-700'
              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <FilterIcon size={16} />
          Advanced
        </button>

        {/* Clear Filters */}
        {hasActiveFilters() && (
          <button
            onClick={clearFilters}
            className="inline-flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <XIcon size={16} />
            Clear
          </button>
        )}
      </div>

      {/* Advanced Filters Panel */}
      {showAdvancedFilters && (
        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">Advanced Filters</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Views Median Range */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Views Median Range
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.viewsMedianMin || ''}
                  onChange={(e) => updateFilter('viewsMedianMin', e.target.value ? parseInt(e.target.value) : undefined)}
                  className="flex-1 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-slate-900 placeholder-slate-600"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.viewsMedianMax || ''}
                  onChange={(e) => updateFilter('viewsMedianMax', e.target.value ? parseInt(e.target.value) : undefined)}
                  className="flex-1 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-slate-900 placeholder-slate-600"
                />
              </div>
            </div>

            {/* Total Views Range */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Total Views Range
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.totalViewsMin || ''}
                  onChange={(e) => updateFilter('totalViewsMin', e.target.value ? parseInt(e.target.value) : undefined)}
                  className="flex-1 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-slate-900 placeholder-slate-600"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.totalViewsMax || ''}
                  onChange={(e) => updateFilter('totalViewsMax', e.target.value ? parseInt(e.target.value) : undefined)}
                  className="flex-1 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-slate-900 placeholder-slate-600"
                />
              </div>
            </div>

            {/* Current Views Range */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Current Views Range
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.viewsNowMin || ''}
                  onChange={(e) => updateFilter('viewsNowMin', e.target.value ? parseInt(e.target.value) : undefined)}
                  className="flex-1 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-slate-900 placeholder-slate-600"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.viewsNowMax || ''}
                  onChange={(e) => updateFilter('viewsNowMax', e.target.value ? parseInt(e.target.value) : undefined)}
                  className="flex-1 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-slate-900 placeholder-slate-600"
                />
              </div>
            </div>

            {/* Date Range */}
            <div className="md:col-span-2 lg:col-span-3">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Posted Date Range
              </label>
              <div className="flex gap-4 items-center">
                <div className="flex-1">
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="date"
                      value={filters.dateFrom || ''}
                      onChange={(e) => updateFilter('dateFrom', e.target.value || undefined)}
                      className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-slate-900"
                    />
                  </div>
                </div>
                <span className="text-slate-500">to</span>
                <div className="flex-1">
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="date"
                      value={filters.dateTo || ''}
                      onChange={(e) => updateFilter('dateTo', e.target.value || undefined)}
                      className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-slate-900"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableFiltersComponent;
