/* eslint-disable multiline-ternary */
import React, { useEffect } from 'react';
import { Box, Text } from '../utils';
import TodoItem from './TodoItem';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { OrderedListOutlined } from '@ant-design/icons';
import { fetchTodosAsync } from '../../redux/todoSlice';

const Todolist = () => {
  // this gets all todos from the store and maps it to the TodoItem component
  const todos = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(fetchTodosAsync()).catch((e) => {
      console.log(e.message);
    });
  }, [dispatch]);

  return (
    <Box>
      <Box className="list-group max-h-[60vh] overflow-auto">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              title={todo.title}
              completed={todo.completed}
            />
          ))
        ) : (
          <Box className="mt-28 flex flex-col justify-center items-center mb-32">
            <OrderedListOutlined rev={''} />
            <Text className="mt-4" role="no-list">
              Register a todo item
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Todolist;
