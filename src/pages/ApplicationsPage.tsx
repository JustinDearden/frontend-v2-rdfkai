import React from 'react';
import { useApplications } from '../hooks/useApplications';
import { useNavigate } from '@tanstack/react-router';
import { Application } from '../types';
import Button from '../components/Button';
import './ApplicationsPage.scss';
import { useTranslation } from 'react-i18next';

const ApplicationsPage: React.FC = () => {
  const { data: applications, isLoading, error } = useApplications();
  const { t } = useTranslation();
  const navigate = useNavigate();

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
        >
          {t('applicationsPage.returnButton')}
        </Button>
      </div>
      {applications && applications.length > 0 ? (
        <ul className="applications-page__list">
          {applications.map((app: Application) => (
            <li className="applications-page__item" key={app.id}>
              <div className="applications-page__item-content">
                {/* Left side: Application details */}
                <div className="applications-page__item-left">
                  <p>
                    <strong>{t('applicationsPage.idTitle')}</strong> {app.id}
                  </p>
                  <p>
                    <strong>{t('applicationsPage.typeTitle')}</strong>{' '}
                    {app.type}
                  </p>
                  <p>
                    <strong>{t('applicationsPage.createdTitle')}</strong>{' '}
                    {new Date(app.createdAt).toLocaleString()}
                  </p>
                  <Button
                    className="applications-page__edit-btn"
                    onClick={() => navigate({ to: `/edit/${app.id}` })}
                  >
                    {t('applicationsPage.editButton')}
                  </Button>
                </div>
                {/* Right side: Applicant data */}
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
                            {applicant.firstName} {applicant.lastName}
                          </p>
                          <p>{applicant.email}</p>
                          <p>{applicant.phone}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>{t('applicationsPage.noApplicantDataFound')}</p>
                  )}
                </div>
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
