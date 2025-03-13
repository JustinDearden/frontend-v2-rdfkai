import { useNavigate } from '@tanstack/react-router';

const ScreenTwo = () => {
  const navigate = useNavigate();
  const handleSelect = () => {
    // Navigate to the /edit route, passing the product id as a query parameter (or use state)
    navigate({ to: '/' });
  };
  return (
    <>
      <h1>Screen Two</h1>
      <button onClick={handleSelect}>Return</button>
    </>
  );
};

export default ScreenTwo;

import { useState } from 'react';
import { useCreateApplication } from '../hooks/useCreateApplication';
import { useUpdateApplicants } from '../hooks/useUpdateApplicants';

const EditPage = ({ productId }: { productId: number }) => {
  const { applicationId, isLoading: isCreating } =
    useCreateApplication(productId);
  const updateApplicants = useUpdateApplicants();

  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    firstName: '',
    lastName: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!applicationId) return;

    updateApplicants.mutate({
      applicationId,
      applicants: [formData], // API expects an array of applicants
    });
  };

  return (
    <div>
      {isCreating && <p>Creating application...</p>}
      {applicationId && (
        <form>
          <input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
          <input
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={handleSave}
            disabled={updateApplicants.isLoading}
          >
            {updateApplicants.isLoading ? 'Saving...' : 'Save'}
          </button>
        </form>
      )}
    </div>
  );
};
