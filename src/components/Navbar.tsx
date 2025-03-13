import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import LogoSvg from '../assets/images/svg/logo-nesto-en.svg';

// Styled container for the navbar that stretches full width
const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  // Mobile responsiveness: adjust padding on smaller screens
  @media (max-width: 768px) {
    padding: 12px 16px;
  }
`;

// Styled image for the logo
const Logo = styled.img`
  height: 70px;

  @media (max-width: 768px) {
    height: 32px;
  }
`;

// Styled button for toggling the language
const LanguageToggle = styled.button`
  background: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 1rem;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;

  &:hover {
    background-color: #f2f2f2;
    border-color: #999;
  }
`;

const Navbar: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <NavbarContainer>
      <Logo src={LogoSvg} alt="Company Logo" />
      <LanguageToggle onClick={toggleLanguage}>
        {i18n.language === 'en' ? 'Français' : 'English'}
      </LanguageToggle>
    </NavbarContainer>
  );
};

export default Navbar;
