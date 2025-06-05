import React, { useEffect, useState } from 'react';
import '../css/TaskmasterApplications.css';
const backend = import.meta.env.VITE_backend;

export default function TaskmasterApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // Simulated fetch call
    const getapplicant = async (params) => {
      try {
        const data = await fetch(`${backend}/api/admin/showuserapplytaskmaster`, {
          method: 'GET',
          headers: {
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg0MDVkNjkzOGEwMzVjYmRhODk0NjYwIn0sImlhdCI6MTc0OTA1MjEzNn0.i4fH-pEhOMhjWA44vSFermd_vpku8LsAi3-nmdwZaOY'

          }
        })
        const refinedata = await data.json();

        setApplications(refinedata.applications);
      } catch (error) {
        console.log(error)
      }
    }
    getapplicant()

  }, []);

  const handleAction = async(id, action) => {
    console.log(`${action} application with ID: ${id}`);
    if(action=='Accepted')
    {try{
      const data = await fetch(`${backend}/api/admin/makeusertaskmaster/${id}`, {
          method: 'PUT',
          headers: {
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg0MDVkNjkzOGEwMzVjYmRhODk0NjYwIn0sImlhdCI6MTc0OTA1MjEzNn0.i4fH-pEhOMhjWA44vSFermd_vpku8LsAi3-nmdwZaOY'

          }
        })
        const refinedata = await data.json();
        console.log(refinedata)
      } catch (error) {
        console.log(error)
      }
    }
    else{
      
    }
    setApplications(prev => prev.filter(app => app.id !== id));
  };

  return (
    <div className="applications-container">
      <h2>Taskmaster Applications</h2>
      {applications.length === 0 ? (
        <p className="no-applications">No pending applications.</p>
      ) : (
        applications.map(app => (
          <div key={app._id} className="application-card">
            {/* <img src={app.photo} alt="Applicant" className="app-photo" /> */}
            <div className="app-info">
              <h3>{app.name}</h3>
              <p><strong>Email:</strong> {app.email}</p>
              <p><strong>Aadhaar:</strong> {app.aadhaar}</p>
              <a href={app.document} target="_blank" rel="noopener noreferrer" className="view-doc">📄 View Document</a>
              <div className="action-buttons">
                <button className="accept-btn" onClick={() => handleAction(app._id, 'Accepted')}>✅ Accept</button>
                <button className="reject-btn" onClick={() => handleAction(app._id, 'Rejected')}>❌ Reject</button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
