import React from 'react';
import {Link} from "react-router-dom";
import { useTranslation } from 'react-i18next';


const Navbar = () => {
    const { t } = useTranslation();
    return (
      <nav>
        <ul>
          <li>
            <Link to="/">{t('Home')}</Link>
          </li>
          <li>
            <Link to="/about">{t('About')}</Link>
          </li>
          <li>
            <Link to="/users">{t('Users')}</Link>
          </li>
          <li>
            <Link to="/login">{t('Login')}</Link>
          </li>
          <li>
            <Link to="/register">{t('Register')}</Link>
          </li>
        </ul>
      </nav>
    )
}

export default Navbar;