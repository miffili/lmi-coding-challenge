import React from 'react';
import styled from 'styled-components';

interface AddItemProps {
  newTodo: string,
  onSubmit?: any,
  onChange?: any,
}

const StyledForm = styled.form`
  display: block;
`;

const AddItemForm: React.FC<AddItemProps> = ({ newTodo, onChange, onSubmit }) => {
  return (
    <StyledForm
      onSubmit={onSubmit}>
      <input
        type="text"
        aria-invalid="true"
        aria-label="Create new todo item"
        placeholder="e.g. get hyped to Deichkind"
        value={newTodo}
        onChange={onChange}
        />
      <button type="submit" disabled={newTodo.length === 0 }>Add</button>
    </StyledForm>
  );  
}

export default AddItemForm;
