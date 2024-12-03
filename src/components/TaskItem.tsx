import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { format, isPast } from 'date-fns';
import { Pencil, Trash2, CheckCircle, Circle, ArrowRight, GripVertical, Clock } from 'lucide-react';
import { Task } from '../types/task';
import { toggleTaskComplete, deleteTask } from '../store/taskSlice';
import { RootState } from '../store/store';
import TaskForm from './TaskForm';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isOverdue = !task.completed && isPast(new Date(task.dueDate));

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className={`rounded-xl shadow-md p-4 transition-all duration-300 transform hover:scale-[1.01] ${
          isDarkMode 
            ? 'bg-dark-secondary hover:bg-opacity-80'
            : 'bg-light-primary hover:bg-light-secondary'
        } ${task.completed ? 'opacity-75' : ''} ${
          isDragging ? 'shadow-lg ring-2 ring-blue-500' : ''
        }`}
      >
        <div className="flex items-start gap-4">
          <button
            {...attributes}
            {...listeners}
            className={`mt-1 cursor-grab active:cursor-grabbing ${
              isDarkMode ? 'text-dark-muted' : 'text-light-muted'
            } hover:opacity-80`}
          >
            <GripVertical size={20} />
          </button>

          <button
            onClick={() => dispatch(toggleTaskComplete(task.id))}
            className={`mt-1 transition-colors ${
              isDarkMode ? 'text-dark-accent' : 'text-light-accent'
            } hover:opacity-80`}
          >
            {task.completed ? <CheckCircle size={20} /> : <Circle size={20} />}
          </button>
          
          <div className="flex-1 min-w-0">
            <h3 className={`text-lg font-medium truncate ${
              task.completed 
                ? 'line-through opacity-60'
                : ''
            }`}>
              {task.title}
            </h3>
            
            <p className={`mt-1 line-clamp-2 ${
              isDarkMode ? 'text-dark-muted' : 'text-light-muted'
            }`}>
              {task.description}
            </p>
            
            <div className="flex items-center gap-4 mt-2 text-sm">
              <div className={`flex items-center gap-1 ${
                isOverdue 
                  ? 'text-red-500' 
                  : isDarkMode ? 'text-dark-muted' : 'text-light-muted'
              }`}>
                <Clock size={14} />
                <span>{format(new Date(task.dueDate), 'MMM d, yyyy')}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowEditForm(true)}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'text-dark-muted hover:text-dark-text hover:bg-dark-muted'
                  : 'text-light-muted hover:text-light-text hover:bg-light-secondary'
              }`}
            >
              <Pencil size={16} />
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="p-2 rounded-lg text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors"
            >
              <Trash2 size={16} />
            </button>
            <button
              onClick={() => navigate(`/tasks/${task.id}`)}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'text-dark-accent hover:text-dark-text hover:bg-dark-muted'
                  : 'text-light-accent hover:text-light-text hover:bg-light-secondary'
              }`}
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {showEditForm && (
        <TaskForm task={task} onClose={() => setShowEditForm(false)} />
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`rounded-xl p-6 max-w-sm w-full transition-colors ${
            isDarkMode ? 'bg-dark-secondary' : 'bg-light-primary'
          }`}>
            <h3 className="text-lg font-medium mb-4">Delete Task</h3>
            <p className={`mb-6 ${
              isDarkMode ? 'text-dark-muted' : 'text-light-muted'
            }`}>
              Are you sure you want to delete this task? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isDarkMode
                    ? 'bg-dark-muted text-dark-text hover:bg-opacity-80'
                    : 'bg-light-secondary text-light-text hover:bg-gray-200'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}