import React, { useEffect, useState } from 'react';
import '../css/Seeting.css'
const backend = import.meta.env.VITE_backend;

export default function Settings() {
  const [location, setLocation] = useState('');
  const [maintTag, setMaintTag] = useState('');
  const [statusTag, setStatusTag] = useState('');

  const [locations, setLocations] = useState([]);
  const [maintTags, setMaintTags] = useState([]);
  const [statusTags, setStatusTags] = useState([]);

  // Fetch all tags from backend
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const [locRes, maintRes, statusRes] = await Promise.all([
          fetch(`${backend}/api/gen/areatag`),
          fetch(`${backend}/api/gen/mainttag`),
          fetch(`${backend}/api/gen/roletag`)
        ]);

        const [locData, maintData, statusData] = await Promise.all([
          locRes.json(),
          maintRes.json(),
          statusRes.json()
        ]);
        console.log(locData.tags)
        setLocations(locData.tags);
        setMaintTags(maintData.tags);
        setStatusTags(statusData.tags);

      } catch (err) {
        console.error('Error fetching tags:', err);
      }
    };

    fetchTags();
  }, []);

  const handleAdd = (nam,value, setter, listSetter) => {
    
    fetch(`${backend}/api/admin/addtag/${nam}`,{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        'name':value
      })
    })
    
    if (value.trim()) {
      listSetter(prev => [...prev, value.trim()]);
      // You can add a POST request here to save it in DB
      setter('');
    }
  };

  const handleDelete = (index, list, setList) => {
    let nam=''
    
    if (list===locations) {
      nam='area'
    }
    else if (list===setMaintTags) {
      nam='maint'
    }
    else{
      nam='role'
    }

    fetch(`${backend}/api/admin/deletetag/${nam}/${index}`,{
      method:'DELETE',
      headers:{
        'Content-Type': 'application/json',
        'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg0MDVkNjkzOGEwMzVjYmRhODk0NjYwIn0sImlhdCI6MTc0OTA1MjEzNn0.i4fH-pEhOMhjWA44vSFermd_vpku8LsAi3-nmdwZaOY'
      }
    })

      setList(list.filter(item=>item._id!=index))
   
  };

  const renderTags = (list, setList) =>
    list.map((obj) => (
      <span key={obj._id} className="tag">
        {obj.name}
        <button className="delete-btn" onClick={() => handleDelete(obj._id, list, setList)}>✖</button>
      </span>
    ));

  return (
    <div className="settings-container">
      <h2>Settings</h2>

      {/* Location */}
      <div className="setting-block">
        <label>Add Location:</label>
        <div className="input-group">
          <input
            value={location}
            onChange={e => setLocation(e.target.value)}
            placeholder="e.g., Delhi"
          />
          <button onClick={() => handleAdd('area',location, setLocation, setLocations)}>Add</button>
        </div>
        <div className="tag-list">{renderTags(locations, setLocations)}</div>
      </div>

      {/* Maintenance Tags */}
      <div className="setting-block">
        <label>Add Maintenance Tag:</label>
        <div className="input-group">
          <input
            value={maintTag}
            onChange={e => setMaintTag(e.target.value)}
            placeholder="e.g., Plumbing"
          />
          <button onClick={() => handleAdd('maint',maintTag, setMaintTag, setMaintTags)}>Add</button>
        </div>
        <div className="tag-list">{renderTags(maintTags, setMaintTags)}</div>
      </div>

      {/* Status Tags */}
      <div className="setting-block">
        <label>Add Role Tag:</label>
        <div className="input-group">
          <input
            value={statusTag}
            onChange={e => setStatusTag(e.target.value)}
            placeholder="e.g., Admin"
          />
          <button onClick={() => handleAdd('role',statusTag, setStatusTag, setStatusTags)}>Add</button>
        </div>
        <div className="tag-list">{renderTags(statusTags, setStatusTags)}</div>
      </div>
    </div>
  );
}
