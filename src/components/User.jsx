import React, { useState, useEffect } from 'react';
import '../css/User.css';

const dummyUsers = [
  {
    id: 1,
    name: 'Alice Sharma',
    role: 'User',
    place: 'Delhi',
    email: 'alice@example.com',
    status: 'Active',
    image: '/default-avatar.png'
  },
  {
    id: 2,
    name: 'Ravi Kumar',
    role: 'Taskmaster',
    place: 'Mumbai',
    email: 'ravi@example.com',
    status: 'Pending',
    image: '/default-avatar.png'
  },
  {
    id: 3,
    name: 'Nina Mehra',
    role: 'Admin',
    place: 'Kolkata',
    email: 'nina@example.com',
    status: 'Inactive',
    image: '/default-avatar.png'
  },
  {
    id: 4,
    name: 'John Doe',
    role: 'User',
    place: 'Delhi',
    email: 'john@example.com',
    status: 'Active',
    image: '/default-avatar.png'
  },
  {
    id: 5,
    name: 'Fatima Khan',
    role: 'Taskmaster',
    place: 'Hyderabad',
    email: 'fatima@example.com',
    status: 'Active',
    image: '/default-avatar.png'
  }
];

export default function User() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [placeFilter, setPlaceFilter] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(dummyUsers);

  useEffect(() => {
    let result = dummyUsers;

    if (searchTerm.trim()) {
      result = result.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (roleFilter) {
      result = result.filter(user => user.role === roleFilter);
    }

    if (placeFilter) {
      result = result.filter(user => user.place === placeFilter);
    }

    setFilteredUsers(result);
  }, [searchTerm, roleFilter, placeFilter]);

  return (
    <div className="user-track">
      <h2>User Directory</h2>

      <div className="user-controls">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          aria-label="Search user by name"
        />

        <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)}>
          <option value="">All Roles</option>
          <option value="User">User</option>
          <option value="Taskmaster">Taskmaster</option>
          <option value="Admin">Admin</option>
        </select>

        <select value={placeFilter} onChange={e => setPlaceFilter(e.target.value)}>
          <option value="">All Places</option>
          <option value="Delhi">Delhi</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Kolkata">Kolkata</option>
          <option value="Hyderabad">Hyderabad</option>
        </select>
      </div>

      <div className="user-list">
        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <li key={user.id} className="user-card">
              <img src={user.image} alt={user.name} className="user-image" />
              <div className="user-info">
                <p className="user-name">{user.name}</p>
                <p className="user-role">Role: {user.role}</p>
                <p className="user-place">Place: {user.place}</p>
                <p className="user-email">Email: {user.email}</p>
                <p className="user-status">Status: {user.status}</p>
              </div>
            </li>
          ))
        ) : (
          <div className="no-user">No users found.</div>
        )}
      </div>
    </div>
  );
}
