import type React from 'react';
import { useState, useEffect, useRef } from 'react';
import './Navbar.scss';
import Logo from '../assets/images/svg/logo-nesto-en.svg';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@tanstack/react-router';
import Button from './Button';

const Navbar: React.FC = () => {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
  };

  const handleLogoClick = () => {
    navigate({ to: '/' });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 480 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <img
          src={Logo || '/placeholder.svg'}
          alt="Logo"
          className="navbar__logo"
          onClick={handleLogoClick}
          style={{ cursor: 'pointer' }}
        />
      </div>
      <div className="navbar__right">
        <div className="navbar__links">
          <a
            className="navbar__link"
            onClick={() => navigate({ to: '/applications' })}
          >
            {t('navbar.applicationsTab')}
          </a>
          <a
            className="navbar__link"
            onClick={() => navigate({ to: '/changes' })}
          >
            {t('navbar.changesTab')}
          </a>
        </div>
        <Button
          variant="secondary"
          className="navbar__language-toggle"
          onClick={toggleLanguage}
        >
          {i18n.language === 'en' ? 'Français' : 'English'}
        </Button>
      </div>
      <div
        className="navbar__hamburger"
        onClick={() => setMobileMenuOpen(true)}
        aria-label="Open menu"
      >
        <span className="navbar__hamburger-line"></span>
        <span className="navbar__hamburger-line"></span>
        <span className="navbar__hamburger-line"></span>
      </div>

      {/* Mobile Menu */}
      <div
        className={`navbar__mobile-menu ${mobileMenuOpen ? 'open' : ''}`}
        ref={mobileMenuRef}
      >
        <div className="navbar__mobile-menu-content">
          <button
            className="navbar__mobile-menu-close"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            &times;
          </button>
          <a
            className="navbar__mobile-link"
            onClick={() => {
              navigate({ to: '/applications' });
              setMobileMenuOpen(false);
            }}
          >
            {t('navbar.applicationsTab')}
          </a>
          <a
            className="navbar__mobile-link"
            onClick={() => {
              navigate({ to: '/changes' });
              setMobileMenuOpen(false);
            }}
          >
            {t('navbar.changesTab')}
          </a>
          <Button
            variant="secondary"
            className="navbar__language-toggle"
            onClick={() => {
              toggleLanguage();
              setMobileMenuOpen(false);
            }}
          >
            {i18n.language === 'en' ? 'Français' : 'English'}
          </Button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div
          className="navbar__mobile-menu-backdrop"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
