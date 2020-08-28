import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import ToDoItem from './ToDoItem';

describe('Todo Item', () => {
  let todoItem;
  const testText = "do this todo 🙂";
  const onDelete = jest.fn();

  beforeEach(() => {
    todoItem = render(
      <ToDoItem id="1" text={testText} onDelete={onDelete} />
    );
  })

  it('displays todo text', () => {
    const todoText = todoItem.getByText(testText);

    expect(todoText.textContent).toContain(testText);
  });
  
  it('is initially not checked off', () => {
    const todo = todoItem.getByTestId('checkbox') as HTMLInputElement;

    expect(todo.checked).toEqual(false);
  });

  it('is marked as done, when clicked', () => {
    const todo = todoItem.getByTestId('checkbox') as HTMLInputElement;

    fireEvent.click(todo);

    expect(todo.checked).toEqual(true);
  });

  it('gets deleted when the x is clicked', () => {
    const deleteButton = todoItem.getByTestId('delete-button');

    fireEvent.click(deleteButton);
    
    expect(onDelete).toBeCalled();
  });

  afterEach(cleanup);
});
