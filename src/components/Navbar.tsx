import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Sun, Moon, CheckSquare } from 'lucide-react';
import { toggleTheme } from '../store/themeSlice';
import { RootState } from '../store/store';

export default function Navbar() {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  return (
    <nav className={`${
      isDarkMode 
        ? 'bg-dark-secondary border-dark-muted'
        : 'bg-light-primary border-gray-200'
    } shadow-lg transition-colors duration-300 border-b`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <CheckSquare className={`h-6 w-6 ${
              isDarkMode ? 'text-dark-accent' : 'text-light-accent'
            }`} />
            <span className="font-bold text-xl">Task Manager</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link
              to="/tasks"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isDarkMode
                  ? 'text-dark-text hover:text-white hover:bg-dark-muted'
                  : 'text-light-text hover:text-black hover:bg-light-secondary'
              }`}
            >
              Tasks
            </Link>
            
            <button
              onClick={() => dispatch(toggleTheme())}
              className={`p-2 rounded-full transition-colors ${
                isDarkMode
                  ? 'text-dark-text hover:text-white hover:bg-dark-muted'
                  : 'text-light-muted hover:text-light-text hover:bg-light-secondary'
              }`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun size={20} className="text-dark-accent" />
              ) : (
                <Moon size={20} className="text-light-accent" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}