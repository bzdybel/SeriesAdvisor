import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Home from './components/Home';

class App extends React.Component {
    render() {
        return (
            <Router>
                <main className="login-register-section">
                    <Route exact path="/" component={LoginForm} />
                    <Route path="/register" component={RegisterForm} />
                </main>
                <Route path="/home" component={Home} />
            </Router>
        );
    }
}
export default App;
