import React, { FC } from 'react';
import InputTask from './InputTask';
import ModalButtons from './ModalButtons';
import { addTodo, ITask, updateTodo } from '../store/TodoSlice';
import { useAppDispatch } from '../store/hooks';

interface IModalWindow {
  newTask: string;
  currentTodo: ITask | null;

  setNewTask: (value: string) => void;
  setShowModal: (value: boolean) => void;
  setCurrentTodo: (task: ITask | null) => void;
}

const ModalWindow:FC<IModalWindow> = ({ newTask, setShowModal, setNewTask, setCurrentTodo, currentTodo }) => {
  const dispatch = useAppDispatch();
  const isTask = currentTodo?.task;

  const stateReset = () => {
    setShowModal(false); setCurrentTodo(null); setNewTask('');
  };

  const handleUpdateTodoList = (id: number, changeTask: string) => {
    if (changeTask.trim().length === 0) {
      alert('Please enter the task');
    } else {
      dispatch(updateTodo({ task: changeTask, id, completed: false }));
    }
    setShowModal(false);
    setCurrentTodo(null);
    setNewTask('');
  };

  const handleAddTodo = (task: string) => {
    if (task.trim().length === 0) {
      alert('Please enter the task');
    } else {
      dispatch(addTodo({ task, id: Date.now(), completed: false }));
    }
    setNewTask('');
    setCurrentTodo(null);
    setShowModal(true);
  };

  return (
    <div className="fixed w-full left-0 top-0 h-full bg-transparentBlack flex items-center justify-center">
      <div className="bg-white p-8 rounded-md md:w-[40%] sm:w-[70%] xs:w-[90%] ">
        <InputTask newTask={newTask} currentTodo={currentTodo} setNewTask={setNewTask} />
        <div className="flex justify-between">
          <ModalButtons
            textSubmit={isTask ? 'Save' : 'Add'}
            setShowModal={setShowModal}
            handleClick={isTask
              ? () => handleUpdateTodoList(currentTodo?.id, newTask)
              : () => { handleAddTodo(newTask); setShowModal(false); }}
            cancelClick={stateReset}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;
