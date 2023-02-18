import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TodoListType } from '../types/general';
import uuid from 'react-uuid';

const initialState: TodoListType[] = [];

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<string>) {
      state.push({
        id: uuid(),
        completed: false,
        title: action.payload,
      });
    },
  },
});

export const { addTodo } = todosSlice.actions;

export default todosSlice.reducer;
