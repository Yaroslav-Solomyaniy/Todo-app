import React, { FC } from 'react';
import { ITask, toggleCompleted } from '../store/TodoSlice';
import { useAppDispatch } from '../store/hooks';

interface ITaskItem {
  task: ITask;
}

const TaskItem:FC<ITaskItem> = ({ task }) => {
  const dispatch = useAppDispatch();
  const handleToggleCompleted = (item: ITask) => {
    dispatch(toggleCompleted(item));
  };

  return (
    <div
      onClick={() => handleToggleCompleted(task)}
      className={`${task.completed ? 'line-through text-greenTeal' : 'text-sunsetOrange'}`}
    >
      {task.task}
    </div>
  );
};

export default TaskItem;
