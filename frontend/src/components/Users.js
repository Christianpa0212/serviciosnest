// src/components/Users.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './user.css';

function Users() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', paterno: '', materno: '', email: '' });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get('http://localhost:3001/users');
    setUsers(response.data);
  };

  const handleAddUser = async () => {
    await axios.post('http://localhost:3001/users', newUser);
    fetchUsers();
    setNewUser({ name: '', paterno: '', materno: '', email: '' });
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser({ name: user.name, paterno: user.paterno, materno: user.materno, email: user.email });
  };

  const handleUpdateUser = async () => {
    await axios.patch(`http://localhost:3001/users/${editingUser._id}`, newUser);
    fetchUsers();
    setEditingUser(null);
    setNewUser({ name: '', paterno: '', materno: '', email: '' });
  };

  const handleDeleteUser = async (userId) => {
    await axios.delete(`http://localhost:3001/users/${userId}`);
    fetchUsers();
  };

  return (
    <div className="user-container">
      <h2>Usuarios</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Paterno</th>
            <th>Materno</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.paterno}</td>
              <td>{user.materno}</td>
              <td>{user.email}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEditUser(user)}>Editar</button>
                <button className="delete-btn" onClick={() => handleDeleteUser(user._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>{editingUser ? 'Editar Usuario' : 'Agregar Usuario'}</h3>
      <div className="user-form">
        <input
          type="text"
          placeholder="Nombre"
          value={newUser.name}
          onChange={e => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Paterno"
          value={newUser.paterno}
          onChange={e => setNewUser({ ...newUser, paterno: e.target.value })}
        />
        <input
          type="text"
          placeholder="Materno"
          value={newUser.materno}
          onChange={e => setNewUser({ ...newUser, materno: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={e => setNewUser({ ...newUser, email: e.target.value })}
        />
        <button className="submit-btn" onClick={editingUser ? handleUpdateUser : handleAddUser}>
          {editingUser ? 'Actualizar' : 'Agregar'}
        </button>
      </div>
    </div>
  );
}

export default Users;
