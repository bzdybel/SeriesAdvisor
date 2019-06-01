import React from 'react';
import axios from 'axios';

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
    handleloginFormSubmit = e => {
        e.preventDefault();
        console.log('chuj1');
        axios
            .post(
                'http://localhost:8080/register',
                {
                    email: this.state.email,
                    password: this.state.password,
                    passwordRepeat: this.state.passwordRepeat,
                },
                console.log('chuj2')
            )
            .then(res => {
                console.log(res.data);
                console.log('chuj');
            });
        // axios
        //     .get('localhost')
        //     .catch(function(error) {
        //         if (error.response) {
        //             // The request was made and the server responded with a status code
        //             // that falls out of the range of 2xx
        //             console.log(error.response.data);
        //             console.log(error.response.status);
        //             console.log(error.response.headers);
        //         } else if (error.request) {
        //             // The request was made but no response was received
        //             // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        //             // http.ClientRequest in node.js
        //             console.log(error.request);
        //         } else {
        //             // Something happened in setting up the request that triggered an Error
        //             console.log('Error', error.message);
        //         }
        //         console.log(error.config);
        //     });
    };

    render() {
        return (
            <form
                className="login-register-section__form"
                onSubmit={this.handleloginFormSubmit}
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
                    id="password"
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
