import React, { useState, useEffect } from 'react';
import '../css/User.css';

const backend = import.meta.env.VITE_backend;

export default function User() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [places, setPlaces] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingFilters, setLoadingFilters] = useState(true);
  const [errorUsers, setErrorUsers] = useState(null);
  const [errorFilters, setErrorFilters] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [placeFilter, setPlaceFilter] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Fetch users
  useEffect(() => {
    async function fetchUsers() {
      setLoadingUsers(true);
      try {
        const res = await fetch(`${backend}/api/admin/viewusers`, {
          method: 'GET',
          headers: {
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg0MDVkNjkzOGEwMzVjYmRhODk0NjYwIn0sImlhdCI6MTc0OTA1MjEzNn0.i4fH-pEhOMhjWA44vSFermd_vpku8LsAi3-nmdwZaOY', // replace with actual token securely
          },
        });
        if (!res.ok) throw new Error(`Failed to fetch users: ${res.status}`);
        const data = await res.json();
        setUsers(data.users); // Fix: data.users not data
      } catch (err) {
        setErrorUsers(err.message);
      } finally {
        setLoadingUsers(false);
      }
    }
    fetchUsers();
  }, []);

  // Fetch roles and areas
  useEffect(() => {
    async function fetchFilters() {
      setLoadingFilters(true);
      try {
        const [rolesRes, placesRes] = await Promise.all([
          fetch(`${backend}/api/gen/roletag`),
          fetch(`${backend}/api/gen/areatag`),
        ]);
        const rolesData = await rolesRes.json();
        const placesData = await placesRes.json();

        setRoles(rolesData.tags || []);
        setPlaces(placesData.tags || []);
      } catch (err) {
        setErrorFilters(err.message);
      } finally {
        setLoadingFilters(false);
      }
    }
    fetchFilters();
  }, []);

  // Apply filters
  useEffect(() => {
    let result = [...users];

    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(user =>
        `${user.fname} ${user.lname}`.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower)
      );
    }

    if (roleFilter) {
      result = result.filter(user => user.role?.name === roleFilter);
    }

    if (placeFilter) {
      result = result.filter(user => user.area?.name === placeFilter);
    }

    setFilteredUsers(result);
  }, [users, searchTerm, roleFilter, placeFilter]);

  if (loadingUsers || loadingFilters) return <div>Loading...</div>;
  if (errorUsers) return <div>Error loading users: {errorUsers}</div>;
  if (errorFilters) return <div>Error loading filters: {errorFilters}</div>;

  return (
    <div className="user-track">
      <h2>User Directory</h2>

      <div className="user-controls">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

        <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)}>
          <option value="">All Roles</option>
          {roles.map(role => (
            <option key={role._id} value={role.name}>{role.name}</option>
          ))}
        </select>

        <select value={placeFilter} onChange={e => setPlaceFilter(e.target.value)}>
          <option value="">All Areas</option>
          {places.map(place => (
            <option key={place._id} value={place.name}>{place.name}</option>
          ))}
        </select>
      </div>

      <ul className="user-list">
        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <li key={user._id} className="user-card">
              <img
                src={user.image || '/man-icon-illustration-vector.jpg'}
                alt={`${user.fname} ${user.lname}`}
                className="user-image"
              />
              <div className="user-info">
                <p className="user-name">{user.fname} {user.lname}</p>
                <p className="user-role">Role: {user.role?.name || 'N/A'}</p>
                <p className="user-place">Place: {user.area?.name || 'N/A'}</p>
                <p className="user-email">Email: {user.email}</p>
                <p className="user-status">Status: {user.status || 'N/A'}</p>
              </div>
            </li>
          ))
        ) : (
          <div className="no-user">No users found.</div>
        )}
      </ul>
    </div>
  );
}

