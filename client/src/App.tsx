import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ToDoItem from './ToDoItem';
import AddItemForm from './AddItemForm';

const Main = styled.main`
  width: 100vw;
  min-height: 100vh;
  background: #CCC;
  display: grid;
  place-content: center;
`;

const StyledList = styled.ul`
  margin: 0;
  padding: 0;
  margin-block: 0;
  list-style: none;
  min-width: 50%;
`;

const StyledErrorMessage = styled.div`
  color: red;
`;

const EmptyState = styled.div<{ showEmptyState: boolean }>`
  display: ${props => props.showEmptyState ? 'block' : 'none'};
`;

const ErrorMessage: React.FC<{message?: string}> = ({ message }) => {
  return (
    <StyledErrorMessage>
      {message}
    </StyledErrorMessage>
  )
}

const App: React.FC = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [hasErrors, setHasErrors] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/tasks').then((response) => {
      if(!response.ok) {
        throw new Error('Oh oh, can\'t fetch todos! 😨');
      };
      return response;
    })
    .then(res => res.text())
    .then(data => JSON.parse(data))
    .then(res => [...Object.values(res)])
    .then(arr => setTodos(arr as any))
    .catch((error) => {
      handleError(error);
    });
  }, []);

  const handleError = (error) => {
    setHasErrors(true);
    setError(error.message);
    console.error(error);
  }

  const handleChange = (e) => {
    setNewTodo(e.target.value);
    if(hasErrors) setHasErrors(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const lastId = todos[todos.length-1];
    const newId = lastId ? parseInt(lastId.id) + 1 : 1;

    fetch('/api/tasks', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: newId.toString(), text: newTodo })
    })
    .then((response) => {
      if(!response.ok) {
        throw new Error('Oh oh, couldn\'t add todo! 😨');
      };
      return response.blob;
    })
    .then(() => {
      setTodos([...todos, {id: newId, text: newTodo}]);
      setNewTodo('');
    })
    .catch((error) => {
      handleError(error);
    });
  }

  const handleDelete = (id) => {
    fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
    })
    .then((response) => {
      if(!response.ok) {
        throw new Error('Oh oh, couldn\'t delete task! 😨');
      };
      return response.blob;
    })
    .then(() => {
      const deleteId = id;
      const updatedTodos = todos.filter((el) => (el.id !== deleteId));
      setTodos(updatedTodos);
    })
    .catch((error) => {
      handleError(error);
    })
  }

  return (
    <Main>

      <h1>
        ToDos
      </h1>

      <StyledList>
        {
          todos.map(el => (
            <ToDoItem key={el.id} id={el.id} text={el.text} onDelete={handleDelete} />
          ))
        }
      </StyledList>

      <EmptyState showEmptyState={!todos.length}>
        <p>There is nothing to do here. Add your first one. &#x2193;</p>
      </EmptyState>

      <AddItemForm newTodo={newTodo} onChange={handleChange} onSubmit={handleSubmit} />

      {hasErrors && <ErrorMessage message={error}/>}

    </Main>
  );
}

export default App;
