import React, { useState } from 'react';
import { register } from '../login-register';
import { handleNotification } from './Notifications';
import { useAsync } from 'react-async';

const RegisterForm = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const fetchRegister = useAsync({
        deferFn: register,
        onResolve: data => {
            handleNotification(
                'Account has been succesfully registered!',
                'success'
            );
            props.history.push('/');
        },
        onReject: error => {
            if (error.response) {
                switch (error.response.status) {
                    case 400:
                        handleNotification(
                            'Provided email is already taken!',
                            'danger'
                        );
                        break;
                    case 500:
                        handleNotification(
                            'Can not create new user!',
                            'danger'
                        );
                        break;
                    default:
                        break;
                }
            }
        },
    });

    const handleRegisterFormSubmit = async e => {
        e.preventDefault();
        const newUser = {
            email: email,
            password: password,
            passwordRepeat: passwordRepeat,
        };
        fetchRegister.run(newUser);
    };

    return (
        <form
            className="login-register-section__form"
            onSubmit={handleRegisterFormSubmit}
        >
            <h1 className="login-register-section__title">Registration</h1>
            <label htmlFor="email" className="login-register-section__label">
                Email
            </label>
            <input
                onChange={e => setEmail(e.target.value)}
                value={email}
                id="email"
                name="email"
                className="login-register-section__input"
                type="email"
                placeholder="james.cook@gmail.com"
                required
            />
            <label htmlFor="password" className="login-register-section__label">
                Password
            </label>

            <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                id="password"
                className="login-register-section__input"
                type="password"
                required
            />
            <label htmlFor="password" className="login-register-section__label">
                Repeat Password
            </label>

            <input
                onChange={e => setPasswordRepeat(e.target.value)}
                vale={passwordRepeat}
                id="passwordRepeat"
                className="login-register-section__input"
                type="password"
                required
            />
            <button type="submit" className="login-register-section__button">
                Register now!
            </button>
        </form>
    );
};
