import React from 'react';
import NoAccountInformation from './NoAccountInformation';

class LoginForm extends React.Component {
    state = {
        email: '',
        password: '',
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
    handleLoginFormSubmit = e => {
        e.preventDefault();
        console.log(this.state.email);
        console.log(this.state.password);
    };
    render() {
        return (
            <form
                className="login-container__form"
                onSubmit={this.handleLoginFormSubmit}
            >
                <h1 className="login-container-form__title">Zaloguj się</h1>
                <label htmlFor="email" className="login-container-form__label">
                    Email
                </label>
                <input
                    onChange={this.handleEmailChange}
                    value={this.state.email}
                    id="email"
                    name="email"
                    className="login-container-form__input"
                    type="email"
                    placeholder="james.cook@gmail.com"
                    required
                />
                <label
                    htmlFor="password"
                    className="login-container-form__label"
                >
                    Hasło
                </label>

                <input
                    onChange={this.handlePasswordChange}
                    value={this.state.password}
                    id="password"
                    className="login-container-form__input"
                    type="password"
                    required
                />
                <button type="submit" className="login-container-form__button">
                    Zaloguj się
                </button>
                <NoAccountInformation />
            </form>
        );
    }
}
export default LoginForm;
