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
import './EditApplicationPage.scss';
import Toast from '../components/Toast';
import { useTranslation } from 'react-i18next';
import Button from '../components/Button';

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
    [application, isRateLimited, registerClick, updateApplicants],
  );

  if (isLoading)
    return (
      <div className="edit-page__message">{t('editPage.loadingMessage')}</div>
    );

  if (error || !application) {
    return (
      <div className="edit-page__message">
        <p>{t('editPage.noApplicationMessage')}</p>
        <Button variant="primary" onClick={() => navigate({ to: '/' })}>
          {t('editPage.backButton')}
        </Button>
      </div>
    );
  }

  const productToDisplay =
    selectedProduct ??
    products?.find((p) => p.id === application.productId) ??
    null;

  if (!productToDisplay) {
    return (
      <div className="edit-page__message">
        <p>{t('editPage.noProductFound')}</p>
        <Button variant="primary" onClick={() => navigate({ to: '/' })}>
          {t('editPage.backButton')}
        </Button>
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
            buttonLabel="Return"
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
            <Button type="submit" disabled={isRateLimited}>
              {isRateLimited ? t('form.rateLimited') : t('form.submitButton')}
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
