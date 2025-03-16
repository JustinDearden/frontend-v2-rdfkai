import React from 'react';
import './Navbar.scss';
import Logo from '../assets/images/svg/logo-nesto-en.svg';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@tanstack/react-router';
import Button from './Button';

const Navbar: React.FC = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
  };

  const handleLogoClick = () => {
    navigate({ to: '/' });
  };

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <img
          src={Logo}
          alt="Logo"
          className="navbar__logo"
          onClick={handleLogoClick}
          style={{ cursor: 'pointer' }}
        />
      </div>
      <div className="navbar__right">
        <Button
          variant="secondary"
          className="navbar__language-toggle"
          onClick={toggleLanguage}
        >
          {i18n.language === 'en' ? 'Français' : 'English'}
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
