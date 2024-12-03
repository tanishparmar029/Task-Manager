import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, setSearchQuery } from '../store/taskSlice';
import { RootState } from '../store/store';
import { Search, ListTodo, CheckSquare, Clock, AlertCircle } from 'lucide-react';

export default function TaskFilters() {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state: RootState) => state.tasks.filter);
  const searchQuery = useSelector((state: RootState) => state.tasks.searchQuery);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const filters = [
    { value: 'all', label: 'All Tasks', icon: ListTodo },
    { value: 'pending', label: 'Pending', icon: Clock },
    { value: 'completed', label: 'Completed', icon: CheckSquare },
    { value: 'overdue', label: 'Overdue', icon: AlertCircle },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
      <div className="relative flex-1 w-full">
        <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
          isDarkMode ? 'text-dark-muted' : 'text-light-muted'
        }`} size={20} />
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          className={`w-full pl-10 pr-4 py-2 rounded-lg border transition-colors ${
            isDarkMode
              ? 'bg-dark-primary border-dark-muted text-dark-text placeholder-dark-muted'
              : 'bg-light-primary border-light-muted text-light-text placeholder-light-muted'
          } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
        />
      </div>
      
      <div className="flex flex-wrap gap-2 w-full sm:w-auto">
        {filters.map((filter) => {
          const Icon = filter.icon;
          return (
            <button
              key={filter.value}
              onClick={() => dispatch(setFilter(filter.value as any))}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex-1 sm:flex-initial justify-center ${
                currentFilter === filter.value
                  ? isDarkMode
                    ? 'bg-dark-accent text-white'
                    : 'bg-light-accent text-white'
                  : isDarkMode
                    ? 'bg-dark-primary text-dark-text hover:bg-dark-muted'
                    : 'bg-light-primary text-light-text hover:bg-light-secondary'
              }`}
            >
              <Icon size={16} />
              {filter.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}