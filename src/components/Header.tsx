import { FC, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTE } from '../App';

const Header: FC = (): ReactElement => {
	const isConnected = localStorage.getItem('isConnected');

	const handleLogout = () => {
		localStorage.removeItem('isConnected');

		window.location.replace('/');
	};

	return (
		<nav className="container-fluid navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between">
			<div>
				{!isConnected && (
					<NavLink to={'/'} className="link mx-2 navbar-brand">
						SCM Biomedical Equipments
					</NavLink>
				)}
				{isConnected && (
					<NavLink to={'/'} className="link mx-2 navbar-brand">
						SCM Biomedical Equipments
					</NavLink>
				)}
				{isConnected && (
					<NavLink to={ROUTE.HOME} className="link mx-2" activeClassName="active-link">
						Home
					</NavLink>
				)}
			</div>
			<div>
				{isConnected && (
					<button className="btn btn-light border" onClick={handleLogout}>
						<i className="mx-2 fas fa-sign-in-alt"></i>
						<span>Logout</span>
					</button>
				)}
			</div>
		</nav>
	);
};

export default Header;
