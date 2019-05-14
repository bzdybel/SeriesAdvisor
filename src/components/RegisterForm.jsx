import React from 'react';
const RegisterForm = () => (
    <form className="login-register-section__form">
        <h1 className="login-register-section__title">Zarejestruj się</h1>
        <label htmlFor="email" className="login-register-section__label">
            Email
        </label>
        <input
            id="email"
            name="email"
            className="login-register-section__input"
            type="email"
            placeholder="james.cook@gmail.com"
            required
        />
        <label htmlFor="password" className="login-register-section__label">
            Hasło
        </label>

        <input
            id="password"
            className="login-register-section__input"
            type="password"
            required
        />
        <label htmlFor="password" className="login-register-section__label">
            Powtórz Hasło
        </label>

        <input
            id="password"
            className="login-register-section__input"
            type="password"
            required
        />
        <button type="submit" className="login-register-section__button">
            Zarejestruj się
        </button>
    </form>
);
export default RegisterForm;
