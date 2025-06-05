import React, { useState } from 'react';
import '../css/Setting.css';

export default function Settings() {
  const [location, setLocation] = useState('');
  const [maintTag, setMaintTag] = useState('');
  const [statusTag, setStatusTag] = useState('');
  const [otherTag, setOtherTag] = useState('');

  const [locations, setLocations] = useState([]);
  const [maintTags, setMaintTags] = useState([]);
  const [statusTags, setStatusTags] = useState([]);
  const [otherTags, setOtherTags] = useState([]);

  const handleAdd = (value, setter, listSetter) => {
    if (value.trim()) {
      listSetter(prev => [...prev, value.trim()]);
      setter('');
    }
  };

  const handleDelete = (index, list, setList) => {
    const updated = [...list];
    updated.splice(index, 1);
    setList(updated);
  };

  const renderTags = (list, setList) =>
    list.map((item, idx) => (
      <span key={idx} className="tag">
        {item}
        <button className="delete-btn" onClick={() => handleDelete(idx, list, setList)}>✖</button>
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
          <button onClick={() => handleAdd(location, setLocation, setLocations)}>Add</button>
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
          <button onClick={() => handleAdd(maintTag, setMaintTag, setMaintTags)}>Add</button>
        </div>
        <div className="tag-list">{renderTags(maintTags, setMaintTags)}</div>
      </div>

      {/* Status Tags */}
      <div className="setting-block">
        <label>Add Status Tag:</label>
        <div className="input-group">
          <input
            value={statusTag}
            onChange={e => setStatusTag(e.target.value)}
            placeholder="e.g., Completed"
          />
          <button onClick={() => handleAdd(statusTag, setStatusTag, setStatusTags)}>Add</button>
        </div>
        <div className="tag-list">{renderTags(statusTags, setStatusTags)}</div>
      </div>

      {/* Other Tags */}
      <div className="setting-block">
        <label>Add Other Tag:</label>
        <div className="input-group">
          <input
            value={otherTag}
            onChange={e => setOtherTag(e.target.value)}
            placeholder="e.g., Urgent"
          />
          <button onClick={() => handleAdd(otherTag, setOtherTag, setOtherTags)}>Add</button>
        </div>
        <div className="tag-list">{renderTags(otherTags, setOtherTags)}</div>
      </div>
    </div>
  );
}
