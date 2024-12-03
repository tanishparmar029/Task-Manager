import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilteredTasks, reorderTasks } from '../store/taskSlice';
import TaskItem from './TaskItem';
import { Task } from '../types/task';
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

export default function TaskList() {
  const dispatch = useDispatch();
  const tasks = useSelector(selectFilteredTasks);
  
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 200,
      tolerance: 5,
    },
  });
  
  const sensors = useSensors(mouseSensor, touchSensor);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      dispatch(reorderTasks({
        activeId: String(active.id),
        overId: String(over.id),
      }));
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No tasks found. Add a new task to get started!
      </div>
    );
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <SortableContext items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-4">
          {tasks.map((task: Task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}