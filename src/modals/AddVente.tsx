import React, { FC, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { ROUTE } from '../App';

interface IAddProduct {
	className?: string;
	isOpen: boolean;
	toggle: (event?: React.MouseEvent) => void;
}

interface Fournisseurs {
	id: string;
	entreprise: string;
	tel: string;
	ville: string;
	address: string;
}

const AddVente: FC<IAddProduct> = ({ isOpen, toggle }) => {
	const [errors, setErrors] = useState({
		id: '',
		entreprise: '',
		tel: '',
		address: '',
		ville: '',
	});
	const [inputs, setInputs] = useState({
		id: '',
		entreprise: '',
		tel: '',
		address: '',
		ville: '',
	});

	const validate = {
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
		entreprise: (event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value;
			const newInputs = { ...inputs };
			const newErrors = { ...errors };
			if (value === '') {
				newErrors.entreprise = 'Champ obligatoire';
			} else {
				newErrors.entreprise = '';
			}
			newInputs.entreprise = value;
			setErrors(newErrors);
			setInputs(newInputs);
		},
		tel: (event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value;
			const newInputs = { ...inputs };
			const newErrors = { ...errors };
			if (value === '') {
				newErrors.tel = 'Champ obligatoire';
			} else {
				newErrors.tel = '';
			}
			newInputs.tel = value;
			setErrors(newErrors);
			setInputs(newInputs);
		},
		address: (event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value;
			const newInputs = { ...inputs };
			const newErrors = { ...errors };
			if (value === '') {
				newErrors.address = 'Champ obligatoire';
			} else {
				newErrors.address = '';
			}
			newInputs.address = value;
			setErrors(newErrors);
			setInputs(newInputs);
		},
		ville: (event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value;
			const newInputs = { ...inputs };
			const newErrors = { ...errors };
			if (value === '') {
				newErrors.ville = 'Champ obligatoire!';
			} else {
				newErrors.ville = '';
			}
			newInputs.ville = value;
			setErrors(newErrors);
			setInputs(newInputs);
		},
	};

	function getStoredFournisseurs() {
		const fournisseurs = localStorage.getItem('Fournisseurs');
		if (fournisseurs) {
			return JSON.parse(fournisseurs);
		}
		return null;
	}

	const handleAdd = () => {
		const storedFournisseurs = getStoredFournisseurs();

		if (!storedFournisseurs) {
			let singleFournisseur: Fournisseurs[] = [
				{
					id: inputs.id,
					entreprise: inputs.entreprise,
					tel: inputs.tel,
					ville: inputs.ville,
					address: inputs.address,
				},
			];
			localStorage.setItem('Fournisseurs', JSON.stringify(singleFournisseur));
		} else {
			let addedFournisseur = {
				id: inputs.id,
				entreprise: inputs.entreprise,
				tel: inputs.tel,
				ville: inputs.ville,
				address: inputs.address,
			};
			storedFournisseurs.push(addedFournisseur);
			localStorage.setItem('Fournisseurs', JSON.stringify(storedFournisseurs));
		}
		window.location.replace(ROUTE.AGENT_FOURNISSEUR);
		toggle();
	};

	return (
		<>
			<Modal isOpen={isOpen} toggle={toggle}>
				<ModalHeader toggle={toggle}>Ajouter un Fournisseur </ModalHeader>
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
								onChange={validate.id}
							/>
							<div className="invalid-feedback text-left ml-5">{errors.id}</div>
						</div>
					</div>
					<div className="d-flex align-items-center mt-1">
						<span className="font-weight-bold" style={{ width: 150 }}>
							Entreprise :
						</span>
						<input
							style={{ width: '200px', height: '30px' }}
							className={
								'form-control ml-1 input-style ' +
								(errors.entreprise === '' ? '' : 'is-invalid')
							}
							type="text"
							onChange={validate.entreprise}
						/>
					</div>
					<div className="d-flex align-items-center mt-1">
						<span className="font-weight-bold" style={{ width: 150 }}>
							N° Tel :
						</span>
						<input
							style={{ width: '200px', height: '30px' }}
							className={
								'form-control ml-1 input-style ' + (errors.tel === '' ? '' : 'is-invalid')
							}
							type="text"
							onChange={validate.tel}
						/>
					</div>
					<div className="d-flex align-items-center mt-1">
						<span className="font-weight-bold" style={{ width: 150 }}>
							Address :
						</span>
						<input
							style={{ width: '200px', height: '30px' }}
							className={'form-control ml-1 ' + (errors.address === '' ? '' : 'is-invalid')}
							type="text"
							onChange={validate.address}
						/>
					</div>
					<div className="d-flex align-items-center mt-1">
						<span className="font-weight-bold" style={{ width: 150 }}>
							Ville :
						</span>
						<input
							style={{ width: '200px', height: '30px' }}
							className={'form-control ml-1 ' + (errors.ville === '' ? '' : 'is-invalid')}
							type="text"
							onChange={validate.ville}
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

export default AddVente;
