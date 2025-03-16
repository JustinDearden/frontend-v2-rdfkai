import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import Button from '../../components/Button';

const EditError: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="error-page">
      <h2>{t('errorPages.editPageErrors.pageTitle')}</h2>
      <p>{t('errorPages.editPageErrors.pageSubtitle')}</p>
      <Button
        variant="primary"
        onClick={() => navigate({ to: '/applications' })}
      >
        {t('errorPages.editPageErrors.selectApplicationButton')}
      </Button>
    </div>
  );
};

export default EditError;
