import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import React from 'react';
import { Box, Text } from '../base';

const TodoItem = () => {
  return (
    <Box className="flex justify-between items-center shadow-lg px-6 py-3 rounded-2xl mb-5 mt-6">
      <Text>Buy Fish</Text>
      <Box>
        <EditOutlined className="cursor-pointer" />
        <CheckCircleOutlined className="ml-7 cursor-pointer" />
        <DeleteOutlined className="ml-7 cursor-pointer" />
      </Box>
    </Box>
  );
};

export default TodoItem;
