import React, { useState } from 'react';
import styled, { css } from 'styled-components';

interface ToDoItemProps {
  id: string,
  text: string,
  onDelete?: any,
}
  
const StyledListItem = styled.li`
  max-width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  margin: 12px 0;
  padding: 12px 48px;
  background: hsla(40, 20%, 95%, 0.7);
  border-radius: 5px;

  &:last-of-type{
    margin-bottom: 0;
  }
`;

const StyledInput = styled.input`
  width: 24px;
  height: 24px;
  position: absolute;
  opacity: 0;
`;

const StyledLabel = styled.label<{ checked: boolean }>`
  width: 100%;
  height: 100%;
  min-height: 100%;
  display: flex;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
  
  ${props => props.checked && css`
    color: hsla(225, 35%, 21%, 0.7);
    text-decoration-color: hsla(225, 35%, 21%, 0.7);
    text-decoration: line-through;
  `}
`;

const CustomCheckbox = styled.span`
  width: 21px;
  height: 21px;
  display: inline-flex;
  place-content: center;
  position: absolute;
  left: 9px;
  flex-shrink: 0;
  flex-grow: 0;
  padding: 0 2px 0 0;
  box-sizing: border-box;
  border: 1px solid hsla(225, 35%, 21%, 1);
  border-radius: 3px;
  overflow: hidden;

  color: transparent;
  font-family: 'Caveat';

  ${StyledInput}:checked ~ & {
    background-color: hsla(225, 35%, 21%, 1);
    color: hsla(40, 20%, 95%, 1);
  }

  ${StyledInput}:focus ~ & {
    outline: 1px dotted #212121;
    outline: 5px auto -webkit-focus-ring-color;
  }
`;

export const DeleteButton = styled.button`
  width: 21px;
  height: 21px;
  display: flex;
  place-content: center;
  position: absolute;
  right: 9px;
  flex-grow: 0;
  flex-shrink: 0;
  margin: 0 0 0 12px;
  padding: 0 5px 0 0;
  background: transparent;
  border: none;
  border: 1px solid hsla(353, 45%, 40%, 0.75);
  border-radius: 3px;
  overflow: hidden;
  
  color: hsla(353, 45%, 40%, 0.75);
  font-family: 'Caveat';
  font-size: 42px;
  line-height: 12px;
  
  &:hover, &:focus {
    background-color: hsla(353, 45%, 40%, 0.2);
    color: hsla(353, 60%, 40%, 1);
    border-color: hsla(353, 60%, 40%, 1);
    cursor: pointer;
  }
`;

const ToDoItem: React.FC<ToDoItemProps> = ({ id, text, onDelete }) => {
  const [checked, setChecked] = useState(false);
  
  return (
    <StyledListItem>
      <StyledLabel htmlFor={`todo-${id}`} checked={checked}>
        <StyledInput
          type="checkbox"
          id={`todo-${id}`} 
          data-testid="checkbox"
          defaultChecked={checked}
          onChange={(e) => {
            setChecked(!checked)
          }} />
        <CustomCheckbox>✓</CustomCheckbox>
        {text}
      </StyledLabel>
      <DeleteButton onClick={() => onDelete(id)} data-testid="delete-button" aria-label={`delete ${text}`}>
        <span>&times;</span>
      </DeleteButton>
    </StyledListItem>
  );
};

export default ToDoItem;
