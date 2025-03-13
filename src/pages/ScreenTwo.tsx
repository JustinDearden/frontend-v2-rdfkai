import React, { useEffect } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import Card from '../components/Card';
import { Applicant } from '../types';
import { useApplicationById } from '../hooks/useApplicationById';
import { useUpdateApplicants } from '../hooks/useUpdateApplicants';
import { useSelectedProduct } from '../context/SelectedProductContext';
import { CardProduct } from '../pages/ScreenOne';

// Conversion helper for MortgageProduct from context
const toCardProduct = (product: {
  id: number;
  name: string;
  type: 'FIXED' | 'VARIABLE';
  bestRate: number;
  lenderName: string;
}): CardProduct => ({
  id: product.id,
  type: product.type === 'FIXED' ? 'Fixed' : 'Variable',
  productName: product.name,
  bestRate: product.bestRate,
  bestLender: product.lenderName,
});

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

const ScreenTwo = () => {
  const navigate = useNavigate();
  const { appId } = useParams({ from: '/edit/$appId' });
  const { selectedProduct } = useSelectedProduct();

  const { data: application, isLoading, error } = useApplicationById(appId);
  const updateApplicants = useUpdateApplicants();

  // Initialize the form with react-hook-form
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

  useEffect(() => {
    if (application && application.applicants.length > 0 && !isDirty) {
      const applicant = application.applicants[0];
      reset({
        firstName: applicant.firstName || '',
        lastName: applicant.lastName || '',
        email: applicant.email || '',
        phone: applicant.phone || '',
      });
    }
  }, [application, reset, isDirty]);

  if (isLoading) return <div>Loading application...</div>;
  if (error || !application) {
    return (
      <div>
        No application found. Please go back and select a product.
        <button onClick={() => navigate({ to: '/' })}>Go Back</button>
      </div>
    );
  }

  if (!selectedProduct) {
    return (
      <div>
        No product selected. Please go back and select a product.
        <button onClick={() => navigate({ to: '/' })}>Go Back</button>
      </div>
    );
  }

  const onSubmit = (data: FormData) => {
    updateApplicants.mutate({
      applicationId: application.id,
      applicants: [data as Applicant],
    });
  };

  return (
    <div>
      <h1>Edit Application</h1>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        {/* Left side: Display product information from the context */}
        <div>
          <Card product={toCardProduct(selectedProduct)} onSelect={() => {}} />
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
      <button onClick={() => navigate({ to: '/' })}>Return</button>
    </div>
  );
};

export default ScreenTwo;
