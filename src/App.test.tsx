import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

const setup = () => {
  render(<App />);
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
    it('has text type for  input', () => {
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
});
