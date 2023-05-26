/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import uuid from 'react-uuid';

import type { TodoListType } from '../types/general';

const END_POINT = 'http://localhost:8000/todos';

export const fetchTodosAsync = createAsyncThunk(
  'todos/fetchTodosAsync',
  async () => {
    const res = await fetch(END_POINT);
    if (res.ok) {
      const todos = await res.json();

      return { todos };
    }
  }
);

// uuid package was used to uniquely identofy the object
export const addTodoAsync = createAsyncThunk(
  'todos/addTodoAsync',
  async (title: string) => {
    const res = await fetch(END_POINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, completed: false, id: uuid() }),
    });

    if (res.ok) {
      const todo = await res.json();
      return { todo };
    }
  }
);

export const isTodoCompleteAsync = createAsyncThunk(
  'todos/isTodoCompleteAsync',
  async (payload: TodoListType) => {
    const res = await fetch(`${END_POINT}/${payload.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed: payload.completed }),
    });

    if (res.ok) {
      const todo = await res.json();

      return { id: todo.id, completed: todo.completed };
    }
  }
);

export const editTodoAsync = createAsyncThunk(
  'todos/editTodoAsync',
  async (payload: TodoListType) => {
    const res = await fetch(`${END_POINT}/${payload.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: payload.title }),
    });

    if (res.ok) {
      const todo = await res.json();

      return { todo };
    }
  }
);

export const deleteTodoAsync = createAsyncThunk(
  'todos/deleteTodoAsync',
  async (payload: TodoListType) => {
    const res = await fetch(`${END_POINT}/${payload.id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      return { id: payload.id, completed: payload.completed };
    }
  }
);

const initialState: TodoListType[] = [];

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTodosAsync.fulfilled, (state, action) => {
      return action.payload?.todos;
    });
    builder.addCase(addTodoAsync.fulfilled, (state, action) => {
      state.push(action.payload?.todo);
    });
    builder.addCase(isTodoCompleteAsync.fulfilled, (state, action) => {
      // this line edits the todo by identifying the object that needs to be marked as completed or otherwise using the
      // position of the object in the array, then replacing the previous item with the new one
      const index = state.findIndex((todo) => todo.id === action.payload?.id);
      state[index].completed = action.payload?.completed;
    });
    builder.addCase(editTodoAsync.fulfilled, (state, action) => {
      // this line edits the todo by identifying the object that needs to be edited using the
      // position of the object in the array, then replacing the previous item with the new one
      const index = state.findIndex(
        (todo) => todo.id === action.payload?.todo.id
      );
      state[index].title = action.payload?.todo.title;
    });
    builder.addCase(deleteTodoAsync.fulfilled, (state, action) => {
      return state.filter((todo) => todo.id !== action.payload?.id);
    });
  },
});

export default todosSlice.reducer;
