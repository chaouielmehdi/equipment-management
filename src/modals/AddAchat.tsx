import React, { FC, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { ROUTE } from '../App';

interface IAddProduct {
	className?: string;
	isOpen: boolean;
	toggle: (event?: React.MouseEvent) => void;
}

interface Achats {
	id: string;
	designation: string;
	price: string;
	fournisseur: string;
	date: string;
	quantity: string;
}

const AddAchat: FC<IAddProduct> = ({ isOpen, toggle }) => {
	const [errors, setErrors] = useState({
		id: '',
		designation: '',
		price: '',
		fournisseur: '',
		date: '',
		quantity: '',
	});
	const [inputs, setInputs] = useState({
		id: '',
		designation: '',
		price: '',
		fournisseur: '',
		date: '',
		quantity: '',
	});

	const valifournisseur = {
		id: (event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value;
			const newInputs = { ...inputs };
			const newErrors = { ...errors };
			if (value === '') {
				newErrors.id = 'Champ obligatoire';
			} else {
				newErrors.id = '';
			}
			newInputs.id = value;
			setErrors(newErrors);
			setInputs(newInputs);
		},
		designation: (event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value;
			const newInputs = { ...inputs };
			const newErrors = { ...errors };
			if (value === '') {
				newErrors.designation = 'Champ obligatoire';
			} else {
				newErrors.designation = '';
			}
			newInputs.designation = value;
			setErrors(newErrors);
			setInputs(newInputs);
		},
		price: (event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value;
			const newInputs = { ...inputs };
			const newErrors = { ...errors };
			if (value === '') {
				newErrors.price = 'Champ obligatoire';
			} else {
				newErrors.price = '';
			}
			newInputs.price = value;
			setErrors(newErrors);
			setInputs(newInputs);
		},
		fournisseur: (event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value;
			const newInputs = { ...inputs };
			const newErrors = { ...errors };
			if (value === '') {
				newErrors.fournisseur = 'Champ obligatoire!';
			} else {
				newErrors.fournisseur = '';
			}
			newInputs.fournisseur = value;
			setErrors(newErrors);
			setInputs(newInputs);
		},
		date: (event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value;
			const newInputs = { ...inputs };
			const newErrors = { ...errors };
			if (value === '') {
				newErrors.date = 'Champ obligatoire';
			} else {
				newErrors.date = '';
			}
			newInputs.date = value;
			setErrors(newErrors);
			setInputs(newInputs);
		},
		quantity: (event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value;
			const newInputs = { ...inputs };
			const newErrors = { ...errors };
			if (value === '') {
				newErrors.quantity = 'Champ obligatoire';
			} else {
				newErrors.quantity = '';
			}
			newInputs.quantity = value;
			setErrors(newErrors);
			setInputs(newInputs);
		},
	};

	function getStoredAchats() {
		const Achats = localStorage.getItem('Achats');
		if (Achats) {
			return JSON.parse(Achats);
		}
		return null;
	}

	const handleAdd = () => {
		const storedAchats = getStoredAchats();

		if (!storedAchats) {
			let singleAchat: Achats[] = [
				{
					id: inputs.id,
					designation: inputs.designation,
					price: inputs.price,
					fournisseur: inputs.fournisseur,
					date: inputs.date,
					quantity: inputs.quantity,
				},
			];
			localStorage.setItem('Achats', JSON.stringify(singleAchat));
		} else {
			let addedAchat = {
				id: inputs.id,
				designation: inputs.designation,
				price: inputs.price,
				fournisseur: inputs.fournisseur,
				date: inputs.date,
				quantity: inputs.quantity,
			};
			storedAchats.push(addedAchat);
			localStorage.setItem('Achats', JSON.stringify(storedAchats));
		}
		window.location.replace(ROUTE.AGENT_ACHAT);
		toggle();
	};

	return (
		<>
			<Modal isOpen={isOpen} toggle={toggle}>
				<ModalHeader toggle={toggle}>Ajouter un Achat </ModalHeader>
				<ModalBody>
					<div className="d-flex align-items-center mt-1">
						<span className="font-weight-bold" style={{ width: 150 }}>
							ID :
						</span>
						<div className="d-flex  flex-column">
							<input
								style={{ width: '200px', height: '30px' }}
								className={
									'form-control ml-1 input-style ' + (errors.id === '' ? '' : 'is-invalid')
								}
								type="text"
								onChange={valifournisseur.id}
							/>
							<div className="invalid-feedback text-left ml-5">{errors.id}</div>
						</div>
					</div>
					<div className="d-flex align-items-center mt-1">
						<span className="font-weight-bold" style={{ width: 150 }}>
							designation :
						</span>
						<input
							style={{ width: '200px', height: '30px' }}
							className={
								'form-control ml-1 input-style ' +
								(errors.designation === '' ? '' : 'is-invalid')
							}
							type="text"
							onChange={valifournisseur.designation}
						/>
					</div>
					<div className="d-flex align-items-center mt-1">
						<span className="font-weight-bold" style={{ width: 150 }}>
							Prix unitaire :
						</span>
						<input
							style={{ width: '200px', height: '30px' }}
							className={'form-control ml-1 ' + (errors.price === '' ? '' : 'is-invalid')}
							type="number"
							onChange={valifournisseur.price}
						/>
					</div>
					<div className="d-flex align-items-center mt-1">
						<span className="font-weight-bold" style={{ width: 150 }}>
							fournisseur :
						</span>
						<input
							style={{ width: '200px', height: '30px' }}
							className={'form-control ml-1 ' + (errors.fournisseur === '' ? '' : 'is-invalid')}
							type="text"
							onChange={valifournisseur.fournisseur}
						/>
					</div>
					<div className="d-flex align-items-center mt-1">
						<span className="font-weight-bold" style={{ width: 150 }}>
							date :
						</span>
						<input
							style={{ width: '200px', height: '30px' }}
							className={'form-control ml-1 ' + (errors.date === '' ? '' : 'is-invalid')}
							type="date"
							onChange={valifournisseur.date}
						/>
					</div>
					<div className="d-flex align-items-center mt-1">
						<span className="font-weight-bold" style={{ width: 150 }}>
							Quantité :
						</span>
						<input
							style={{ width: '200px', height: '30px' }}
							className={'form-control ml-1 ' + (errors.date === '' ? '' : 'is-invalid')}
							type="number"
							onChange={valifournisseur.quantity}
						/>
					</div>
				</ModalBody>
				<ModalFooter>
					<div className="d-flex justify-content-center align-items-center container-fluid ">
						<button type="button" className="primary button-style m-0" onClick={handleAdd}>
							Ajouter
						</button>
					</div>
				</ModalFooter>
			</Modal>
		</>
	);
};

export default AddAchat;
