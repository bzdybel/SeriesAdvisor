import React from 'react';
import NoAccountInformation from './NoAccountInformation';

class LoginForm extends React.Component {
    state = {
        email: undefined,
        password: undefined,
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
                <h1 className="login-container__form--title">Zaloguj się</h1>
                <label htmlFor="email" className="login-container__form-label">
                    Email
                </label>
                <input
                    onChange={this.handleEmailChange}
                    value={this.state.email}
                    id="email"
                    name="email"
                    className="login-container__form--input"
                    type="text"
                    placeholder="james.cook@gmail.com"
                    required
                />
                <label
                    htmlFor="password"
                    className="login-container__form-label"
                >
                    Hasło
                </label>

                <input
                    onChange={this.handlePasswordChange}
                    value={this.state.password}
                    id="password"
                    className="login-container__form--input"
                    type="password"
                    placeholder="Password..."
                    required
                />
                <button type="submit" className="login-container__form--button">
                    Zaloguj się
                </button>
                <NoAccountInformation />
            </form>
        );
    }
}
export default LoginForm;
