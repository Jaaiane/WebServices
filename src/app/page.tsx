'use client'
import React, { useState, useEffect } from 'react';
import Api from '../services/Api';
import { v4 as uuidv4 } from 'uuid';

const App: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [newPostData, setNewPostData] = useState({ title: '', body: '' });

  useEffect(() => {
    Api.get('/posts').then(response => {
      setPosts(response.data);
    });
  }, []);

  const handleAddPost = async () => {
    const newPost = {
      id: uuidv4(),
      ...newPostData,
    };

    await Api.post('/posts', newPost);
    setPosts([...posts, newPost]);
    setNewPostData({ title: '', body: '' }); // Limpa os dados do formulário após a submissão
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPostData({ ...newPostData, [name]: value });
  };

  return (
    <div>
      <h1>Carros</h1>
      <form onSubmit={handleAddPost}>
        <input
          type="text"
          placeholder="nome"
          name="title"
          value={newPostData.title}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="marca"
          name="body"
          value={newPostData.body}
          onChange={handleChange}
        />
        <button type="submit">Add Cars</button>
      </form>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
