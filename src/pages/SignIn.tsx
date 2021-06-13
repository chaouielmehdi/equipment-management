import { FC, ReactElement, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ROUTE } from '../App';

const SignIn: FC = (): ReactElement => {
	const [errors, setErrors] = useState({
		username: '',
		password: '',
	});
	const [inputs, setInputs] = useState({
		username: '',
		password: '',
		userType: 'Client',
	});

	function getStoredUsers() {
		const item = localStorage.getItem('Users');

		if (item) {
			return JSON.parse(item);
		}

		return null;
	}

	const handleLogin = () => {
		const storedUsers = getStoredUsers();

		if (!storedUsers) {
			toast.success('Aucun User existe!!');
		} else {
			const user = storedUsers.find(
				(storedUsers: any) =>
					storedUsers.password === inputs.password &&
					storedUsers.userType === inputs.userType &&
					storedUsers.username === inputs.username
			);
			if (user) {
				toast.success('Sign-in avec succée!');
				localStorage.setItem('isConnected', 'true');
				window.location.replace('/');
			} else {
				toast.error('Username ou mot de pass erroné!');
			}
		}
	};

	const validate = {
		username: (event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value;
			const newInputs = { ...inputs };
			const newErrors = { ...errors };
			if (value === '') {
				newErrors.username = 'Merci de saisir le Username';
			} else {
				newErrors.username = '';
			}
			newInputs.username = value;
			setErrors(newErrors);
			setInputs(newInputs);
		},
		password: (event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value;
			const newInputs = { ...inputs };
			const newErrors = { ...errors };
			if (value === '') {
				newErrors.password = 'Merci de saisir le Mot de pass!';
			} else {
				newErrors.password = '';
			}
			newInputs.password = value;
			setErrors(newErrors);
			setInputs(newInputs);
		},
	};

	function changeUserType(newValue: string) {
		const newInputs = { ...inputs };
		newInputs.userType = newValue;
		setInputs(newInputs);
	}

	return (
		<div className="row background">
			<div className="wrapper fadeInDown mt-5">
				<div id="formContent">
					<div className="fadeIn first">
						<i className="icon-primary fa fa-user my-4"></i>
					</div>

					<input
						/* value={username} */
						onChange={validate.username}
						type="text"
						id="login"
						className={'fadeIn second ' + (errors.username === '' ? '' : 'is-invalid')}
						placeholder="Username"
					/>
					<input
						/* value={password} */
						onChange={validate.password}
						type="password"
						id="password"
						className={'fadeIn third ' + (errors.password === '' ? '' : 'is-invalid')}
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
								checked={inputs.userType === 'Agent'}
								onClick={() => changeUserType('Agent')}
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
								checked={inputs.userType === 'Client'}
								onClick={() => changeUserType('Client')}
							/>
							<label className="form-check-label" htmlFor="flexRadioDefault2">
								Client
							</label>
						</div>
					</div>
					<button
						onClick={handleLogin}
						className="primary fadeIn fourth"
						disabled={inputs.username === '' || inputs.password === ''}
					>
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
