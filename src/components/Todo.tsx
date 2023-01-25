import React, { useEffect, useState } from 'react';
import { BsTrash, TiPencil } from 'react-icons/all';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addTodo, ITask, setTodoList, sortTodo, toggleCompleted, updateTodo } from '../store/TodoSlice';
import empty from '../assets/img/empty.jpg';
import ButtonCreateTask from './ButtonCreateTask';
import TaskItem from './TaskItem';
import DeleteTaskButton from './DeleteTaskButton';
import TodoFilters from './TodoFilters';

const Todo = () => {
  const dispatch = useAppDispatch();
  const todoState = useAppSelector((state) => state.todo);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentTodo, setCurrentTodo] = useState<ITask | null>(null);
  const [newTask, setNewTask] = useState<string>('');

  const handleAddTodo = (task: string) => {
    if (task.trim().length === 0) {
      alert('Please enter the task');
    } else {
      dispatch(addTodo({ task, id: Date.now(), completed: false }));
    }
    setNewTask('');
    setShowModal(true);
  };

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

  const handleUpdateTodoList = (id: number, changeTask: string) => {
    if (changeTask.trim().length === 0) {
      alert('Please enter the task');
    } else {
      dispatch(updateTodo({ task: changeTask, id, completed: false }));
    }
    setShowModal(false);
  };

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

  return (
    <div>
      {showModal && (
      <div className="fixed w-full left-0 top-0 h-full bg-transparentBlack flex items-center justify-center">
        <div className="bg-white p-8 rounded-md md:w-[40%] sm:w-[70%] xs:w-[90%] ">
          <input
            type="text"
            className="border p-2 rounded-md outline-none mb-8 w-full"
            value={newTask}
            placeholder={currentTodo?.task ? 'Update your task here' : 'Enter your task here'}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <div className="flex justify-between">
            {currentTodo?.task ? (
              <>
                <button
                  type="button"
                  className="bg-sunsetOrange text-center text-white py-3 px-10 rounded-md"
                  onClick={() => {
                    setShowModal(false);
                    handleUpdateTodoList(currentTodo?.id, newTask);
                  }}
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => { setShowModal(false); }}
                  className="bg-Tangaroa rounded-md text-white py-3 px-10"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => { setShowModal(false); }}
                  className="bg-Tangaroa rounded-md text-white py-3 px-10"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleAddTodo(newTask);
                    setShowModal(false);
                  }}
                  className="bg-sunsetOrange rounded-md text-white py-3 px-10"
                >
                  Add
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      )}
      <div className="flex items-center justify-center flex-col">
        {todoState.todoList.length === 0 ? (
          <div className="mb-6">
            <div className="sm:w-[500px] sm:h-[500px] min-w-[250px]">
              <img src={empty} alt="img" />
            </div>
            <p className="text-center text-Gray ">You have not todos, please add one</p>
          </div>
        ) : (
          <div className="container mx-auto mt-6  ">
            <TodoFilters />
            <div>
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
          </div>
        )}
        <ButtonCreateTask setShowModal={setShowModal} />
      </div>
    </div>
  );
};

export default Todo;
