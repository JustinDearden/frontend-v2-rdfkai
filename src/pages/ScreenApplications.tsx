import React from 'react';
import { useApplications } from '../hooks/useApplications';
import { useNavigate } from '@tanstack/react-router';
import { Application } from '../types';

const ScreenApplications: React.FC = () => {
  const { data: applications, isLoading, error } = useApplications();
  const navigate = useNavigate();

  if (isLoading) return <div>Loading applications...</div>;
  if (error) return <div>Error loading applications.</div>;
  if (!applications || applications.length === 0) {
    return <div>No applications found.</div>;
  }

  return (
    <div>
      <h1>All Applications</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {applications.map((app: Application) => (
          <li
            key={app.id}
            style={{
              marginBottom: '1rem',
              border: '1px solid #ccc',
              padding: '1rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              {/* Left side: Application details */}
              <div>
                <p>
                  <strong>ID:</strong> {app.id}
                </p>
                <p>
                  <strong>Type:</strong> {app.type}
                </p>
                <p>
                  <strong>Token:</strong> {app.token}
                </p>
                <p>
                  <strong>Created At:</strong>{' '}
                  {new Date(app.createdAt).toLocaleString()}
                </p>
                <button onClick={() => navigate({ to: `/edit/${app.id}` })}>
                  Edit
                </button>
              </div>
              {/* Right side: Applicant data */}
              <div style={{ marginLeft: '2rem' }}>
                {app.applicants && app.applicants.length > 0 ? (
                  <div>
                    <p>
                      <strong>Applicants:</strong>
                    </p>
                    {app.applicants.map((applicant, index) => (
                      <div key={index} style={{ marginBottom: '0.5rem' }}>
                        <p>
                          {applicant.firstName} {applicant.lastName}
                        </p>
                        <p>{applicant.email}</p>
                        <p>{applicant.phone}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No applicant data available</p>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate({ to: '/' })}>Return to Home</button>
    </div>
  );
};

export default ScreenApplications;
