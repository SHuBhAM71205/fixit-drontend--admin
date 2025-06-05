import React, { useEffect, useState } from 'react';
import '../css/trackRequest.css';

const backend = import.meta.env.VITE_backend;

export default function TrackRequest() {
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const getPendingReq = async () => {
      try {
        const res = await fetch(`${backend}/api/admin/viewrequests`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await res.json();
        if (res.ok) {
          setRequests(data.requests || []);
        } else {
          console.error('Error fetching requests:', data.message);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    getPendingReq();
  }, []);

  const getProgressPercent = (statusName) => {
    const map = {
      pending: 10,
      approved: 40,
      assigned: 70,
      active: 90,
      completed: 100,
    };
    return map[statusName?.toLowerCase()] || 0;
  };

  if (loading) {
    return <div className="request-track">Loading your requests...</div>;
  }

  if (!requests.length) {
    return (
      <div className="request-track flex-col">
        <div className="no-request">There is no service request to show</div>
      </div>
    );
  }

  return (
    <div className="request-track flex-col">
      {requests.map((req) => (
        <div className="track-request flex-col" key={req._id}>
          <h6 className="request-title">Request</h6>

          <div className="description">
            <strong>Description:</strong> {req.description}
          </div>

          <div><strong>Area:</strong> {req.area?.name || 'N/A'}</div>
          <div><strong>Maintenance Type:</strong> {req.tag?.name || 'N/A'}</div>
          <div><strong>Status:</strong> {req.status?.name || 'N/A'}</div>
          
          {req.taskmaster ? (
            <div><strong>Assigned To:</strong> {req.taskmaster.name}</div>
          ) : (
            <div><strong>Assigned To:</strong> Not Assigned</div>
          )}

          <fieldset className="progress-bar-container">
            <legend><h6>Progress</h6></legend>
            <div className="progress-bar-wrapper">
              <div
                className="progress-bar"
                style={{ width: `${getProgressPercent(req.status?.name)}%` }}
              ></div>
            </div>
          </fieldset>
        </div>
      ))}
    </div>
  );
}
