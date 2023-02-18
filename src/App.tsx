import React from 'react';
import { Box, Heading } from './components/base';
import AddTodoForm from './components/shared/AddTodoForm';
import Todolist from './components/shared/Todolist';

function App() {
  return (
    <Box className="shadow-2xl max-w-xl w-full m-auto  mt-24 px-4 pt-6 pb-4 ">
      <Heading className="text-center text-slate-500 font-semibold text-xl mt-12">
        MY TODO LIST
      </Heading>
      <AddTodoForm />
      <Box className="w-80 border-b-[0.1px] m-auto  border-slate-100 border-solid"></Box>
      <Todolist />
    </Box>
  );
}

export default App;
