import React, { FC } from 'react';
import { ITask } from '../store/TodoSlice';

interface IInputTask {
  newTask: string;
  currentTodo: ITask | null;
  setNewTask: (value: string) => void;
}

const InputTask:FC<IInputTask> = ({ newTask, setNewTask, currentTodo }) => (
  <input
    type="text"
    className="border p-2 rounded-md outline-none mb-8 w-full"
    value={newTask}
    placeholder={currentTodo?.task ? 'Update your task here' : 'Enter your task here'}
    onChange={(e) => setNewTask(e.target.value)}
  />
);

export default InputTask;
