import React from 'react'

const LoginForm = () => (
		<form className="login-container__form">
		<h1 className="login-container__form--title">Zaloguj się</h1>
			<label htmlFor="email" className="login-container__form-label">
				Email
			</label>
			<input
				id="email"
				className="login-container__form--input"
				type="text"
				placeholder="james.cook@gmail.com"
				required
			/>
			<label htmlFor="password" className="login-container__form-label">
				Hasło
			</label>

			<input
				id="password"
				className="login-container__form--input"
				type="password"
				placeholder="Password..."
				required
			/>
			<button type="submit" className="login-container__form--button">Zaloguj się</button>
			<div className="login-container-__form-checkbox--wrapper">
				<input
					id="login-container__form--checkbox"
					type="checkbox"
					className="login-container__form--checkbox"
					value="true"
					defaultChecked
				/>
				<label
					htmlFor="login-container__form--checkbox"
					className="login-container__form-checkbox--label"
				>
					Zapamiętaj mnie
				</label>
			</div>
			{/* tutaj chciałbym użyc komponentu NoAccountInformation */}
		</form>
)
export default LoginForm
