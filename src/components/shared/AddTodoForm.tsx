import React, { useState } from 'react';
import { Box, Button, Input } from '../base';

const AddTodoForm = () => {
  const [value, setValue] = useState('');
  return (
    <Box>
      <form className="flex justify-between items-center mt-12 mb-8 ">
        <Input
          placeholder="Enter Task"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
          className="max-w-xs w-full"
        />
        <Button className="bg-slate-700 rounded-full px-10" type="submit">
          Add
        </Button>
      </form>
    </Box>
  );
};

export default AddTodoForm;
