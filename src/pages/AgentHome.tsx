import { FC, ReactElement } from 'react';
import { useHistory } from 'react-router';
import { ROUTE } from '../App';

const AgentHome: FC = (): ReactElement => {
	const history = useHistory();

	const navigateTo = (route: string) => () => {
		history.push(route);
	};

	return (
		<div className="row">
			<h1 className="fw-bold" style={{ marginTop: '80px' }}>
				SCM Biomedical Equipments
			</h1>

			<div className="d-flex flex-column">
				<div className="d-flex justify-content-around px-5 mx-5 mt-5">
					<div
						onClick={navigateTo(ROUTE.AGENT_STOCK)}
						className="shadow d-flex justify-content-center pt-5"
						style={{ height: '260px', width: '260px', borderRadius: '5px', cursor: 'pointer' }}
					>
						<div>
							<div className="d-flex justify-content-center">
								<i
									className="icon-primary fas fa-cubes mb-5"
									style={{ fontSize: '120px' }}
								></i>
							</div>
							<div className="d-flex justify-content-center">
								<p style={{ color: '#56bbed', fontSize: '20px', fontWeight: 'bold' }}>
									Products
								</p>
							</div>
						</div>
					</div>
					<div
						onClick={navigateTo(ROUTE.AGENT_DEVIS)}
						className="shadow d-flex justify-content-center pt-5"
						style={{ height: '260px', width: '260px', borderRadius: '5px', cursor: 'pointer' }}
					>
						<div>
							<div className="d-flex justify-content-center">
								<i
									className="icon-primary fas fa-cart-plus mb-5"
									style={{ fontSize: '120px' }}
								></i>
							</div>
							<div className="d-flex justify-content-center">
								<p style={{ color: '#56bbed', fontSize: '20px', fontWeight: 'bold' }}>
									Devis
								</p>
							</div>
						</div>
					</div>
					<div
						onClick={navigateTo(ROUTE.MAINTENANCE)}
						className="shadow d-flex justify-content-center pt-5"
						style={{ height: '260px', width: '260px', borderRadius: '5px', cursor: 'pointer' }}
					>
						<div>
							<div className="d-flex justify-content-center">
								<i
									className="icon-primary fas fa-tools mb-5"
									style={{ fontSize: '120px' }}
								></i>
							</div>
							<div className="d-flex justify-content-center">
								<p style={{ color: '#56bbed', fontSize: '20px', fontWeight: 'bold' }}>
									Maintenances
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="d-flex justify-content-around px-5 mx-5 mt-5">
					<div
						onClick={navigateTo(ROUTE.AGENT_FOURNISSEUR)}
						className="shadow d-flex justify-content-center pt-5"
						style={{ height: '260px', width: '260px', borderRadius: '5px', cursor: 'pointer' }}
					>
						<div>
							<div className="d-flex justify-content-center">
								<i
									className="icon-primary fas fa-users mb-5"
									style={{ fontSize: '120px' }}
								></i>
							</div>
							<div className="d-flex justify-content-center">
								<p style={{ color: '#56bbed', fontSize: '20px', fontWeight: 'bold' }}>
									Fournisseur
								</p>
							</div>
						</div>
					</div>
					<div
						onClick={navigateTo(ROUTE.AGENT_ACHAT)}
						className="shadow d-flex justify-content-center pt-5"
						style={{ height: '260px', width: '260px', borderRadius: '5px', cursor: 'pointer' }}
					>
						<div>
							<div className="d-flex justify-content-center">
								<i
									className="icon-primary fas fa-file-invoice mb-5"
									style={{ fontSize: '120px' }}
								></i>
							</div>
							<div className="d-flex justify-content-center">
								<p style={{ color: '#56bbed', fontSize: '20px', fontWeight: 'bold' }}>
									Achat
								</p>
							</div>
						</div>
					</div>
					<div
						onClick={navigateTo(ROUTE.AGENT_VENTE)}
						className="shadow d-flex justify-content-center pt-5"
						style={{ height: '260px', width: '260px', borderRadius: '5px', cursor: 'pointer' }}
					>
						<div>
							<div className="d-flex justify-content-center">
								<i
									className="icon-primary fas fa-chart-line mb-5"
									style={{ fontSize: '120px' }}
								></i>
							</div>
							<div className="d-flex justify-content-center">
								<p style={{ color: '#56bbed', fontSize: '20px', fontWeight: 'bold' }}>
									Ventes
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AgentHome;
