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

const StyledErrorMessage = styled.p`
  color: red;
`;

const EmptyState = styled.div<{ showEmptyState: boolean }>`
  display: ${props => props.showEmptyState ? 'block' : 'none'};
`;

const LiveFeedback = styled.div`
  position: absolute !important;
  clip: rect(1px, 1px, 1px, 1px);
  padding:0 !important;
  border:0 !important;
  height: 1px !important;
  width: 1px !important;
  overflow: hidden;
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
  const [liveFeedback, setLiveFeedback] = useState('');
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
      setLiveFeedback(`${newTodo} added`);
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
      const deleteItem = todos.find(el => el.id === deleteId)?.text;
      const updatedTodos = todos.filter((el) => (el.id !== deleteId));

      setLiveFeedback(`${deleteItem} deleted`);
      setTodos(updatedTodos);
      // after deletion focus first todo in list or add item input
      todos.length === 0 ?
        (document.querySelector('ul input') as HTMLInputElement).focus() : (document.querySelector('input') as HTMLInputElement).focus();
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
        <p>There is nothing to do (yet). Add your first todo now!</p>
        <p>Or chill. Who am I to tell you how to spend your day. <span role="img" aria-label="wink emoji">😉</span></p>
      </EmptyState>

      <AddItemForm newTodo={newTodo} onChange={handleChange} onSubmit={handleSubmit} />

      {hasErrors && <ErrorMessage message={error}/>}

      <LiveFeedback role="status" aria-live="polite">
        {liveFeedback}
      </LiveFeedback>

    </Main>
  );
}

export default App;
