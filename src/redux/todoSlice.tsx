import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TodoListType } from '../types/general';
import uuid from 'react-uuid';

const initialState: TodoListType[] = [];

// uuid package was used to uniquely identofy the object

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
    isCompleted: (state, action) => {
      // this line edits the todo by identifying the object that needs to be marked as completed or otherwise using the
      // position of the object in the array, then replacing the previous item with the new one
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].completed = action.payload.completed;
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload.id);
    },
    editTodo: (state, action) => {
      // this line edits the todo by identifying the object that needs to be edited using the
      // position of the object in the array, then replacing the previous item with the new one

      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].title = action.payload.title;
    },
  },
});

export const { addTodo, isCompleted, deleteTodo, editTodo } =
  todosSlice.actions;

export default todosSlice.reducer;
