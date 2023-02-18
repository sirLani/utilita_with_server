import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const setup = () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
};

describe('test the todo implementation', () => {
  describe('implementation', () => {
    it('renders the header', () => {
      setup();
      const header = screen.queryByRole('heading', { name: /MY TODO LIST/i });
      expect(header).toBeInTheDocument();
    });
    it('has an input', () => {
      setup();
      const input = screen.getByPlaceholderText(/Enter Task/i);
      expect(input).toBeInTheDocument();
    });
    it('has text type for the input', () => {
      setup();
      const input = screen.getByPlaceholderText(/Enter Task/i);
      expect((input as HTMLInputElement).type).toBe('text');
    });
    it('has a button', () => {
      setup();
      const button = screen.queryByRole('button', { name: 'Add' });
      expect(button).toBeInTheDocument();
    });
  });
  describe('interactions', () => {
    const task = 'it is a task';

    it(' input takes value when typed', async () => {
      setup();
      const input = screen.getByPlaceholderText(/Enter Task/i);
      userEvent.type(input, task);
      expect(input).toHaveValue(task);
    });
    it('disables button when input is not filled', async () => {
      setup();
      const button = screen.queryByRole('button', {
        name: /Add/i,
      }) as HTMLButtonElement;
      expect(button).toBeDisabled();
    });
    it('enables button when inputs are filled', async () => {
      setup();
      const input = screen.getByPlaceholderText(/Enter Task/i);
      userEvent.type(input, task);
      const button = screen.queryByRole('button', {
        name: /Add/i,
      }) as HTMLButtonElement;
      expect(button).toBeEnabled();
    });

    it('it displays empty todos initially', async () => {
      setup();
      const item = screen.queryByText('Register a todo item');
      expect(item).toBeInTheDocument();
    });

    it('it displays empty todos initially', async () => {
      setup();
      const item = screen.queryByText('Register a todo item');
      expect(item).toBeInTheDocument();
    });
  });
});
