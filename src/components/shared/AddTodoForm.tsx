import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { Box, Button, Input } from '../base';
import { addTodo } from '../../redux/todoSlice';

const AddTodoForm = () => {
  const [value, setValue] = useState('');

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (value.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [value]);

  const dispatch = useAppDispatch();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.length > 0) {
      dispatch(addTodo(value));
      setValue('');
    }
  };

  return (
    <Box>
      <form
        onSubmit={onSubmit}
        className="flex justify-between items-center mt-12 mb-8 "
      >
        <Input
          placeholder="Enter Task"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          className="max-w-xs w-full"
        />
        <Button
          disabled={disabled}
          className="bg-slate-700 rounded-full px-10"
          type="submit"
        >
          Add
        </Button>
      </form>
    </Box>
  );
};

export default AddTodoForm;
