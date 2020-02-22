import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Home from './components/Home';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { useProfile } from './Authcontext';

export const App = () => {
    const auth = useProfile();
    if (auth) {
        return <AuthenticatedApp />;
    }
    return <UnathenticatedApp />;
};

function AuthenticatedApp() {
    return (
        <Router>
            <ReactNotification />
            <Route path="/home" component={Home} />
            <Redirect to="/home" />
        </Router>
    );
}

function UnathenticatedApp() {
    return (
        <Router>
            <ReactNotification />
            <main className="login-register-section">
                <Route exact path="/" component={LoginForm} />
                <Route path="/register" component={RegisterForm} />
            </main>
            <Route path="/home" component={Home} />
            <Redirect to="/" />
        </Router>
    );
}
