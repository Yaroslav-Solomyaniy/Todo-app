import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TodoSlice } from './TodoSlice';

const rootReducer = combineReducers({
  todo: TodoSlice.reducer,
});

export const setupStore = () => configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
