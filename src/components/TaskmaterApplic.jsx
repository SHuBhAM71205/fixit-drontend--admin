import React, { useEffect, useState } from 'react';
import '../css/TaskmasterApplications.css';

export default function TaskmasterApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // Simulated fetch call
    const dummyData = [
      {
        id: 1,
        name: 'Rahul Sharma',
        email: 'rahul@example.com',
        aadhaar: '1234-5678-9123',
        photo: 'https://via.placeholder.com/100',
        document: '/docs/rahul_taskmaster.pdf'
      },
      {
        id: 2,
        name: 'Priya Verma',
        email: 'priya@example.com',
        aadhaar: '4321-8765-3210',
        photo: 'https://via.placeholder.com/100',
        document: '/docs/priya_taskmaster.pdf'
      }
    ];
    setApplications(dummyData);
  }, []);

  const handleAction = (id, action) => {
    console.log(`${action} application with ID: ${id}`);
    setApplications(prev => prev.filter(app => app.id !== id));
  };

  return (
    <div className="applications-container">
      <h2>Taskmaster Applications</h2>
      {applications.length === 0 ? (
        <p className="no-applications">No pending applications.</p>
      ) : (
        applications.map(app => (
          <div key={app.id} className="application-card">
            <img src={app.photo} alt="Applicant" className="app-photo" />
            <div className="app-info">
              <h3>{app.name}</h3>
              <p><strong>Email:</strong> {app.email}</p>
              <p><strong>Aadhaar:</strong> {app.aadhaar}</p>
              <a href={app.document} target="_blank" rel="noopener noreferrer" className="view-doc">📄 View Document</a>
              <div className="action-buttons">
                <button className="accept-btn" onClick={() => handleAction(app.id, 'Accepted')}>✅ Accept</button>
                <button className="reject-btn" onClick={() => handleAction(app.id, 'Rejected')}>❌ Reject</button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
