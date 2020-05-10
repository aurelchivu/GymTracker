import React , {Component} from 'react';
import { useTranslation } from 'react-i18next';

function Register() {
    const { t } = useTranslation();
    return (
      <div>
        <h1>{t('Register your account')}</h1>
        <form>
            {t('Username')}
            <input type="text"></input>
            {t('Password')}
            <input type="password"></input>
            {t('Confirm password')}
            <input type="password"></input>
            {t('Email')}
            <input type="text"></input>
            <button>{t('Submit')}</button>
        </form>
      </div>
    );
}

export default Register;
