import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'


class App extends React.Component {

	render() {
		return (
			<main className="login-section">
				<Router>
					<Route exact path="/" component={LoginForm} />
					<Route path="/register" component={RegisterForm} />
				</Router>
			</main>
		)
	}
}
export default App
