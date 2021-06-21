import { FC, ReactElement, useState } from 'react';
import { toast } from 'react-toastify';
import AddVente from '../modals/AddVente';

export interface VenteType {
	idCommand: string;
	client: string;
	refEquipmentDemandé: string;
	dateVente: Date;
	qteDemandé: string;
	prixVente: string;
	total: string;
}

const AgentAchat: FC = (): ReactElement => {
	const [listVentes, setListVentes] = useState<VenteType[]>(
		JSON.parse(localStorage.getItem('Ventes') || '[]') || []
	);

	const handleSubmit = () => {
		toggle();
	};
	const [modal, setModal] = useState<boolean>(false);
	const toggle = () => setModal(!modal);

	const deleteElement = (idCommand: String) => () => {
		const newUpdatedlist = listVentes.filter((products) => {
			return products.idCommand !== idCommand;
		});

		localStorage.setItem('Ventes', JSON.stringify(newUpdatedlist));

		setListVentes(newUpdatedlist);

		toast.success('Vente supprimé');
	};

	return (
		<>
			<div className="row">
				<div
					className="d-flex align-items-center justify-content-between mb-5"
					style={{ marginTop: '80px' }}
				>
					<div>
						<h1 className="fw-bold">Ventes : </h1>
					</div>
					<div>
						<button type="button" className="primary btn-lg m-0" onClick={handleSubmit}>
							Ajouter une vente
						</button>
					</div>
				</div>

				{listVentes.length === 0 ? (
					<span>Aucune vente</span>
				) : (
					<div className="col-12 mt-3">
						<table className="table">
							<thead>
								<tr>
									<th scope="col" className="col-1">
										N° de commande
									</th>
									<th scope="col">Nom de client</th>
									<th scope="col">Réf equipement demandé</th>
									<th scope="col">Date de vente</th>
									<th scope="col">Quantité demandé</th>
									<th scope="col">Prix de vente</th>
									<th scope="col">Total</th>
									<th scope="col" className="col-1"></th>
								</tr>
							</thead>
							<tbody>
								{listVentes.map((value) => (
									<tr>
										<td>{value.idCommand}</td>
										<td>{value.client}</td>
										<td>{value.refEquipmentDemandé}</td>
										<td>{value.dateVente}</td>
										<td>{value.qteDemandé}</td>
										<td>{value.prixVente}</td>
										<td>{value.total}</td>
										<td>
											<button
												type="button"
												className="text-danger button-close"
												onClick={deleteElement(value.idCommand)}
											>
												<i className="fas fa-trash-alt"></i>
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
			<AddVente isOpen={modal} toggle={toggle} />
		</>
	);
};

export default AgentAchat;
