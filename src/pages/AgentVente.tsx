import { FC, ReactElement, useState } from 'react';
import { toast } from 'react-toastify';
import AddVente from '../modals/AddVente';

export interface FournisseurType {
	id: string;
	entreprise: string;
	tel: string;
	ville: string;
	address: string;
}

const AgentAchat: FC = (): ReactElement => {
	const [listFournisseur, setListFournisseur] = useState<FournisseurType[]>(
		JSON.parse(localStorage.getItem('Fournisseurs') || '[]') || []
	);

	const handleSubmit = () => {
		toggle();
	};
	const [modal, setModal] = useState<boolean>(false);
	const toggle = () => setModal(!modal);

	const deleteElement = (id: String) => () => {
		const newUpdatedlist = listFournisseur.filter((products) => {
			return products.id !== id;
		});

		localStorage.setItem('Fournisseurs', JSON.stringify(newUpdatedlist));

		setListFournisseur(newUpdatedlist);

		toast.success('Fournisseur supprimé');
	};

	return (
		<>
			<div className="row">
				<div
					className="d-flex align-items-center justify-content-between mb-5"
					style={{ marginTop: '80px' }}
				>
					<div>
						<h1 className="fw-bold">Fournisseurs : </h1>
					</div>
					<div>
						<button type="button" className="primary btn-lg m-0" onClick={handleSubmit}>
							Ajouter un Fournisseur
						</button>
					</div>
				</div>

				{listFournisseur.length === 0 ? (
					<span>Fournisseurs vide</span>
				) : (
					<div className="col-12 mt-3">
						<table className="table">
							<thead>
								<tr>
									<th scope="col" className="col-1">
										ID
									</th>
									<th scope="col">Nom de l'entreprise</th>
									<th scope="col">N° Tel</th>
									<th scope="col">Ville</th>
									<th scope="col">Adresse</th>
									<th scope="col" className="col-1"></th>
								</tr>
							</thead>
							<tbody>
								{listFournisseur.map((value) => (
									<tr>
										<td>{value.id}</td>
										<td>{value.entreprise}</td>
										<td>{value.tel}</td>
										<td>{value.ville}</td>
										<td>{value.address}</td>
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
			<AddVente isOpen={modal} toggle={toggle} />
		</>
	);
};

export default AgentAchat;
