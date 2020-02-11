import React from 'react';
import NoAccountInformation from './NoAccountInformation';
import { login } from '../login-register';

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
    handleloginFormSubmit = e => {
        e.preventDefault();
        const { email, password } = this.state;

        const user = {
            email: email,
            password: password,
        };
        login(user).then(res => {
            if (res) {
                this.props.history.push(`/home`);
            }
        });
    };
    render() {
        return (
            <form
                className="login-register-section__form"
                onSubmit={this.handleloginFormSubmit}
            >
                <h1 className="login-register-section__title">Login</h1>
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
                    Password
                </label>

                <input
                    onChange={this.handlePasswordChange}
                    value={this.state.password}
                    id="password"
                    className="login-register-section__input"
                    type="password"
                    required
                />
                <button
                    type="submit"
                    className="login-register-section__button"
                >
                    Login
                </button>
                <NoAccountInformation />
            </form>
        );
    }
}
export default LoginForm;
