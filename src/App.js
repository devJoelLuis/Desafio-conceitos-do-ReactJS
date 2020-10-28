import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [ repositories, setRepositories ] = useState([]);

  useEffect(() => {
     api.get('/repositories').then( ret => {
       setRepositories(ret.data);
     })
  }, []);

  async function handleAddRepository() {
     const ret = await api.post('/repositories', { 
      title: `repositorio ${Date.now()}`,
      url: `https://gitbub.com/${Date.now()}`,
      techs: [ 'tech1', 'tech2', 'tech3' ],
      });
      const repository = ret.data;
      setRepositories([... repositories, repository]);
  }

  async function handleRemoveRepository(id) {
     api.delete(`/repositories/${id}`).then(() => {
       setRepositories(repositories.filter( r => r.id != id));
     })
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map( r => 
          <li key={ r.id }>
           { r.title }

          <button onClick={() => handleRemoveRepository( r.id )}>
            Remover
          </button>
        </li>
        ) }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
