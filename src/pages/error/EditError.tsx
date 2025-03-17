import type React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import Button from '../../components/Button';
import './EditError.scss';

const EditError: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <main className="edit-error">
      <div className="edit-error__container">
        <div className="edit-error__icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
        <h1 className="edit-error__title">
          {t('errorPages.editPageErrors.pageTitle')}
        </h1>
        <p className="edit-error__message">
          {t('errorPages.editPageErrors.pageSubtitle')}
        </p>
        <div className="edit-error__actions">
          <Button
            variant="primary"
            className="edit-error__button"
            onClick={() => navigate({ to: '/applications' })}
          >
            {t('errorPages.editPageErrors.selectApplicationButton')}
          </Button>
          <Button
            variant="secondary"
            className="edit-error__button"
            onClick={() => navigate({ to: '/' })}
          >
            {t('errorPages.editPageErrors.returnHomeButton', 'Return to Home')}
          </Button>
        </div>
      </div>
    </main>
  );
};

export default EditError;
