import React from 'react';
import { sortTodo } from '../store/TodoSlice';
import { useAppDispatch } from '../store/hooks';

const TodoFilters = () => {
  const dispatch = useAppDispatch();
  const handleSort = (criteria: string) => {
    dispatch(sortTodo(criteria));
  };

  return (
    <div className="flex justify-center mb-6 ">
      <select className="p-1 outline-none" onChange={(e) => { handleSort(e.target.value); }}>
        <option value="All" className="text-sm"> All</option>
        <option value="Completed" className="text-sm">Completed</option>
        <option value="Not Completed" className="text-sm">Not Completed</option>
      </select>
    </div>
  );
};

export default TodoFilters;
