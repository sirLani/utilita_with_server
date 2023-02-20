/* eslint-disable comma-dangle */
// src/mocks/handlers.js
import { rest } from 'msw';
import uuid from 'react-uuid';

export const handlers = [
  rest.get('http://localhost:8000/todos', (req, res, ctx) => {
    return res(
      // Respond with a 200 status code
      ctx.status(304),
      ctx.json({
        todos: [
          {
            title: 'it is a task',
            completed: false,
            id: '990807d0-a735-932d-564c-ca9aced926c1',
          },
        ],
      })
    );
  }),

  rest.post('http://localhost:8000/todos', (req, res, ctx) => {
    return res(
      // Respond with a 200 status code
      ctx.status(201),
      ctx.json({
        id: uuid(),
        title: 'it is a task',
        completed: false,
      })
    );
  }),
  rest.delete('http://localhost:8000/todos/:id', (req, res, ctx) => {
    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json({
        id: uuid(),
        title: 'it is a task',
        completed: false,
      })
    );
  }),
];
