import React from 'react';
import { Link } from 'react-router-dom';

const NoAccountInformation = () => (
    <div className="login-register-section__no-account">
        <small className="login-register-section__no-account-description">
            Don't have an account in Movie Advisor?
        </small>

        <Link
            to="register"
            className="login-register-section__registration-link"
        >
            Register now
        </Link>
        <Link to="home" className="login-register-section__registration-link">
            Continue as quest
        </Link>
    </div>
);
export default NoAccountInformation;
