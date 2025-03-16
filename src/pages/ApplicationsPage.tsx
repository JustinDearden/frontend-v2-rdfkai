import React from 'react';
import { useApplications } from '../hooks/useApplications';
import { useNavigate } from '@tanstack/react-router';
import { Application } from '../types';
import './ApplicationsPage.scss';

const ApplicationsPage: React.FC = () => {
  const { data: applications, isLoading, error } = useApplications();
  const navigate = useNavigate();

  if (isLoading) return <div>Loading applications...</div>;
  if (error) return <div>Error loading applications.</div>;
  if (!applications || applications.length === 0) {
    return <div>No applications found.</div>;
  }

  return (
    <div className="applications-page">
      <h1 className="applications-page__title">All Applications</h1>
      <ul className="applications-page__list">
        {applications.map((app: Application) => (
          <li className="applications-page__item" key={app.id}>
            <div className="applications-page__item-content">
              {/* Left side: Application details */}
              <div className="applications-page__item-left">
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
              <div className="applications-page__item-right">
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
      <button
        className="applications-page__return"
        onClick={() => navigate({ to: '/' })}
      >
        Return to Home
      </button>
    </div>
  );
};

export default ApplicationsPage;
