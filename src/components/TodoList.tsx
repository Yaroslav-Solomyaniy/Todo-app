import React, { FC } from 'react';
import { useAppSelector } from '../store/hooks';
import TodoFilters from './TodoFilters';
import { ITask } from '../store/TodoSlice';
import TaskItem from './TaskItem';
import EditTaskButton from './EditTaskButton';
import DeleteTaskButton from './DeleteTaskButton';

interface ITodoList {
  setShowModal: (value: boolean) => void;
  setCurrentTodo: (value: ITask) => void;
  setNewTask: (value: string) => void;
}

const TodoList:FC<ITodoList> = ({ setCurrentTodo, setNewTask, setShowModal }) => {
  const list = useAppSelector((state) => state.todo.todoList);
  const criteria = useAppSelector((state) => state.todo.sortCriteria);

  const sortTodoList = list.filter((task) => {
    if (criteria === 'All') {
      return true;
    }
    if (criteria === 'Completed' && task.completed) {
      return true;
    }
    if (criteria === 'Not Completed' && !task.completed) {
      return true;
    }

    return false;
  });

  return (
    <div className="container mx-auto mt-6">
      <TodoFilters />
      {sortTodoList.map((todo:ITask) => (
        <div key={todo.id} className="flex items-center justify-between mb-6 bg-Tangaroa mx-auto w-full md:w-[75%] rounded-md p-4">
          <TaskItem task={todo} />
          <div>
            <EditTaskButton task={todo} setShowModal={setShowModal} setCurrentTodo={setCurrentTodo} setNewTask={setNewTask} />
            <DeleteTaskButton task={todo} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
