import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../store/taskSlice';
import { RootState } from '../store/store';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.tasks.searchQuery);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  return (
    <div className="relative flex-1">
      <Search 
        className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
          isDarkMode ? 'text-dark-muted' : 'text-light-muted'
        }`} 
        size={20} 
      />
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        className={`w-full pl-10 pr-4 py-2 rounded-lg border transition-colors ${
          isDarkMode
            ? 'bg-dark-secondary border-dark-muted text-dark-text placeholder-dark-muted'
            : 'bg-light-primary border-light-muted text-light-text placeholder-light-muted'
        } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
      />
    </div>
  );
}