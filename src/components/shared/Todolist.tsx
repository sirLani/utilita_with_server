/* eslint-disable multiline-ternary */
import React from 'react';
import { Box, Text } from '../base';
import TodoItem from './TodoItem';
import { useAppSelector } from '../../hooks';
import { OrderedListOutlined } from '@ant-design/icons';

const Todolist = () => {
  const todos = useAppSelector((state) => state.todos);

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
            <OrderedListOutlined />
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
