import React, { useEffect, useState } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repository, setRepository] = useState([])
  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Desafio ReactJS'
    })

    setRepository([...repository, response.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    const repositoryList = repository.filter(item => item.id !== id)

    setRepository(repositoryList)
  }

  useEffect(() => {
    api.get('repositories').then( response => setRepository(response.data))
  },
  [])

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repository.map( item=> (
          <li key={item.id}>
            {item.title}

            <button onClick={() => handleRemoveRepository(item.id)}>
              Remover
            </button>
          </li>
          ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
