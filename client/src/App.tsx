import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: #CCC;
  display: grid;
  place-content: center;
`;

function App() {
  const [apiResponse, setAPIResponse] = useState([]);
  
  useEffect(() => {
    fetch("/api/tasks")
      .then(res => res.text())
      .then(data => JSON.parse(data))
      .then(res => [...Object.values(res)])
      .then(arr => setAPIResponse(arr))
    }, []);
    
    return (
      <div>
      <main>
        <Container>
          📋 TODOs:
          <ul>
          {
            (apiResponse).map((el) => (
              <li key={el.id}>{el.text}</li>
              ))
            }
          </ul>
        </Container>
      </main>
    </div>
  );
}

export default App;
