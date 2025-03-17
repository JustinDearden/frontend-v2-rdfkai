import type React from 'react';
import { useMemo } from 'react';
import { useApplications } from '../hooks/useApplications';
import { useNavigate } from '@tanstack/react-router';
import type { Application } from '../types';
import Button from '../components/Button';
import './ApplicationsPage.scss';
import { useTranslation } from 'react-i18next';

const ApplicationsPage: React.FC = () => {
  const { data: applications, isLoading, error } = useApplications();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const sortedApplications = useMemo(() => {
    if (!applications) return [];
    return [...applications].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }, [applications]);

  if (isLoading)
    return (
      <div className="applications-page__loading">
        {t('applicationsPage.loadingMessage')}
      </div>
    );
  if (error)
    return (
      <div className="applications-page__error">
        {t('applicationsPage.apiMessage')}
      </div>
    );

  return (
    <div className="applications-page">
      <div className="applications-page__header">
        <h1 className="applications-page__title">
          {t('applicationsPage.pageTitle')}
        </h1>
        <Button
          className="applications-page__return"
          onClick={() => navigate({ to: '/' })}
          aria-label={t('applicationsPage.returnButton')}
        >
          {t('applicationsPage.returnButton')}
        </Button>
      </div>
      {sortedApplications && sortedApplications.length > 0 ? (
        <ul className="applications-page__list">
          {sortedApplications.map((app: Application) => (
            <li className="applications-page__item" key={app.id}>
              <div className="applications-page__item-content">
                {/* Left side: Application details */}
                <div className="applications-page__item-left">
                  <p>
                    <strong>{t('applicationsPage.applicationInfo')}</strong>
                  </p>
                  <div className="applications-page__item-left-details">
                    <p>
                      <strong>{t('applicationsPage.idTitle')}</strong> {app.id}
                    </p>
                    <p>
                      <strong>{t('applicationsPage.typeTitle')}</strong>{' '}
                      {app.type}
                    </p>
                    <p>
                      <strong>{t('applicationsPage.createdTitle')}</strong>{' '}
                      {formatDate(app.createdAt)}
                    </p>
                  </div>
                </div>
                {/* Right side: Applicant data with labels */}
                <div className="applications-page__item-right">
                  {app.applicants && app.applicants.length > 0 ? (
                    <div className="applications-page__applicants">
                      <p>
                        <strong>{t('applicationsPage.applicantsTitle')}</strong>
                      </p>
                      {app.applicants.map((applicant, index) => (
                        <div
                          key={index}
                          className="applications-page__applicant"
                        >
                          <p>
                            <strong>
                              {t('applicationsPage.applicantName')}
                            </strong>{' '}
                            {applicant.firstName} {applicant.lastName}
                          </p>
                          <p>
                            <strong>
                              {t('applicationsPage.applicantEmail')}
                            </strong>{' '}
                            {applicant.email}
                          </p>
                          <p>
                            <strong>
                              {t('applicationsPage.applicantPhone')}
                            </strong>{' '}
                            {applicant.phone}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>{t('applicationsPage.noApplicantDataFound')}</p>
                  )}
                </div>
              </div>
              {/* Edit button on its own row */}
              <div className="applications-page__item-actions">
                <Button
                  className="applications-page__edit-btn"
                  onClick={() => navigate({ to: `/edit/${app.id}` })}
                  aria-label={`${t('applicationsPage.editButton')} ${app.id}`}
                >
                  {t('applicationsPage.editButton')}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="applications-page__empty">
          <p>{t('applicationsPage.noApplicationsMessage')}</p>
        </div>
      )}
    </div>
  );
};

export default ApplicationsPage;
