import React, { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import Card from '../components/Card';
import { Applicant } from '../types';
import { useApplication } from '../context/ApplicationContext';
import { useUpdateApplicants } from '../hooks/useUpdateApplicants';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

const ScreenTwo = () => {
  const navigate = useNavigate();
  const { application } = useApplication();
  const updateApplicants = useUpdateApplicants();
  const { register, handleSubmit } = useForm<FormData>();

  useEffect(() => {
    console.log('Component mounted on page load');

    // Optional cleanup function
    return () => {
      console.log('Component will unmount');
    };
  }, []);

  if (!application) {
    return (
      <div>No application found. Please go back and select a product.</div>
    );
  }

  const onSubmit = (data: FormData) => {
    updateApplicants.mutate({
      applicationId: application.id,
      applicants: [data as Applicant],
    });
  };

  const handleReturn = () => {
    navigate({ to: '/' });
  };

  return (
    <div>
      <h1>Screen Two</h1>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        {/* Left side: Displaying product information */}
        <div>
          {/* You can enhance this component to show additional product details */}
          <Card
            product={{
              id: application.productId?.toString() || '',
              type: 'Fixed', // If you need to store type, include it in the application or another context
              productName: 'Product Name Placeholder',
              bestRate: 0,
              bestLender: 'Lender Placeholder',
            }}
          />
        </div>
        {/* Right side: Form to capture applicant data */}
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                {...register('firstName', { required: true })}
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                {...register('lastName', { required: true })}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                {...register('email', { required: true })}
              />
            </div>
            <div>
              <label htmlFor="phone">Phone</label>
              <input id="phone" {...register('phone', { required: true })} />
            </div>
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
      <button onClick={handleReturn}>Return</button>
    </div>
  );
};

export default ScreenTwo;
