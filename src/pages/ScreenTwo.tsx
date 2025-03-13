import React, { useEffect, useCallback } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useForm, SubmitHandler } from 'react-hook-form';
import Card from '../components/Card';
import { Applicant } from '../types';
import { useApplicationById } from '../hooks/useApplicationById';
import { useUpdateApplicants } from '../hooks/useUpdateApplicants';
import { toCardProduct } from '../helper/productHelpers';
import { useProducts } from '../hooks/useProduct';
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
  const { selectedProduct, setSelectedProduct } = useSelectedProduct();
  const { data: application, isLoading, error } = useApplicationById(appId);
  const { data: products } = useProducts();
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

  // Pre-populate form with applicant data if available.
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

  // If no product is in context, try to match using application.productId and cached products.
  useEffect(() => {
    if (application?.productId && products?.length) {
      const matchedProduct = products.find(
        (p) => p.id === application.productId,
      );
      // Update the selected product if it doesn't match the new application's productId.
      if (matchedProduct && selectedProduct?.id !== matchedProduct.id) {
        setSelectedProduct(matchedProduct);
      }
    }
  }, [application, products, setSelectedProduct, selectedProduct]);

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

  if (isLoading) return <div>Loading application...</div>;
  if (error || !application) {
    return (
      <div>
        <p>No application found. Please go back and select a product.</p>
        <button onClick={() => navigate({ to: '/' })}>Go Back</button>
      </div>
    );
  }

  // Determine the product to display: either from context or from cached products.
  const productToDisplay =
    selectedProduct ??
    products?.find((p) => p.id === application.productId) ??
    null;

  if (!productToDisplay) {
    return (
      <div>
        <p>
          No product found for this application. Please go back and select a
          product.
        </p>
        <button onClick={() => navigate({ to: '/' })}>Go Back</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Edit Application</h1>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        {/* Left side: Display associated product */}
        <div>
          <Card
            product={toCardProduct(productToDisplay)}
            onSelect={() => navigate({ to: '/' })}
            buttonLabel="Return"
          />
        </div>
        {/* Right side: Form for applicant information */}
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
