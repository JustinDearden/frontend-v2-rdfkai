'use client';

import type React from 'react';
import { useEffect, useCallback, useState } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useForm, type SubmitHandler } from 'react-hook-form';
import Card from '../components/Card';
import type { Applicant } from '../types';
import { useApplicationById } from '../hooks/useApplicationById';
import { useUpdateApplicants } from '../hooks/useUpdateApplicants';
import { toCardProduct } from '../helper/productHelpers';
import { useProducts } from '../hooks/useProduct';
import { useSelectedProduct } from '../hooks/useSelectedProduct';
import { useRateLimit } from '../hooks/useThrottle';
import './EditApplicationPage.scss';
import Toast from '../components/Toast';
import { useTranslation } from 'react-i18next';
import Button from '../components/Button';
import EditPageSkeleton from '../components/SkeletonLoader';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const EditApplicationPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { appId } = useParams({ from: '/edit/$appId' });
  const { selectedProduct, setSelectedProduct } = useSelectedProduct();
  const {
    data: application,
    isLoading: isAppLoading,
    error: appError,
  } = useApplicationById(appId);
  const { data: products, isLoading: isProductsLoading } = useProducts();
  const { mutate: updateApplicants, status } = useUpdateApplicants();
  const isSubmitting = status === 'pending';
  const isLoading = isAppLoading || isProductsLoading;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<FormData>({
    defaultValues: { firstName: '', lastName: '', email: '', phone: '' },
    mode: 'onChange',
  });

  const { isRateLimited, registerClick } = useRateLimit(3, 5000);
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
        setToastMessage(t('editPage.successAPIMessage'));
      }
    },
    [application, isRateLimited, registerClick, updateApplicants, t],
  );

  // Show skeleton loader while data is loading
  if (isLoading) {
    return <EditPageSkeleton />;
  }

  if (appError || !application) {
    return (
      <div className="edit-page">
        <div className="edit-page__message">
          <p>{t('editPage.noApplicationMessage')}</p>
          <Button variant="primary" onClick={() => navigate({ to: '/' })}>
            {t('editPage.backButton')}
          </Button>
        </div>
      </div>
    );
  }

  const productToDisplay =
    selectedProduct ??
    products?.find((p) => p.id === application.productId) ??
    null;

  if (!productToDisplay) {
    return (
      <div className="edit-page">
        <div className="edit-page__message">
          <p>{t('editPage.noProductFound')}</p>
          <Button variant="primary" onClick={() => navigate({ to: '/' })}>
            {t('editPage.backButton')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-page">
      <div className="edit-page__content">
        <div className="edit-page__left">
          <Card
            product={toCardProduct(productToDisplay)}
            onSelect={() => navigate({ to: '/' })}
            buttonLabel={t('editPage.returnButton')}
          />
          <Button
            variant="primary"
            className="edit-page__select-another"
            onClick={() => navigate({ to: '/applications' })}
          >
            {t('editPage.selectApplicationButton')}
          </Button>
        </div>

        <div className="edit-page__right">
          <h2>{t('editPage.mainApplicantTitle')}</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="firstName">{t('form.firstName')}</label>
              <input
                id="firstName"
                {...register('firstName', {
                  required: t('form.errors.firstNameError'),
                })}
                placeholder={t('form.firstNamePlaceholder')}
                aria-invalid={errors.firstName ? 'true' : 'false'}
              />
              {errors.firstName && (
                <span className="error">{errors.firstName.message}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="lastName">{t('form.lastName')}</label>
              <input
                id="lastName"
                {...register('lastName', {
                  required: t('form.errors.lastNameError'),
                })}
                placeholder={t('form.lastNamePlaceholder')}
                aria-invalid={errors.lastName ? 'true' : 'false'}
              />
              {errors.lastName && (
                <span className="error">{errors.lastName.message}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="email">{t('form.email')}</label>
              <input
                id="email"
                type="email"
                {...register('email', {
                  required: t('form.errors.emailRequired'),
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: t('form.errors.emailInvalid'),
                  },
                })}
                placeholder={t('form.emailPlaceholder')}
                aria-invalid={errors.email ? 'true' : 'false'}
              />
              {errors.email && (
                <span className="error">{errors.email.message}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="phone">{t('form.phone')}</label>
              <input
                id="phone"
                {...register('phone', {
                  required: t('form.errors.phoneError'),
                })}
                placeholder={t('form.phonePlaceholder')}
                aria-invalid={errors.phone ? 'true' : 'false'}
              />
              {errors.phone && (
                <span className="error">{errors.phone.message}</span>
              )}
            </div>
            <Button
              type="submit"
              disabled={isRateLimited || isSubmitting || !isValid}
            >
              {isRateLimited
                ? t('form.rateLimited')
                : isSubmitting
                  ? t('form.submitting')
                  : t('form.submitButton')}
            </Button>
          </form>
        </div>
      </div>
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage('')} />
      )}
    </div>
  );
};

export default EditApplicationPage;
