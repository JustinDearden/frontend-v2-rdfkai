import type React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import Button from '../components/Button';
import './NotFound.scss';

const NotFound: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <main className="not-found">
      <div className="not-found__container">
        <div className="not-found__status">404</div>
        <div className="not-found__icon">
          <svg
            className="not-found__icon-svg"
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
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="11" y1="8" x2="11" y2="14"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
        </div>
        <h1 className="not-found__title">
          {t('errorPages.notFoundErrors.pageTitle')}
        </h1>
        <p className="not-found__message">
          {t('errorPages.notFoundErrors.pageSubtitle')}
        </p>
        <div className="not-found__actions">
          <Button
            variant="primary"
            className="not-found__button"
            onClick={() => navigate({ to: '/' })}
          >
            {t('errorPages.notFoundErrors.returnButton')}
          </Button>
          <Button
            variant="secondary"
            className="not-found__button"
            onClick={() => navigate({ to: '/applications' })}
          >
            {t('errorPages.notFoundErrors.viewApplicationsButton')}
          </Button>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
