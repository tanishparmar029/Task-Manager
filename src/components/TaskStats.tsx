import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { isPast } from 'date-fns';

export default function TaskStats() {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const stats = {
    total: tasks.length,
    completed: tasks.filter(task => task.completed).length,
    pending: tasks.filter(task => !task.completed).length,
    overdue: tasks.filter(task => !task.completed && isPast(new Date(task.dueDate))).length,
  };

  const statItems = [
    {
      label: 'Total Tasks',
      value: stats.total,
      icon: Clock,
      color: isDarkMode ? 'text-blue-400' : 'text-blue-600',
    },
    {
      label: 'Completed',
      value: stats.completed,
      icon: CheckCircle,
      color: isDarkMode ? 'text-green-400' : 'text-green-600',
    },
    {
      label: 'Overdue',
      value: stats.overdue,
      icon: AlertCircle,
      color: isDarkMode ? 'text-red-400' : 'text-red-600',
    },
  ];

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 ${
      isDarkMode ? 'text-dark-text' : 'text-light-text'
    }`}>
      {statItems.map((item) => (
        <div
          key={item.label}
          className={`p-4 rounded-lg ${
            isDarkMode ? 'bg-dark-secondary' : 'bg-light-primary'
          } shadow-md`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${
                isDarkMode ? 'text-dark-muted' : 'text-light-muted'
              }`}>
                {item.label}
              </p>
              <p className="text-2xl font-bold mt-1">{item.value}</p>
            </div>
            <item.icon className={`${item.color} h-8 w-8`} />
          </div>
        </div>
      ))}
    </div>
  );
}