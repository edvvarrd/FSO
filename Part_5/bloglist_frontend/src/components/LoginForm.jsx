const LoginForm = props => {
	return (
		<>
			<h2>log in to application</h2>
			<form onSubmit={props.handleLogin}>
				<div>
					<label htmlFor="username">Username: </label>
					<input
						type="text"
						value={props.formUsername}
						onChange={props.onChangeUsername}
						id="username"
					/>
				</div>
				<div>
					<label htmlFor="password">Password: </label>
					<input
						type="password"
						value={props.formPassword}
						onChange={props.onChangePassword}
						id="password"
					/>
				</div>
				<button type="submit" id="login">
					login
				</button>
			</form>
		</>
	)
}

export default LoginForm
