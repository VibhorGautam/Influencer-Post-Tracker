'use client';

interface StatusFilterProps {
  currentFilter: string;
  onFilterChange: (filter: string) => void;
}

const StatusFilter: React.FC<StatusFilterProps> = ({ currentFilter, onFilterChange }) => {
  const filters = [
    { value: 'all', label: 'All' },
    { value: 'Posted', label: 'Posted' },
    { value: 'Script Needed', label: 'Script Needed' },
    { value: 'Approve Needed', label: 'Approve Needed' },
    { value: 'Paid', label: 'Paid' }
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
            currentFilter === filter.value
              ? 'bg-blue-600 text-white shadow-lg transform scale-105'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:shadow-md'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default StatusFilter;
