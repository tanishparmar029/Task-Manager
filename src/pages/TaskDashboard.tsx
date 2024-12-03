import React, { useState } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import TaskFilters from '../components/TaskFilters';
import TaskStats from '../components/TaskStats';
import { Plus } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export default function TaskDashboard() {
  const [showAddTask, setShowAddTask] = useState(false);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-2xl font-bold ${
          isDarkMode ? 'text-dark-text' : 'text-light-text'
        }`}>
          Task Dashboard
        </h1>
        <button
          onClick={() => setShowAddTask(true)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            isDarkMode
              ? 'bg-dark-accent text-white hover:bg-opacity-90'
              : 'bg-light-accent text-white hover:bg-opacity-90'
          }`}
        >
          <Plus size={20} />
          Add Task
        </button>
      </div>

      <TaskStats />
      <TaskFilters />
      <TaskList />
      
      {showAddTask && (
        <TaskForm onClose={() => setShowAddTask(false)} />
      )}
    </div>
  );
}