'use client';

import { StatusType } from '../types/influencer';

interface StatusToggleFilterProps {
  currentFilter: StatusType | 'all';
  onFilterChange: (filter: StatusType | 'all') => void;
  className?: string;
}

const StatusToggleFilter: React.FC<StatusToggleFilterProps> = ({ 
  currentFilter, 
  onFilterChange, 
  className = '' 
}) => {
  const filters = [
    { value: 'all' as const, label: 'All', count: 0 },
    { value: 'Posted' as const, label: 'Posted', count: 0 },
    { value: 'Script Needed' as const, label: 'Script Needed', count: 0 },
    { value: 'Approve Needed' as const, label: 'Approve Needed', count: 0 },
    { value: 'Paid' as const, label: 'Paid', count: 0 }
  ];

  const getButtonClass = (filterValue: string) => {
    const baseClass = "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap";
    
    if (currentFilter === filterValue) {
      switch (filterValue) {
        case 'Posted':
          return `${baseClass} bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-sm`;
        case 'Script Needed':
          return `${baseClass} bg-red-100 text-red-800 border border-red-200 shadow-sm`;
        case 'Approve Needed':
          return `${baseClass} bg-amber-100 text-amber-800 border border-amber-200 shadow-sm`;
        case 'Paid':
          return `${baseClass} bg-green-100 text-green-800 border border-green-200 shadow-sm`;
        default:
          return `${baseClass} bg-blue-100 text-blue-800 border border-blue-200 shadow-sm`;
      }
    }
    
    return `${baseClass} bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200 hover:shadow-sm`;
  };

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={getButtonClass(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default StatusToggleFilter;
