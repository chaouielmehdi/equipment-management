import { FC, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTE } from '../App';

const Hero: FC = (): ReactElement => {
	return (
		<div className="row background">
			<h1 className="fw-bold" style={{ marginTop: '250px' }}>
				SCM Biomedical Equipments
			</h1>
			<div className="col-lg-6">
				<p className="lead mb-4">Fournisseur des équipements biomédicaux partout au maroc</p>

				<NavLink to={ROUTE.SIGN_IN}>
					<button type="button" className="primary btn-lg m-0">
						Découvrir
					</button>
				</NavLink>
			</div>
		</div>
	);
};

export default Hero;
