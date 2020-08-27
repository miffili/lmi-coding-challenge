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

// merkst selbst, ne? 😅
export const DeleteButton = styled.span`
  cursor: pointer;
`;

const ToDoItem: React.FC<ToDoItemProps> = ({ id, text, onDelete }) => {
  return (
    <StyledListItem>
      <input
        type="checkbox"
        id={`todo-${id}`} 
        data-testid="checkbox" />
      <label htmlFor={`todo-${id}`}>{text}</label>
      <DeleteButton onClick={() => onDelete(id)} style={{ cursor: 'pointer' }} data-testid="delete-button">&times;</DeleteButton>
    </StyledListItem>
  );
};

export default ToDoItem;
