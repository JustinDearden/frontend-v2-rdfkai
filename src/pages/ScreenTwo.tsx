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
import { useRateLimit } from '../hooks/useThrottle';
import './ScreenTwo.scss';

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
    defaultValues: { firstName: '', lastName: '', email: '', phone: '' },
  });

  // Use rate limiting: allow up to 3 clicks in 5 seconds.
  const { isRateLimited, registerClick } = useRateLimit(3, 5000);

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

  // Update selected product based on application.productId.
  useEffect(() => {
    if (application?.productId && products?.length) {
      const matchedProduct = products.find(
        (p) => p.id === application.productId,
      );
      if (matchedProduct && selectedProduct?.id !== matchedProduct.id) {
        setSelectedProduct(matchedProduct);
      }
    }
  }, [application, products, selectedProduct, setSelectedProduct]);

  const onSubmit: SubmitHandler<FormData> = useCallback(
    (data: FormData) => {
      registerClick();
      if (isRateLimited) return;
      if (application) {
        updateApplicants({
          applicationId: application.id,
          applicants: [data as Applicant],
        });
      }
    },
    [application, isRateLimited, registerClick, updateApplicants],
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
    <div className="screen-two">
      <h1 className="screen-two__title">Edit Application</h1>

      <div className="screen-two__content">
        {/* Left Column: Card + "Select another application" */}
        <div className="screen-two__left">
          <Card
            product={toCardProduct(productToDisplay)}
            onSelect={() => navigate({ to: '/' })}
            buttonLabel="Return"
          />
          <button
            className="screen-two__select-another"
            onClick={() => navigate({ to: '/applications' })}
          >
            Select another application
          </button>
        </div>

        {/* Right Column: Form Box */}
        <div className="screen-two__right">
          <h2>Main Applicant Information</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                {...register('firstName', { required: true })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                {...register('lastName', { required: true })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                {...register('email', { required: true })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input id="phone" {...register('phone', { required: true })} />
            </div>
            <button type="submit" disabled={isRateLimited}>
              {isRateLimited ? 'Rate limited, wait...' : 'Save Applicant Info'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ScreenTwo;
