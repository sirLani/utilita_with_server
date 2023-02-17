import React from 'react';
import { Box, Heading } from './components/base';
import AddTodoForm from './components/shared/AddTodoForm';
import TodoItem from './components/shared/TodoItem';

function App() {
  return (
    <Box className="shadow-2xl max-w-xl w-full m-auto max-h-96 mt-24 px-4 pt-6 pb-4">
      <Heading className="text-center text-slate-500 font-semibold text-xl mt-12">
        MY TODO LIST
      </Heading>
      <AddTodoForm />
      <Box className="w-80 border-b-[0.1px] m-auto  border-slate-100 border-solid"></Box>
      <TodoItem />
    </Box>
  );
}

export default App;
