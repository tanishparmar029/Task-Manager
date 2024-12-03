import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { format } from 'date-fns';
import { ArrowLeft, Calendar, CheckCircle, Circle } from 'lucide-react';

export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const task = useSelector((state: RootState) => 
    state.tasks.tasks.find(t => t.id === id)
  );

  if (!task) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Task not found</p>
        <button
          onClick={() => navigate('/tasks')}
          className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Tasks
        </button>
      </div>
    );
  }

  return (
    <div className={`max-w-2xl mx-auto ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
      <button
        onClick={() => navigate('/tasks')}
        className="mb-6 inline-flex items-center text-blue-600 hover:text-blue-700"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Tasks
      </button>

      <div className={`rounded-lg p-6 ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } shadow-lg`}>
        <div className="flex items-center gap-4 mb-4">
          {task.completed ? (
            <CheckCircle className="text-green-500" size={24} />
          ) : (
            <Circle className="text-gray-400" size={24} />
          )}
          <h1 className="text-2xl font-bold">{task.title}</h1>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {task.description || 'No description provided'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Calendar size={20} className="text-blue-500" />
            <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Due: {format(new Date(task.dueDate), 'PPP')}
            </span>
          </div>

          <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Created: {format(new Date(task.createdAt), 'PPP')}
          </div>
        </div>
      </div>
    </div>
  );
}