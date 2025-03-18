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
    return [...applications]
      .filter((app) =>
        app.applicants.some(
          (applicant) => applicant.email && applicant.email.trim() !== '',
        ),
      )
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
  }, [applications]);

  if (isLoading)
    return (
      <div className="applications-page__loading">
        <p className="applications-page__loading-text">
          {t('applicationsPage.loadingMessage')}
        </p>
      </div>
    );
  if (error)
    return (
      <div className="applications-page__error">
        <p className="applications-page__error-text">
          {t('applicationsPage.apiMessage')}
        </p>
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
                {/* Application details */}
                <div className="applications-page__item-left">
                  <p className="applications-page__item-info">
                    <span className="applications-page__item-info-label">
                      {t('applicationsPage.applicationInfo')}
                    </span>
                  </p>
                  <div className="applications-page__item-left-details">
                    <p className="applications-page__detail">
                      <span className="applications-page__detail-label">
                        {t('applicationsPage.idTitle')}
                      </span>
                      {app.id}
                    </p>
                    <p className="applications-page__detail">
                      <span className="applications-page__detail-label">
                        {t('applicationsPage.typeTitle')}
                      </span>
                      {app.type}
                    </p>
                    <p className="applications-page__detail">
                      <span className="applications-page__detail-label">
                        {t('applicationsPage.createdTitle')}
                      </span>
                      {formatDate(app.createdAt)}
                    </p>
                  </div>
                </div>
                {/* Applicant data */}
                <div className="applications-page__item-right">
                  {app.applicants && app.applicants.length > 0 ? (
                    <div className="applications-page__applicants">
                      <p className="applications-page__applicants-title">
                        {t('applicationsPage.applicantsTitle')}
                      </p>
                      {app.applicants.map((applicant, index) => (
                        <div
                          key={index}
                          className="applications-page__applicant"
                        >
                          <p className="applications-page__applicant-detail">
                            <span className="applications-page__applicant-label">
                              {t('applicationsPage.applicantName')}
                            </span>
                            {` ${applicant.firstName} ${applicant.lastName}`}
                          </p>
                          <p className="applications-page__applicant-detail">
                            <span className="applications-page__applicant-label">
                              {t('applicationsPage.applicantEmail')}
                            </span>
                            {` ${applicant.email}`}
                          </p>
                          <p className="applications-page__applicant-detail">
                            <span className="applications-page__applicant-label">
                              {t('applicationsPage.applicantPhone')}
                            </span>
                            {` ${applicant.phone}`}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="applications-page__no-applicant">
                      {t('applicationsPage.noApplicantDataFound')}
                    </p>
                  )}
                </div>
              </div>
              {/* Edit button */}
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
          <p className="applications-page__empty-text">
            {t('applicationsPage.noApplicationsMessage')}
          </p>
        </div>
      )}
    </div>
  );
};

export default ApplicationsPage;
