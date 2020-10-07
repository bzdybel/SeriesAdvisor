import axios from 'axios';

export const register = ([newUser]) => {
    console.log(newUser);
    const { email, password, passwordRepeat } = newUser;
    return axios
        .post('http://localhost:5000/users/register', {
            email: email,
            password: password,
            passwordRepeat: passwordRepeat,
        })
        .then(response => {
            return response;
            console.log('Registered');
        });
};

export const login = user => {
    return axios
        .post('http://localhost:5000/users/login', {
            email: user.email,
            password: user.password,
        })
        .then(response => {
            console.log(response);
            localStorage.setItem('usertoken', response.data);
            return response.data;
        })
        .catch(response => {
            console.log(response);
        });
};
