import React, { FC } from 'react';
import { BsTrash } from 'react-icons/all';
import { ITask, setTodoList } from '../store/TodoSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

interface IDeleteTaskButton {
  task: ITask;
}

const DeleteTaskButton:FC<IDeleteTaskButton> = ({ task }) => {
  const dispatch = useAppDispatch();
  const todoList = useAppSelector((state) => state.todo.todoList);

  const handleDeleteTodo = (id: number) => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);

    dispatch(setTodoList(updatedTodoList));
    localStorage.setItem('todoList', JSON.stringify(updatedTodoList));
  };

  return (
    <button
      onClick={() => handleDeleteTodo(task.id)}
      type="button"
      className="bg-sunsetOrange text-white p-1 rounded-md ml-2"
    >
      <BsTrash />
    </button>
  );
};

export default DeleteTaskButton;
