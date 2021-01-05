import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent,{specialChars} from '@testing-library/user-event'
import App from './App';

test('add a new todo', async () => {
  render(<App />);
  const todoInput = screen.getByRole('textbox', { name: /add input/i });
  userEvent.type(todoInput, `go to market${specialChars.enter}`)

  const todoListQuery = within(screen.getByRole('list'))
  await waitFor(() => {
    expect(todoListQuery.getByText('go to market')).toBeInTheDocument()
  })
});

test('mark todo as completed', async () => {
  render(<App />);
  const todoInput = screen.getByRole('textbox', { name: /add input/i });
  userEvent.type(todoInput, `go to market${specialChars.enter}`)

  
  const todoListQuery = within(screen.getByRole('list'))
  await waitFor(() => {
    expect(todoListQuery.getByText('go to market')).toBeInTheDocument()
    
  })

  const todo = todoListQuery.getByText('go to market')
  expect(todo).not.toHaveClass('completed')
  
  userEvent.click(todo)
  
  await waitFor(() => {
    expect(todo).toHaveClass('completed')
  })

});
