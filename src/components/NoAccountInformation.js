import React from 'react';
import { Link } from 'react-router-dom';

const NoAccountInformation = () => (
    <div className="login-container__no-account">
        <small> Nie masz konta w serwisie Series Advisor? </small>
        <Link to="register" className="login-container__registration-link">
            Zarejestruj się
        </Link>
    </div>
);
export default NoAccountInformation;
