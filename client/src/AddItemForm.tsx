import React from 'react';
import styled from 'styled-components';

interface AddItemProps {
  newTodo: string,
  onSubmit?: any,
  onChange?: any,
}

const StyledForm = styled.form`
  height: 100%;
  display: flex;
  margin: 12px 0;
  padding: 9px;
  background: hsla(233, 11%, 37%, 0.7);
  border-radius: 5px;
`;

const StyledInput = styled.input`
  flex-grow: 1;
  min-height: 32px;
  padding: 0 6px;
  border: none;
  border-radius: 3px;
  background: hsla(40, 20%, 98%, 0.80);
  font-family: inherit;
  font-size: 16px;
  overflow: hidden;
  
  &:focus {
    background: hsla(40, 20%, 98%, 0.85);
  }

  &::placeholder {
    opacity: 0.85;
    color: inherit;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:focus::placeholder {
    opacity: 0.6;
  }
`;

const StyledButton = styled.button`
  flex-shrink: 0;
  flex-grow: 0;
  display: flex;
  align-items: baseline;
  position: relative;
  margin-left: 9px;
  padding: 6px 12px;
  background: hsla(225, 35%, 21%, 1);
  border: none;
  border-radius: 3px;
  color: hsla(40, 20%, 98%, 1);
  font-size: 18px;
  overflow: hidden;

  &:hover {
    cursor: pointer;
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;

const Cursive = styled.div`
  margin: 0 6px 0 -6px;
  font-family: 'Caveat';
  font-size: 32px;
  line-height: 16px;
`;

const AddItemForm: React.FC<AddItemProps> = ({ newTodo, onChange, onSubmit }) => {
  return (
    <StyledForm
      onSubmit={onSubmit}
      data-testid="form">
      <StyledInput
        type="text"
        aria-invalid="true"
        aria-label="Write new todo item"
        placeholder="e.g. Cross fingers 🤞🤓"
        value={newTodo}
        onChange={onChange}
        />
      <StyledButton type="submit" disabled={newTodo ? false : true}>
        <Cursive>+</Cursive><span>Add</span>
      </StyledButton>
    </StyledForm>
  );  
}

export default AddItemForm;
