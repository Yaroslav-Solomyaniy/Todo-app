import React, { FC } from 'react';
import { TiPencil } from 'react-icons/all';
import { ITask } from '../store/TodoSlice';

interface IEditTaskButton {
  task: ITask;
  setShowModal: (value: boolean) => void;
  setCurrentTodo: (value: ITask) => void;
  setNewTask: (value: string) => void;
}

const EditTaskButton:FC<IEditTaskButton> = ({ setNewTask, setCurrentTodo, setShowModal, task }) => (
  <button
    type="button"
    onClick={() => {
      setShowModal(true);
      setCurrentTodo(task);
      setNewTask(task.task);
    }}
    className="bg-blue-500 text-white p-1 rounded-md ml-2"
  >
    <TiPencil />
  </button>
);

export default EditTaskButton;
