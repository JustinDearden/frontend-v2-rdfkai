import React, { useEffect, useCallback } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useForm, SubmitHandler } from 'react-hook-form';
import Card from '../components/Card';
import { Applicant } from '../types';
import { useApplicationById } from '../hooks/useApplicationById';
import { useUpdateApplicants } from '../hooks/useUpdateApplicants';
import { toCardProduct } from '../helper/productHelpers';
import { useSelectedProduct } from '../hooks/useSelectedProduct';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const ScreenTwo: React.FC = () => {
  const navigate = useNavigate();
  const { appId } = useParams({ from: '/edit/$appId' });
  const { selectedProduct } = useSelectedProduct();

  const { data: application, isLoading, error } = useApplicationById(appId);
  const { mutate: updateApplicants } = useUpdateApplicants();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<FormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
  });

  // Pre-populate form fields if an applicant exists and the user hasn't modified the form.
  useEffect(() => {
    if (application && application.applicants.length > 0 && !isDirty) {
      const { firstName, lastName, email, phone } = application.applicants[0];
      reset({
        firstName: firstName || '',
        lastName: lastName || '',
        email: email || '',
        phone: phone || '',
      });
    }
  }, [application, isDirty, reset]);

  // Memoize the onSubmit handler for performance.
  const onSubmit: SubmitHandler<FormData> = useCallback(
    (data: FormData) => {
      if (application) {
        updateApplicants({
          applicationId: application.id,
          applicants: [data as Applicant],
        });
      }
    },
    [application, updateApplicants],
  );

  // Handle different loading or error states.
  if (isLoading) return <div>Loading application...</div>;
  if (error || !application) {
    return (
      <div>
        <p>No application found. Please go back and select a product.</p>
        <button onClick={() => navigate({ to: '/' })}>Go Back</button>
      </div>
    );
  }
  if (!selectedProduct) {
    return (
      <div>
        <p>No product selected. Please go back and select a product.</p>
        <button onClick={() => navigate({ to: '/' })}>Go Back</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Edit Application</h1>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        {/* Left side: Display product information from context */}
        <div>
          <Card
            product={toCardProduct(selectedProduct)}
            onSelect={() => navigate({ to: '/' })}
            buttonLabel="Return"
          />
        </div>
        {/* Right side: Form to update applicant information */}
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
      <button onClick={() => navigate({ to: '/applications' })}>
        Select another application
      </button>
    </div>
  );
};

export default ScreenTwo;
