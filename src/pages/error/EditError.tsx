import React from 'react';
import { useNavigate } from '@tanstack/react-router';

const EditError: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="error-page">
      <h2>Missing Application ID</h2>
      <p>Please select a valid application.</p>
      <button onClick={() => navigate({ to: '/' })}>Back to Home</button>
    </div>
  );
};

export default EditError;
