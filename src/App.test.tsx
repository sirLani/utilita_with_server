import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { server } from './mocks/server';
import { rest } from 'msw';

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
    const actionSetup = (text: string) => {
      setup();
      const input = screen.getByPlaceholderText(/Enter Task/i);
      userEvent.type(input, text);
      const button = screen.queryByRole('button', {
        name: /Add/i,
      }) as HTMLButtonElement;
      userEvent.click(button);
    };
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

    it('it stops displaying empty todos when input is filled and button is clicked ', async () => {
      setup();

      const input = screen.getByPlaceholderText(/Enter Task/i);
      userEvent.type(input, task);
      const item = screen.queryByText('Register a todo item');
      const button = screen.queryByRole('button', {
        name: /Add/i,
      }) as HTMLButtonElement;
      userEvent.click(button);
      await waitFor(() => {
        expect(item).not.toBeInTheDocument();
      });
    });

    it('it displays task when button is clicked ', async () => {
      actionSetup('it is a task');
      await waitFor(() => {
        expect(screen.queryByText('it is a task')).toBeInTheDocument();
      });
    });
    it('it deletes task when button is clicked ', async () => {
      const id = '2340f317-5882-e4d2-0bd7-d098090e9bef';
      actionSetup('it is a task');
      server.use(
        rest.delete(`http://localhost:8000/todos/${id}`, (req, res, ctx) => {
          return res(
            // Respond with a 200 status code
            ctx.status(200),
            ctx.json({
              id,
              title: 'it is a task',
              completed: false,
            })
          );
        })
      );
      const addedTask = await screen.queryByText('it is a task');
      const buttons = screen.getAllByTestId('delete-todoItem');
      buttons.forEach((button) => {
        userEvent.click(button as unknown as HTMLButtonElement);
      });
      await waitFor(() => {
        expect(addedTask).not.toBeInTheDocument();
      });
    });
  });
});
