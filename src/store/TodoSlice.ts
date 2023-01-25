import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ITask {
  id: number;
  task: string;
  completed: boolean;
}

interface ITodoSlice {
  todoList: ITask[];
  sortCriteria: string;
}

const initialState:ITodoSlice = {
  todoList: [],
  sortCriteria: 'All',
};

export const TodoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setTodoList: (state, action) => {
      state.todoList = action.payload;
    },

    addTodo: (state, action:PayloadAction<ITask>) => {
      state.todoList.push(action.payload);
    },
    sortTodo: (state, action:PayloadAction<string>) => {
      state.sortCriteria = action.payload;
    },
    updateTodo: (state, action:PayloadAction<ITask>) => {
      const { task, id } = action.payload;
      const index = state.todoList.findIndex((todo) => todo.id === id);

      state.todoList[index].task = task;
    },
    toggleCompleted: (state, action:PayloadAction<ITask>) => {
      const { id } = action.payload;
      const index = state.todoList.findIndex((todo) => todo.id === id);

      state.todoList[index].completed = !state.todoList[index].completed;
    },
  },
});

export default TodoSlice.reducer;
export const { addTodo, setTodoList, sortTodo, updateTodo, toggleCompleted } = TodoSlice.actions;
