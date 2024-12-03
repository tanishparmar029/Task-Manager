import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export default function Layout() {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-dark-primary text-dark-text'
        : 'bg-light-secondary text-light-text'
    }`}>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}