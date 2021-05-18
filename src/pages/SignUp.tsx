import { FC, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTE } from '../App';

const SignUp: FC = (): ReactElement => {
	return (
		<div className="row background">
			<div className="wrapper fadeInDown mt-5">
				<div id="formContent">
					<div className="fadeIn first">
						<i className="icon-primary fa fa-user my-4"></i>
					</div>

					<input type="text" id="login" className="fadeIn second" placeholder="Username" />
					<input
						type="password"
						id="password"
						className="fadeIn third"
						placeholder="Mot de passe"
					/>
					<input type="text" className="fadeIn third" placeholder="Email" />
					<input type="text" className="fadeIn third" placeholder="Phone" />

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
					<button className="primary fadeIn fourth">Register</button>

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
