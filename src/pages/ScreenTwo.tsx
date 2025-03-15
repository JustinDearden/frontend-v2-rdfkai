import React, { useEffect, useCallback, useState } from 'react';
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
import Toast from '../components/Toast';
import { useTranslation } from 'react-i18next';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const ScreenTwo: React.FC = () => {
  const { t } = useTranslation();
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
    formState: { errors, isDirty },
  } = useForm<FormData>({
    defaultValues: { firstName: '', lastName: '', email: '', phone: '' },
  });

  // Use rate limiting: allow up to 3 clicks in 5 seconds.
  const { isRateLimited, registerClick } = useRateLimit(3, 5000);

  // State for toast message
  const [toastMessage, setToastMessage] = useState('');

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
        // Set toast message on successful submission
        setToastMessage(t('editPage.successAPIMessage'));
      }
    },
    [application, isRateLimited, registerClick, updateApplicants],
  );

  if (isLoading)
    return (
      <div className="screen-two__message">{t('editPage.loadingMessage')}</div>
    );

  if (error || !application) {
    return (
      <div className="screen-two__message">
        <p>{t('editPage.noApplicationMessage')}</p>
        <button onClick={() => navigate({ to: '/' })}>
          {t('editPage.backButton')}
        </button>
      </div>
    );
  }

  const productToDisplay =
    selectedProduct ??
    products?.find((p) => p.id === application.productId) ??
    null;

  if (!productToDisplay) {
    return (
      <div className="screen-two__message">
        <p>{t('editPage.noProductFound')}</p>
        <button onClick={() => navigate({ to: '/' })}>
          {t('editPage.backButton')}
        </button>
      </div>
    );
  }

  return (
    <div className="screen-two">
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
            {t('editPage.selectApplicationButton')}
          </button>
        </div>

        {/* Right Column: Form Box */}
        <div className="screen-two__right">
          <h2>{t('editPage.mainApplicantTitle')}</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="firstName">{t('form.firstName')}</label>
              <input
                id="firstName"
                {...register('firstName', {
                  required: 'First name is required',
                })}
              />
              {errors.firstName && (
                <span className="error">{t('form.errors.firstNameError')}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="lastName">{t('form.lastName')}</label>
              <input
                id="lastName"
                {...register('lastName', {
                  required: 'Last name is required',
                })}
              />
              {errors.lastName && (
                <span className="error">{t('form.errors.lastNameError')}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="email">{t('form.email')}</label>
              <input
                id="email"
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email address',
                  },
                })}
              />
              {errors.email && (
                <span className="error">{t('form.errors.emailError')}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="phone">{t('form.phone')}</label>
              <input
                id="phone"
                {...register('phone', {
                  required: 'Phone number is required',
                })}
              />
              {errors.phone && (
                <span className="error">{t('form.errors.phoneError')}</span>
              )}
            </div>
            <button type="submit" disabled={isRateLimited}>
              {isRateLimited ? t('form.rateLimited') : t('form.submitButton')}
            </button>
          </form>
        </div>
      </div>
      {/* Toast Component */}
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage('')} />
      )}
    </div>
  );
};

export default ScreenTwo;
