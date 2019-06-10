import React from 'react';
import axios from 'axios';
import ErrorMessage from './ErrorMessage';
import { Redirect } from 'react-router-dom';

class RegisterForm extends React.Component {
    state = {
        email: '',
        password: '',
        passwordRepeat: '',
        errorMessage: '',
        hasUserSignUp: false,
    };

    handleEmailChange = e => {
        this.setState({
            email: e.target.value,
        });
    };
    handlePasswordChange = e => {
        this.setState({
            password: e.target.value,
        });
    };
    handlePasswordRepeatChange = e => {
        this.setState({
            passwordRepeat: e.target.value,
        });
    };

    handleErrorMessage = errorMessage => {
        this.setState({
            errorMessage: errorMessage,
        });
    };

    handleRegisterFormSubmit = e => {
        e.preventDefault();
        if (this.state.password !== this.state.passwordRepeat) {
            this.handleErrorMessage('Wprowadziłeś błędne hasło!');
        } else {
            axios
                .post('http://localhost:8080/register', {
                    email: this.state.email,
                    password: this.state.password,
                    passwordRepeat: this.state.passwordRepeat,
                })
                .then(response => {
                    if (response.status === 201) {
                        this.setState({ hasUserSignUp: true });
                    }
                })
                .catch(err => {
                    if (err.response.status === 400) {
                        this.handleErrorMessage(
                            'Wprowadziłeś niepoprawne dane'
                        );
                    } else if (err.response.status === 500) {
                        this.handleErrorMessage('Błąd serwera, przepraszamy');
                    }
                });
        }
    };

    render() {
        if (this.state.hasUserSignUp === true) {
            return <Redirect to="/" />;
        }
        return (
            <form
                className="login-register-section__form"
                onSubmit={this.handleRegisterFormSubmit}
            >
                <h1 className="login-register-section__title">
                    Zarejestruj się
                </h1>
                <label
                    htmlFor="email"
                    className="login-register-section__label"
                >
                    Email
                </label>
                <input
                    onChange={this.handleEmailChange}
                    value={this.state.email}
                    id="email"
                    name="email"
                    className="login-register-section__input"
                    type="email"
                    placeholder="james.cook@gmail.com"
                    required
                />
                <label
                    htmlFor="password"
                    className="login-register-section__label"
                >
                    Hasło
                </label>
                <input
                    onChange={this.handlePasswordChange}
                    value={this.state.password}
                    id="password"
                    className="login-register-section__input"
                    type="password"
                    minLength="6"
                    required
                />
                <label
                    htmlFor="password"
                    className="login-register-section__label"
                >
                    Powtórz Hasło
                </label>
                <input
                    onChange={this.handlePasswordRepeatChange}
                    vale={this.state.passwordRepeat}
                    id="passwordRepeat"
                    className="login-register-section__input"
                    type="password"
                    minLength="6"
                    required
                />
                <ErrorMessage name={this.state.errorMessage} />

                <button
                    type="submit"
                    className="login-register-section__button"
                >
                    Zarejestruj się
                </button>
            </form>
        );
    }
}
export default RegisterForm;
