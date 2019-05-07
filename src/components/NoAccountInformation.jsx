import React from 'react';
import { Link } from 'react-router-dom';

const NoAccountInformation = () => (
    <div className="login-section__no-account">
        <small class="login-section__no-account-description">
            Nie masz konta w serwisie Series Advisor?
        </small>
        <Link to="register" className="login-section__registration-link">
            Zarejestruj się
        </Link>
    </div>
);
export default NoAccountInformation;
