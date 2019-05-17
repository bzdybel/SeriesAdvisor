import React from 'react';
import { Link } from 'react-router-dom';

const NoAccountInformation = () => (
    <div className="login-register-section__no-account">
        <small className="login-register-section__no-account-description">
            Nie masz konta w serwisie Series Advisor?
        </small>

        <Link to="register" className="login-register-section__registration-link">
            Zarejestruj się
        </Link>
    </div>
);
export default NoAccountInformation;
