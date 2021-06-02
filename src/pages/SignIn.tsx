import { FC, ReactElement, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTE } from '../App';

const SignIn: FC = (): ReactElement => {
	const [username, setUsername] = useState('client');
	const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value);
	};

	const [password, setPassword] = useState('client');
	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const [errorMessage, setErrorMessage] = useState('');
	const handleLogin = () => {
		if (
			username &&
			username.length > 0 &&
			username === 'client' &&
			password &&
			password.length > 0 &&
			password === 'client'
		) {
			setErrorMessage('');
			localStorage.setItem('isConnected', 'true');

			window.location.replace('/');
		} else {
			setErrorMessage('Username ou mot de passe invalide');
		}
	};

	return (
		<div className="row background">
			<div className="wrapper fadeInDown mt-5">
				<div id="formContent">
					<div className="fadeIn first">
						<i className="icon-primary fa fa-user my-4"></i>
					</div>

					{errorMessage && (
						<div className="alert alert-danger" role="alert">
							{errorMessage}
						</div>
					)}

					<input
						value={username}
						onChange={handleUsernameChange}
						type="text"
						id="login"
						className="fadeIn second"
						placeholder="Username"
					/>
					<input
						value={password}
						onChange={handlePasswordChange}
						type="password"
						id="password"
						className="fadeIn third"
						name="login"
						placeholder="Mot de passe"
					/>
					<div className="d-flex justify-content-around fadeIn fourth my-3">
						<div className="form-check">
							<input
								className="form-check-input"
								type="radio"
								name="flexRadioDefault"
								id="flexRadioDefault1"
							/>
							<label className="form-check-label" htmlFor="flexRadioDefault1">
								Agent
							</label>
						</div>
						<div className="form-check">
							<input
								className="form-check-input"
								type="radio"
								name="flexRadioDefault"
								id="flexRadioDefault2"
								checked
							/>
							<label className="form-check-label" htmlFor="flexRadioDefault2">
								Client
							</label>
						</div>
					</div>
					<button onClick={handleLogin} className="primary fadeIn fourth">
						Log In
					</button>

					<div id="formFooter">
						<NavLink className="forgot underlineHover" to={ROUTE.SIGN_UP}>
							Créer un compte
						</NavLink>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
