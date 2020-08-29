import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import ToDoItem from './components/ToDoItem';
import AddItemForm from './components/AddItemForm';
import ErrorMessage from './components/ErrorMessage';

const Main = styled.main`
  width: 85vw;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: relative;
  margin-top: 10vh;
  padding: 24px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(5px);

  @media (min-width: 768px) {
    width: 75vw;
  }

  @media (min-width: 992px) {
    width: 45vw;
  }
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Headline = styled.h1`
  flex-shrink: 0;
  flex-grow: 0;
  margin: 0 0 12px -6px;
  font-family: 'Caveat';
  font-size: 54px;
  transform-origin: center center;
  transform: rotate(-9deg);
`;

const StyledList = styled.ul`
  width: 100%;
  margin: 0;
  margin-block: 0;
  padding: 0;
  list-style: none;
  overflow: hidden;
`;

const EmptyState = styled.div<{showEmptyState: boolean}>`
  padding: 6px 0;
  font-size: 14px;
  text-align: center;
  
  opacity: ${props => props.showEmptyState ? '1' : '0'};
  transform-origin: center;
  transition-property: opacity;
  transition-duration: ${props => props.showEmptyState ? '0.25s' : '0.05s'};
  transition-timing-function: ${props => props.showEmptyState ? 'ease' : 'ease-in'};
  
  p {
    margin: 0;
  }
  
  @media (min-width: 768px) {
    text-align: right;
    padding: 6px 12px;
    margin: 0 0 0 9px;
  }
`;

const Info = styled.p`
  &&& {
    display: none;
    font-size: 11px;

    @media (min-width: 768px) {
      display: block;
    }
  }
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

const Footer = styled.footer`
  width: 100vw;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  font-size: 11px;
  color: hsla(40, 20%, 98%, 1);
  background: hsla(233, 11%, 4%, 1);
  padding: 6px 0;
  z-index: 1;

  span {
    display: inline-block;
    margin: 0 6px;
  }
`;

const Name = styled.a`
  font-family: 'Caveat';
  font-size: 18px;
  margin: 0 3px;
  
  &, &:hover, &:visited, &:focus {
    color: inherit;
    text-decoration: none;
  }
`;

const App: React.FC = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [liveFeedback, setLiveFeedback] = useState('');
  const [hasErrors, setHasErrors] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/tasks').then((response) => {
      if(!response.ok) {
        throw new Error('Oh oh, can\'t fetch todos! 😣');
      };
      return response;
    })
    .then(res => res.text())
    .then(data => JSON.parse(data))
    .then(res => [...Object.values(res)])
    .then(arr => {
      setTodos(arr as any);
      setHasErrors(false);
    })
    .catch((error) => {
      handleError(error);
    });
  }, []);

  const handleError = (error) => {
    setHasErrors(true);
    setError(error.message);
    console.error(error);
  };

  const handleChange = (event) => {
    setNewTodo(event.target.value);
    setHasErrors(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

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
        throw new Error('Oh oh, couldn\'t add todo! 😟');
      };
      return response.blob;
    })
    .then(() => {
      setTodos([...todos, {id: newId.toString(), text: newTodo}]);
      setLiveFeedback(`${newTodo} added`);
      setNewTodo('');
      setHasErrors(false);
    })
    .catch((error) => {
      handleError(error);
    });
  };

  const handleDelete = (id) => {
    fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
    })
    .then((response) => {
      if(!response.ok) {
        throw new Error('Oh oh, couldn\'t delete todo! 😨');
      };
      return response.blob;
    })
    .then(() => {
      const deleteId = id;
      const deleteItem = todos.find(el => el.id === deleteId)?.text;
      const updatedTodos = todos.filter((el) => (el.id !== deleteId));

      setLiveFeedback(`${deleteItem} deleted`);
      setTodos(updatedTodos);
      // after deletion, focus first todo in list or add item input
      todos.length === 0 ?
        (document.querySelector('ul input') as HTMLInputElement).focus() : (document.querySelector('input') as HTMLInputElement).focus();
      setHasErrors(false);
    })
    .catch((error) => {
      handleError(error);
    });
  };

  return (
    <>
      <ErrorMessage message={error} hasError={hasErrors}/>

      <LiveFeedback role="status" aria-live="polite">
        {liveFeedback}
      </LiveFeedback>

      <Main>
        <TopContainer>
          <Headline>
            My Todos
          </Headline>

          <EmptyState showEmptyState={todos.length === 0}>
            <p>There is nothing to do. Add your first todo.</p>
            <Info>Or relax. Who am I to tell you how to spend your day. <span role="img" aria-label="wink emoji">😉</span></Info>
          </EmptyState>
        </TopContainer>


        <AddItemForm newTodo={newTodo} onChange={handleChange} onSubmit={handleSubmit} />

        {todos.length > 0 && (
          <StyledList>
            {
              todos.map(el => (
                <ToDoItem key={el.id} id={el.id} text={el.text} onDelete={handleDelete} />
              ))
            }
          </StyledList>
        )}
      </Main>

      <Footer>
        made with <span role="img" aria-label="sparkle emoji">✨</span> by <Name href="https://twitter.com/KlaraMiffili">Klara</Name>
      </Footer>
    </>
  );
}

export default App;
