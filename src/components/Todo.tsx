import React, { useEffect, useState } from 'react';
import { BsTrash, TiPencil } from 'react-icons/all';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addTodo, ITask, setTodoList, sortTodo, toggleCompleted, updateTodo } from '../store/TodoSlice';
import empty from '../assets/img/empty.jpg';
import ButtonCreateTask from './ButtonCreateTask';
import TaskItem from './TaskItem';
import DeleteTaskButton from './DeleteTaskButton';
import TodoFilters from './TodoFilters';
import EmptyList from './EmptyList';
import InputTask from './InputTask';
import ModalButtons from './ModalButtons';
import ModalWindow from './ModalWindow';

const Todo = () => {
  const dispatch = useAppDispatch();
  const todoState = useAppSelector((state) => state.todo);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentTodo, setCurrentTodo] = useState<ITask | null>(null);
  const [newTask, setNewTask] = useState<string>('');

  useEffect(() => {
    if (todoState.todoList.length > 0) {
      localStorage.setItem('todoList', JSON.stringify(todoState.todoList));
    }
  }, [todoState.todoList]);

  useEffect(() => {
    const storageTodoList = localStorage.getItem('todoList');

    if (storageTodoList) {
      const localTodoList = JSON.parse(storageTodoList);

      dispatch(setTodoList(localTodoList));
    }
  }, []);

  const sortTodoList = todoState.todoList.filter((todo) => {
    if (todoState.sortCriteria === 'All') {
      return true;
    }
    if (todoState.sortCriteria === 'Completed' && todo.completed) {
      return true;
    }
    if (todoState.sortCriteria === 'Not Completed' && !todo.completed) {
      return true;
    }

    return false;
  });
  const IsEmptyTodoList = todoState.todoList.length === 0;

  return (
    <div>
      {showModal && (
        <ModalWindow
          newTask={newTask}
          currentTodo={currentTodo}
          setNewTask={setNewTask}
          setShowModal={setShowModal}
          setCurrentTodo={setCurrentTodo}
        />
      )}
      <div className="flex items-center justify-center flex-col">
        {IsEmptyTodoList ? (<EmptyList />) : (
          <div className="container mx-auto mt-6  ">
            <TodoFilters />
            {sortTodoList.map((todo:ITask) => (
              <div key={todo.id} className="flex items-center justify-between mb-6 bg-Tangaroa mx-auto w-full md:w-[75%] rounded-md p-4">
                <TaskItem task={todo} />
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(true);
                      setCurrentTodo(todo);
                      setNewTask(todo.task);
                    }}
                    className="bg-blue-500 text-white p-1 rounded-md ml-2"
                  >
                    <TiPencil />
                  </button>
                  <DeleteTaskButton task={todo} />
                </div>
              </div>
            ))}
          </div>
        )}
        <ButtonCreateTask setShowModal={setShowModal} />
      </div>
    </div>
  );
};

export default Todo;
