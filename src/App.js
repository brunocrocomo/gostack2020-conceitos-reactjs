import React, { useState, useEffect } from 'react';

import './styles.css';
import api from './services/api';

function App() {
    const [repositories, setRepositories] = useState([]);

    useEffect(() => {
        async function fetchRepositories() {
            const response = await api.get('repositories');
            setRepositories(response.data);
        }

        fetchRepositories();
    }, []);

    async function handleAddRepository() {
        const response = await api.post('repositories', {
            title: `Novo repositório ${Date.now()}`,
            url: 'https://www.github.com/repo',
            techs: ['Node.js', 'ReactJS'],
        });

        const repository = response.data;

        setRepositories([...repositories, repository]);
    }

    async function handleRemoveRepository(id) {
        // TODO
    }

    return (
        <div>
            <ul data-testid='repository-list'>
                {repositories.map(repository => (
                    <li key={repository.id}>
                        {repository.title}
                        <button
                            onClick={() =>
                                handleRemoveRepository(repository.id)
                            }
                        >
                            Remover
                        </button>
                    </li>
                ))}
            </ul>

            <button onClick={handleAddRepository}>Adicionar</button>
        </div>
    );
}

export default App;
