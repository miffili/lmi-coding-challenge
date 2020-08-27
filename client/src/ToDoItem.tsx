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

const ToDoItem: React.FC<ToDoItemProps> = ({ id, text, onDelete }) => {
  return (
    <StyledListItem>
      <input
        type="checkbox"
        id={`todo-${id}`} 
        data-testid="checkbox" />
      <label htmlFor={`todo-${id}`}>{text}</label>
      <span onClick={() => onDelete(id)} style={{ cursor: 'pointer' }}>&times;</span>
    </StyledListItem>
  );
};

export default ToDoItem;
