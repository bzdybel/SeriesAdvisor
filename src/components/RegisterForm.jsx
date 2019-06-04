import React from 'react';
import axios from 'axios';

let error = '';
let registered = '';

class RegisterForm extends React.Component {
    state = {
        email: '',
        password: '',
        passwordRepeat: '',
    };

    handleEmailChange = e => {
        document.getElementById('registered').innerText = '';
        document.getElementById('error').innerText = '';

        this.setState({
            email: e.target.value,
        });
    };
    handlePasswordChange = e => {
        document.getElementById('registered').innerText = '';
        document.getElementById('error').innerText = '';
        this.setState({
            password: e.target.value,
        });
    };
    handlePasswordRepeatChange = e => {
        document.getElementById('registered').innerText = '';
        document.getElementById('error').innerText = '';
        this.setState({
            passwordRepeat: e.target.value,
        });
    };
    handleRegisterFormSubmit = e => {
        e.preventDefault();
        if (this.state.password === this.state.passwordRepeat) {
            axios
                .post('http://localhost:8080/register', {
                    email: this.state.email,
                    password: this.state.password,
                    passwordRepeat: this.state.passwordRepeat,
                })
                .then(res => {
                    console.log(res.data);
                });
            registered = 'Pomyślnie zarejestrowano!';
            document.getElementById('registered').innerText = registered;
        } else {
            error = 'Wprowadziłeś błędne hasło!';
            document.getElementById('error').innerText = error;
        }
    };

    render() {
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
                    required
                />
                <h2
                    className="login-register-section__information login-register-section__information--error"
                    id="error"
                />
                <h2
                    className="login-register-section__information login-register-section__information--registered"
                    id="registered"
                />

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
