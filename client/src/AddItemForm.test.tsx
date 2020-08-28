import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import AddItemForm from './AddItemForm';

describe('Add Item Form', () => {
  let onSubmit, onChange, addItemForm, form, input, button;

  beforeEach(() => {
    onSubmit = jest.fn();
    onChange = jest.fn();

    addItemForm = render(
      <AddItemForm newTodo="" onChange={onChange} onSubmit={onSubmit} />
      );
    input = addItemForm.getByLabelText('Write new todo item') as HTMLInputElement;
    button = addItemForm.getByRole('button') as HTMLButtonElement;
  });

  it('is NOT possible to add item, when input field empty', () => {
    expect(button.disabled).toBeTruthy();
  });

  it('is possible to add item, when todo is typed in input field', () => {
    cleanup();

    // since onChange is mocked, we need to render the form for this test with a pre-filled input field 😇 → would find better solution in prod
    addItemForm = render(
      <AddItemForm newTodo="newTodo" onChange={onChange} onSubmit={onSubmit} />
    );
    button = addItemForm.getByText(/Add/i) as HTMLButtonElement;

    expect(button.disabled).toBeFalsy();
  });

  it('changes value, when text is typed in input field', () => {
    fireEvent.change(input, { target: { value: 'test add item form' } });

    expect(onChange).toBeCalled();
  });

  // again, Klara, for real the naming. 🙄😅
  it('submits form, when form submitted', () => {
    form = addItemForm.getByTestId('form');

    fireEvent.change(input, { target: { value: 'test add item form' } });
    fireEvent.submit(form);
    
    expect(onSubmit).toBeCalled();
  });

  afterEach(cleanup);
});
