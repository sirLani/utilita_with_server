import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  UndoOutlined,
} from '@ant-design/icons';
import React, { useState } from 'react';

import { Box, Text } from '../utils';
import { type TodoListType } from '../../types/general';
import { useAppDispatch } from '../../redux/hooks';
import { isTodoCompleteAsync, deleteTodoAsync } from '../../redux/todoSlice';
import EditTodoForm from './editTodoForm';

const TodoItem = ({ id, title, completed }: TodoListType) => {
  const [opened, setOpened] = useState(false);
  const dispatch = useAppDispatch();

  const handleIsCompleted = () => {
    dispatch(
      isTodoCompleteAsync({ id, completed: !(completed ?? false) })
    ).catch((e) => {});
  };

  const handleDelete = () => {
    dispatch(deleteTodoAsync({ id })).catch((e) => {});
  };

  const handleEdit = () => {
    setOpened(true);
  };

  return (
    <>
      <Box
        className={`flex justify-between items-center shadow-lg px-6 py-3 rounded-2xl mb-5 mt-6 ${
          completed === true ? 'line-through' : ''
        }`}
      >
        <Text className="capitalize">{title}</Text>
        <Box>
          <EditOutlined
            onClick={handleEdit}
            className="cursor-pointer"
            rev={''}
          />
          {
            // eslint-disable-next-line multiline-ternary
            completed === false ? (
              <CheckCircleOutlined
                rev={''}
                className="ml-7 cursor-pointer"
                onClick={handleIsCompleted}
              />
            ) : (
              <UndoOutlined
                rev={''}
                className="ml-7 cursor-pointer"
                onClick={handleIsCompleted}
              />
            )
          }
          <DeleteOutlined
            rev={''}
            data-testid="delete-todoItem"
            className="ml-7 cursor-pointer"
            onClick={handleDelete}
          />
        </Box>
      </Box>
      <EditTodoForm
        opened={opened}
        title={title}
        id={id}
        setOpened={setOpened}
      />
    </>
  );
};

export default TodoItem;
