import React from 'react';
class RegisterForm extends React.Component {
    state = {
        email: '',
        password: '',
        passwordRepeat: '',
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
    handleRegisterFormSubmit = e => {
        e.preventDefault();
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
