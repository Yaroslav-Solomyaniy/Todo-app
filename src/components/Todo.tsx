import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { ITask, setTodoList } from '../store/TodoSlice';
import CreateTaskButton from './CreateTaskButton';
import EmptyList from './EmptyList';
import ModalWindow from './ModalWindow';
import TodoList from './TodoList';

const Todo = () => {
  const dispatch = useAppDispatch();
  const todoList = useAppSelector((state) => state.todo.todoList);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentTodo, setCurrentTodo] = useState<ITask | null>(null);
  const [newTask, setNewTask] = useState<string>('');

  useEffect(() => {
    if (todoList.length > 0) {
      localStorage.setItem('todoList', JSON.stringify(todoList));
    }
  }, [todoList]);

  useEffect(() => {
    const storageTodoList = localStorage.getItem('todoList');

    if (storageTodoList) {
      const localTodoList = JSON.parse(storageTodoList);

      dispatch(setTodoList(localTodoList));
    }
  }, []);

  const IsEmptyTodoList = todoList.length === 0;

  return (
    <>
      <div className="flex items-center justify-center flex-col">
        {IsEmptyTodoList ? (<EmptyList />) : (<TodoList setShowModal={setShowModal} setCurrentTodo={setCurrentTodo} setNewTask={setNewTask} />)}
        <CreateTaskButton setShowModal={setShowModal} />
      </div>

      {showModal && (
      <ModalWindow
        newTask={newTask}
        currentTodo={currentTodo}
        setNewTask={setNewTask}
        setShowModal={setShowModal}
        setCurrentTodo={setCurrentTodo}
      />
      )}
    </>
  );
};

export default Todo;
