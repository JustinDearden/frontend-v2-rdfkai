import type React from 'react';
import { useEffect, useCallback, useState, useMemo } from 'react';
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
import { EditPageSkeleton } from '../components/skeletons';
import { zodResolver } from '@hookform/resolvers/zod';
import { getFormSchema } from '../schemas/formSchema';

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

  const formSchema = useMemo(() => getFormSchema(t), [t]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
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

  if (isLoading) {
    return <EditPageSkeleton />;
  }

  if (appError || !application) {
    return (
      <div className="edit-page">
        <div className="edit-page__message">
          <p className="edit-page__message-text">
            {t('editPage.noApplicationMessage')}
          </p>
          <Button
            variant="primary"
            onClick={() => navigate({ to: '/applications' })}
          >
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
          <p className="edit-page__message-text">
            {t('editPage.noProductFound')}
          </p>
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
          <h2 className="edit-page__section-title">
            {t('editPage.mainApplicantTitle')}
          </h2>
          <form className="edit-page__form" onSubmit={handleSubmit(onSubmit)}>
            <div className="edit-page__form-group">
              <label className="edit-page__form-label" htmlFor="firstName">
                {t('form.firstName')}
              </label>
              <input
                className="edit-page__form-input"
                id="firstName"
                {...register('firstName')}
                aria-invalid={errors.firstName ? 'true' : 'false'}
              />
              {errors.firstName && (
                <span className="edit-page__form-error">
                  {errors.firstName.message}
                </span>
              )}
            </div>
            <div className="edit-page__form-group">
              <label className="edit-page__form-label" htmlFor="lastName">
                {t('form.lastName')}
              </label>
              <input
                className="edit-page__form-input"
                id="lastName"
                {...register('lastName')}
                aria-invalid={errors.lastName ? 'true' : 'false'}
              />
              {errors.lastName && (
                <span className="edit-page__form-error">
                  {errors.lastName.message}
                </span>
              )}
            </div>
            <div className="edit-page__form-group">
              <label className="edit-page__form-label" htmlFor="email">
                {t('form.email')}
              </label>
              <input
                className="edit-page__form-input"
                id="email"
                type="email"
                {...register('email')}
                aria-invalid={errors.email ? 'true' : 'false'}
              />
              {errors.email && (
                <span className="edit-page__form-error">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="edit-page__form-group">
              <label className="edit-page__form-label" htmlFor="phone">
                {t('form.phone')}
              </label>
              <input
                className="edit-page__form-input"
                id="phone"
                {...register('phone')}
                aria-invalid={errors.phone ? 'true' : 'false'}
              />
              {errors.phone && (
                <span className="edit-page__form-error">
                  {errors.phone.message}
                </span>
              )}
            </div>
            <Button
              type="submit"
              className="edit-page__form-submit"
              disabled={isRateLimited}
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
