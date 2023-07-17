/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
export const UserList = ({onSelectUser}) => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
  });
  const [selectUserId, setSelectUserId] = useState(null);
  const [editModalOpen, seteditModalOpen] = useState(false);

  useEffect(() => {
    const url = "https://jsonplaceholder.typicode.com/users";
    fetch(url)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  }, []);

  const handleInputCharge = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newUser.id) {
      const url = `https://jsonplaceholder.typicode.com/users/${newUser.id}`;
      fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      })
        .then((response) => response.json())
        .then((data) => {
          setUsers((prevUser) =>
            prevUser.map((user) =>
              user.id === newUser.id ? { ...user, ...newUser } : user
            )
          );
          setNewUser({
            id:null,
            name:"",
            username:"",
            email:"",
            phone:"",
          });
        })
        .catch((error)=>console.log(error));
    }else{
        const url = "https://jsonplaceholder.typicode.com/users";
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((response) => response.json())
          .then((data) => {
            setUsers((prevUser) => [...prevUser, data]);
            setNewUser({ name: "", username: "", email: "", phone: "" });
          })
          .catch((error) => console.log(error)); 
    }
  };

  const handleEdit = (user)=>{
    setNewUser(user);
  }

  const handleDelete = (userId) => {
    const url = `https://jsonplaceholder.typicode.com/users/${userId}`;
    fetch(url, {
      method: "DELETE",
    })
      .then(() => {
        setUsers((prevUser) => prevUser.filter((user) => user.id !== userId));
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h1>Nuevo Usuario</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            style={{ marginLeft: "5px",cursor:'pointer' }}
            type="text"
            name="name"
            value={newUser.name}
            onChange={handleInputCharge}
          />
        </label>
        <br />
        <label>
          Usuario:
          <input
            style={{ marginLeft: "5px" }}
            type="text"
            name="username"
            value={newUser.username}
            onChange={handleInputCharge}
          />
        </label>
        <br />
        <label>
          Correo:
          <input
            style={{ marginLeft: "5px" }}
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleInputCharge}
          />
        </label>
        <br />
        <label>
          Telefono:
          <input
            style={{ marginLeft: "5px" }}
            type="text"
            name="phone"
            value={newUser.phone}
            onChange={handleInputCharge}
          />
        </label>
        <br />
        <button
          type="submit"
          style={{ marginTop: "30px", backgroundColor: "lightblue" }}
        >
         {newUser.id ? "Guardar Edicion" : "Crear Nuevo Usuario"}
        </button>
      </form>
      <h1>Lista de Usuarios</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Usuario</th>
            <th>Correo</th>
            <th>Telefono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} onClick={() => onSelectUser(user.id)}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <a
                  href="#"
                  onClick={() => handleEdit(user)}
                  style={{ color: "blue", fontWeight: "500", margin: "5px" }}
                >
                  Editar
                </a>
                <a
                  href="#"
                  onClick={() => handleDelete(user.id)}
                  style={{ color: "red", fontWeight: "500", margin: "5px" }}
                >
                  Eliminar
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
