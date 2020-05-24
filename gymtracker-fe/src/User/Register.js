import React , { Component } from 'react';

import { useTranslation } from 'react-i18next';
import { Button } from '@material-ui/core';

function Register() {
    const { t } = useTranslation();
    return (
      <div className="App">
        <h1>{t('Register your account')}</h1>
        <form>
          {/* <DatePicker /> */}
            
            <h2>
              {t('Username')}
              <input type="text" placeholder="Username"></input>
            </h2>
            <h2>
              {t('Password')}
              <input type="password" placeholder="Password"></input>
            </h2>
            <h2>
              {t('Confirm password')}
              <input type="password" placeholder="Confirm Password"></input>
            </h2>
            <h2>
              {t('Email')}
              <input type="text" placeholder="Password"></input>
              <button>{t('Submit')}</button>
            </h2>
        </form>
      </div>
    );
}

export default Register;