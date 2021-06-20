import { FC, ReactElement, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ROUTE } from '../App';

const SignUp: FC = (): ReactElement => {
	const [errors, setErrors] = useState({
		username: '',
		password: '',
		email: '',
		phone: '',
	});
	const [inputs, setInputs] = useState({
		username: '',
		password: '',
		email: '',
		phone: '',
		userType: 'Client',
	});

	const validate = {
		username: (event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value;
			const newInputs = { ...inputs };
			const newErrors = { ...errors };
			if (value === '') {
				newErrors.username = 'Le nom est obligatoire!';
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
				newErrors.password = 'Mot de passe obligatoire!';
				/* } else {
				if (value.length < 6) {
					newErrors.password = 'Mot de passe doit contenir au moins 6 charactere!'; */
			} else {
				newErrors.password = '';

				//}
			}
			newInputs.password = value;
			setErrors(newErrors);
			setInputs(newInputs);
		},
		email: (event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value;
			const newInputs = { ...inputs };
			const newErrors = { ...errors };
			if (value === '') {
				newErrors.email = 'E-mail obligatoire!';
			} else {
				newErrors.email = '';
			}
			newInputs.email = value;
			setErrors(newErrors);
			setInputs(newInputs);
		},
		phone: (event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value;
			const newInputs = { ...inputs };
			const newErrors = { ...errors };
			if (value === '') {
				newErrors.phone = 'N° de tel est obligatoire!';
			} else {
				newErrors.phone = '';
			}
			newInputs.phone = value;
			setErrors(newErrors);
			setInputs(newInputs);
		},
	};

	function getStoredUsers() {
		const item = localStorage.getItem('Users');

		if (item) {
			return JSON.parse(item);
		}

		return null;
	}

	function handleSubmit() {
		const storedUsers = getStoredUsers();

		if (!storedUsers) {
			const Val = [inputs];
			localStorage.setItem('Users', JSON.stringify(Val));
			toast.success('Enregistrement fait avec succées');
			window.location.replace(ROUTE.SIGN_IN);
		} else {
			const user = storedUsers.find(
				(storedUsers: any) =>
					(storedUsers.email === inputs.email && storedUsers.userType === inputs.userType) ||
					(storedUsers.username === inputs.username && storedUsers.userType === inputs.userType)
			);
			if (user) {
				toast.error('E-mail ou Username deja utilisé!');
			} else {
				storedUsers.push(inputs);
				localStorage.setItem('Users', JSON.stringify(storedUsers));
				toast.success('Enregistrement fait avec succées');
				window.location.replace(ROUTE.SIGN_IN);
			}
		}
	}

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
						type="text"
						id="login"
						className={
							'form-control fadeIn second ' + (errors.username === '' ? '' : 'is-invalid')
						}
						placeholder="Username"
						onChange={validate.username}
					/>
					<input
						type="password"
						id="password"
						className={
							'form-control fadeIn third ' + (errors.password === '' ? '' : 'is-invalid')
						}
						placeholder="Mot de passe"
						onChange={validate.password}
					/>
					<input
						type="text"
						className={'form-control fadeIn third ' + (errors.email === '' ? '' : 'is-invalid')}
						placeholder="Email"
						onChange={validate.email}
					/>
					<input
						type="text"
						className={'form-control fadeIn third ' + (errors.phone === '' ? '' : 'is-invalid')}
						placeholder="Phone"
						onChange={validate.phone}
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
						className="primary fadeIn fourth"
						onClick={handleSubmit}
						disabled={
							inputs.username === '' ||
							inputs.email === '' ||
							inputs.password === '' ||
							inputs.phone === ''
						}
					>
						Register
					</button>

					<div id="formFooter">
						<NavLink className="forgot underlineHover" to={ROUTE.SIGN_IN}>
							Déjà un membre? login
						</NavLink>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
