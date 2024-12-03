import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, updateTask } from '../store/taskSlice';
import { Task } from '../types/task';
import { X, Calendar, Type, AlignLeft } from 'lucide-react';
import { RootState } from '../store/store';

interface TaskFormProps {
  task?: Task;
  onClose: () => void;
}

export default function TaskForm({ task, onClose }: TaskFormProps) {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [dueDate, setDueDate] = useState(task?.dueDate?.split('T')[0] || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const taskData: Task = {
      id: task?.id || crypto.randomUUID(),
      title,
      description,
      dueDate: new Date(dueDate).toISOString(),
      completed: task?.completed || false,
      createdAt: task?.createdAt || new Date().toISOString(),
    };

    if (task) {
      dispatch(updateTask(taskData));
    } else {
      dispatch(addTask(taskData));
    }
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`rounded-xl p-6 w-full max-w-md relative transition-colors ${
        isDarkMode ? 'bg-dark-secondary' : 'bg-light-primary'
      }`}>
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-lg transition-colors ${
            isDarkMode 
              ? 'text-dark-muted hover:text-dark-text hover:bg-dark-muted'
              : 'text-light-muted hover:text-light-text hover:bg-light-secondary'
          }`}
        >
          <X size={20} />
        </button>
        
        <h2 className="text-xl font-semibold mb-6">
          {task ? 'Edit Task' : 'Add New Task'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`flex items-center gap-2 text-sm font-medium mb-2 ${
              isDarkMode ? 'text-dark-text' : 'text-light-text'
            }`}>
              <Type size={16} />
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                isDarkMode
                  ? 'bg-dark-primary border-dark-muted text-dark-text'
                  : 'bg-light-secondary border-light-muted text-light-text'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              required
            />
          </div>
          
          <div>
            <label className={`flex items-center gap-2 text-sm font-medium mb-2 ${
              isDarkMode ? 'text-dark-text' : 'text-light-text'
            }`}>
              <AlignLeft size={16} />
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                isDarkMode
                  ? 'bg-dark-primary border-dark-muted text-dark-text'
                  : 'bg-light-secondary border-light-muted text-light-text'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              rows={3}
            />
          </div>
          
          <div>
            <label className={`flex items-center gap-2 text-sm font-medium mb-2 ${
              isDarkMode ? 'text-dark-text' : 'text-light-text'
            }`}>
              <Calendar size={16} />
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                isDarkMode
                  ? 'bg-dark-primary border-dark-muted text-dark-text'
                  : 'bg-light-secondary border-light-muted text-light-text'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              required
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                isDarkMode
                  ? 'bg-dark-muted text-dark-text hover:bg-opacity-80'
                  : 'bg-light-secondary text-light-text hover:bg-gray-200'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${
                isDarkMode
                  ? 'bg-dark-accent hover:bg-opacity-90'
                  : 'bg-light-accent hover:bg-opacity-90'
              }`}
            >
              {task ? 'Update Task' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}