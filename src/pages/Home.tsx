import { FC, ReactElement } from 'react';
import { useHistory } from 'react-router';
import { ROUTE } from '../App';

const Home: FC = (): ReactElement => {
	const history = useHistory();

	const navigateTo = (route: string) => () => {
		history.push(route);
	};

	return (
		<div className="row">
			<h1 className="fw-bold" style={{ marginTop: '80px' }}>
				SCM Biomedical Equipments
			</h1>

			<div className="d-flex justify-content-around mt-5">
				<div
					onClick={navigateTo(ROUTE.CATALOGUE)}
					className="shadow d-flex justify-content-center pt-5"
					style={{ height: '260px', width: '260px', borderRadius: '5px', cursor: 'pointer' }}
				>
					<div>
						<div className="d-flex justify-content-center">
							<i
								className="icon-primary fas fa-shopping-cart mb-5"
								style={{ fontSize: '120px' }}
							></i>
						</div>
						<div className="d-flex justify-content-center">
							<p style={{ color: '#56bbed', fontSize: '20px', fontWeight: 'bold' }}>
								Passer une commande
							</p>
						</div>
					</div>
				</div>
				<div
					onClick={navigateTo('')}
					className="shadow d-flex justify-content-center pt-5"
					style={{ height: '260px', width: '260px', borderRadius: '5px', cursor: 'pointer' }}
				>
					<div>
						<div className="d-flex justify-content-center">
							<i
								className="icon-primary fas fa-info-circle mb-5"
								style={{ fontSize: '120px', color: '#ff373796' }}
							></i>
						</div>
						<div className="d-flex justify-content-center">
							<p style={{ color: '#ff3737', fontSize: '20px', fontWeight: 'bold' }}>
								Déclarer une défaillance
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
