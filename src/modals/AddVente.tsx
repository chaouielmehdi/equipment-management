import React, { FC, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { ROUTE } from '../App';

interface IAddProduct {
	className?: string;
	isOpen: boolean;
	toggle: (event?: React.MouseEvent) => void;
}

interface VenteType {
	idCommand: string;
	client: string;
	refEquipmentDemandé: string;
	dateVente: string;
	qteDemandé: string;
	prixVente: string;
	total: string;
}

const AddVente: FC<IAddProduct> = ({ isOpen, toggle }) => {
	const [errors, setErrors] = useState({
		idCommand: '',
		client: '',
		refEquipmentDemandé: '',
		dateVente: '',
		qteDemandé: '',
		prixVente: '',
		total: '',
	});
	const [inputs, setInputs] = useState({
		idCommand: '',
		client: '',
		refEquipmentDemandé: '',
		dateVente: '',
		qteDemandé: '',
		prixVente: '',
		total: '',
	});

	const validate = {
		idCommand: (event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value;
			const newInputs = { ...inputs };
			const newErrors = { ...errors };
			if (value === '') {
				newErrors.idCommand = 'Champ obligatoire';
			} else {
				newErrors.idCommand = '';
			}
			newInputs.idCommand = value;
			setErrors(newErrors);
			setInputs(newInputs);
		},
		client: (event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value;
			const newInputs = { ...inputs };
			const newErrors = { ...errors };
			if (value === '') {
				newErrors.client = 'Champ obligatoire';
			} else {
				newErrors.client = '';
			}
			newInputs.client = value;
			setErrors(newErrors);
			setInputs(newInputs);
		},
		refEquipmentDemandé: (event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value;
			const newInputs = { ...inputs };
			const newErrors = { ...errors };
			if (value === '') {
				newErrors.refEquipmentDemandé = 'Champ obligatoire';
			} else {
				newErrors.refEquipmentDemandé = '';
			}
			newInputs.refEquipmentDemandé = value;
			setErrors(newErrors);
			setInputs(newInputs);
		},
		dateVente: (event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value;
			const newInputs = { ...inputs };
			const newErrors = { ...errors };
			if (value === '') {
				newErrors.dateVente = 'Champ obligatoire';
			} else {
				newErrors.dateVente = '';
			}
			newInputs.dateVente = value;
			setErrors(newErrors);
			setInputs(newInputs);
		},
		qteDemandé: (event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value;
			const newInputs = { ...inputs };
			const newErrors = { ...errors };
			if (value === '') {
				newErrors.qteDemandé = 'Champ obligatoire!';
			} else {
				newErrors.qteDemandé = '';
			}
			newInputs.qteDemandé = value;
			setErrors(newErrors);
			setInputs(newInputs);
		},
		prixVente: (event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value;
			const newInputs = { ...inputs };
			const newErrors = { ...errors };
			if (value === '') {
				newErrors.prixVente = 'Champ obligatoire!';
			} else {
				newErrors.prixVente = '';
			}
			newInputs.prixVente = value;
			setErrors(newErrors);
			setInputs(newInputs);
		},
		total: (event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value;
			const newInputs = { ...inputs };
			const newErrors = { ...errors };
			if (value === '') {
				newErrors.total = 'Champ obligatoire!';
			} else {
				newErrors.total = '';
			}
			newInputs.total = value;
			setErrors(newErrors);
			setInputs(newInputs);
		},
	};

	function getStoredVentes() {
		const ventes = localStorage.getItem('Ventes');
		if (ventes) {
			return JSON.parse(ventes);
		}
		return null;
	}

	const handleAdd = () => {
		const storedVentes = getStoredVentes();

		if (!storedVentes) {
			let singleFournisseur: VenteType[] = [
				{
					idCommand: inputs.idCommand,
					client: inputs.client,
					refEquipmentDemandé: inputs.refEquipmentDemandé,
					dateVente: inputs.dateVente,
					qteDemandé: inputs.qteDemandé,
					prixVente: inputs.prixVente,
					total: inputs.total,
				},
			];
			localStorage.setItem('Ventes', JSON.stringify(singleFournisseur));
		} else {
			let addedVentes = {
				idCommand: inputs.idCommand,
				client: inputs.client,
				refEquipmentDemandé: inputs.refEquipmentDemandé,
				dateVente: inputs.dateVente,
				qteDemandé: inputs.qteDemandé,
				prixVente: inputs.prixVente,
				total: inputs.total,
			};
			storedVentes.push(addedVentes);
			localStorage.setItem('Ventes', JSON.stringify(storedVentes));
		}
		window.location.replace(ROUTE.AGENT_VENTE);
		toggle();
	};

	return (
		<>
			<Modal isOpen={isOpen} toggle={toggle}>
				<ModalHeader toggle={toggle}>Ajouter un Fournisseur </ModalHeader>
				<ModalBody>
					<div className="d-flex align-items-center mt-1">
						<span className="font-weight-bold" style={{ width: 150 }}>
							N° de commande :
						</span>
						<div className="d-flex  flex-column">
							<input
								style={{ width: '200px', height: '30px' }}
								className={
									'form-control ml-1 input-style ' +
									(errors.idCommand === '' ? '' : 'is-invalid')
								}
								type="text"
								onChange={validate.idCommand}
							/>
							<div className="invalid-feedback text-left ml-5">{errors.idCommand}</div>
						</div>
					</div>
					<div className="d-flex align-items-center mt-1">
						<span className="font-weight-bold" style={{ width: 150 }}>
							Nom de client :
						</span>
						<input
							style={{ width: '200px', height: '30px' }}
							className={
								'form-control ml-1 input-style ' + (errors.client === '' ? '' : 'is-invalid')
							}
							type="text"
							onChange={validate.client}
						/>
					</div>
					<div className="d-flex align-items-center mt-1">
						<span className="font-weight-bold" style={{ width: 150 }}>
							Réf equipement demandé :
						</span>
						<input
							style={{ width: '200px', height: '30px' }}
							className={
								'form-control ml-1 input-style ' +
								(errors.refEquipmentDemandé === '' ? '' : 'is-invalid')
							}
							type="text"
							onChange={validate.refEquipmentDemandé}
						/>
					</div>
					<div className="d-flex align-items-center mt-1">
						<span className="font-weight-bold" style={{ width: 150 }}>
							Date de vente :
						</span>
						<input
							style={{ width: '200px', height: '30px' }}
							type="date"
							onChange={validate.dateVente}
						/>
					</div>
					<div className="d-flex align-items-center mt-1">
						<span className="font-weight-bold" style={{ width: 150 }}>
							Quantité demandé :
						</span>
						<input
							style={{ width: '200px', height: '30px' }}
							className={'form-control ml-1 ' + (errors.qteDemandé === '' ? '' : 'is-invalid')}
							type="text"
							onChange={validate.qteDemandé}
						/>
					</div>
					<div className="d-flex align-items-center mt-1">
						<span className="font-weight-bold" style={{ width: 150 }}>
							Prix de vente :
						</span>
						<input
							style={{ width: '200px', height: '30px' }}
							className={'form-control ml-1 ' + (errors.qteDemandé === '' ? '' : 'is-invalid')}
							type="text"
							onChange={validate.prixVente}
						/>
					</div>
					<div className="d-flex align-items-center mt-1">
						<span className="font-weight-bold" style={{ width: 150 }}>
							Total :
						</span>
						<input
							style={{ width: '200px', height: '30px' }}
							className={'form-control ml-1 ' + (errors.qteDemandé === '' ? '' : 'is-invalid')}
							type="text"
							onChange={validate.total}
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
