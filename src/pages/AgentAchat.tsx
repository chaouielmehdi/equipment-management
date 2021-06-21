import { FC, ReactElement, useState } from 'react';
import { toast } from 'react-toastify';
import AddAchat from '../modals/AddAchat';

export interface AchatType {
	id: string;
	designation: string;
	price: string;
	fournisseur: string;
	date: string;
	quantity: string;
}

const AgentAchat: FC = (): ReactElement => {
	const [listAchat, setListAchat] = useState<AchatType[]>(
		JSON.parse(localStorage.getItem('Achats') || '[]') || []
	);

	const handleSubmit = () => {
		toggle();
	};
	const [modal, setModal] = useState<boolean>(false);
	const toggle = () => setModal(!modal);

	const deleteElement = (id: String) => () => {
		const newUpdatedlist = listAchat.filter((products) => {
			return products.id !== id;
		});

		localStorage.setItem('Achats', JSON.stringify(newUpdatedlist));

		setListAchat(newUpdatedlist);

		toast.success('Achat supprimé');
	};

	return (
		<>
			<div className="row">
				<div
					className="d-flex align-items-center justify-content-between mb-5"
					style={{ marginTop: '80px' }}
				>
					<div>
						<h1 className="fw-bold">Achats : </h1>
					</div>
					<div>
						<button type="button" className="primary btn-lg m-0" onClick={handleSubmit}>
							Ajouter un Achat
						</button>
					</div>
				</div>

				{listAchat.length === 0 ? (
					<span>Achats vide</span>
				) : (
					<div className="col-12 mt-3">
						<table className="table">
							<thead>
								<tr>
									<th scope="col" className="col-1">
										ID
									</th>
									<th scope="col">Designation</th>
									<th scope="col">Prix unitaire</th>
									<th scope="col">fournisseur</th>
									<th scope="col">Date d'achat</th>
									<th scope="col">Quantité</th>
									<th scope="col" className="col-1"></th>
								</tr>
							</thead>
							<tbody>
								{listAchat.map((value) => (
									<tr>
										<td>{value.id}</td>
										<td>{value.designation}</td>
										<td>{value.price}</td>
										<td>{value.fournisseur}</td>
										<td>{value.date}</td>
										<td>{value.quantity}</td>
										<td>
											<button
												type="button"
												className="text-danger button-close"
												onClick={deleteElement(value.id)}
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
			<AddAchat isOpen={modal} toggle={toggle} />
		</>
	);
};

export default AgentAchat;
