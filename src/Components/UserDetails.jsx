// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';

// eslint-disable-next-line react/prop-types
export const UserDetails = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const url = `https://jsonplaceholder.typicode.com/users/${userId}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.log(error));
  }, [userId]);

  useEffect(() => {
    const url = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.log(error));
  }, [userId]);

  return (
    <div>
      <h2>Detalle de Usuario</h2>
      {user && (  //verificación de la nulidad para user
        <div style={{justifyContent:'left'}}>
          <h3>Nombre: {user.name}</h3>
          <h4>Usuario: {user.username}</h4>
          <h4>Correo: {user.email}</h4>
          <h4>Teléfono: {user.phone}</h4>
        </div>
      )}

      <h3>Información</h3>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h4 style={{textTransform:'uppercase'}}>{post.title}</h4>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
