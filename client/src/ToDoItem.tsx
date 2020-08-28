import React from 'react';
import styled from 'styled-components';

interface ToDoItemProps {
  id: string,
  text: string,
  onDelete?: any,
}

const StyledListItem = styled.li`
  input:checked + label {
    text-decoration: line-through;
    opacity: 0.7;
  }
`;

export const DeleteButton = styled.button`
`;

const ToDoItem: React.FC<ToDoItemProps> = ({ id, text, onDelete }) => {
  return (
    <StyledListItem>
      <input
        type="checkbox"
        id={`todo-${id}`} 
        data-testid="checkbox" />
      <label htmlFor={`todo-${id}`}>{text}</label>
      <DeleteButton onClick={() => onDelete(id)} data-testid="delete-button" aria-label={`delete ${text}`}>&times;</DeleteButton>
    </StyledListItem>
  );
};

export default ToDoItem;
