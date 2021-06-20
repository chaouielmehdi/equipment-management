import React, { FC, ReactElement, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

interface IAddProduct {
	className?: string;
	isOpen: boolean;
	toggle: (event?: React.MouseEvent) => void;
}

interface Products {
	name: string;
	reference: string;
	quantity: number;
	description: string;
	img: string;
}

const AddProductModal: FC<IAddProduct> = ({ isOpen, toggle }) => {
	const [errors, setErrors] = useState({
		name: '',
		reference: '',
		quantity: '',
		img: '',
		description: '',
	});
	const [inputs, setInputs] = useState({
		name: '',
		reference: '',
		quantity: '',
		img: '',
		description: '',
	});

	const validate = {
		name: (event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value;
			const newInputs = { ...inputs };
			const newErrors = { ...errors };
			if (value === '') {
				newErrors.name = 'Champ obligatoire';
			} else {
				newErrors.name = '';
			}
			newInputs.name = value;
			setErrors(newErrors);
			setInputs(newInputs);
		},
		reference: (event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value;
			const newInputs = { ...inputs };
			const newErrors = { ...errors };
			if (value === '') {
				newErrors.reference = 'Champ obligatoire';
			} else {
				newErrors.reference = '';
			}
			newInputs.reference = value;
			setErrors(newErrors);
			setInputs(newInputs);
		},
		quantity: (event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value;
			const newInputs = { ...inputs };
			const newErrors = { ...errors };
			if (value == '') {
				newErrors.quantity = 'Champ obligatoire';
			} else {
				newErrors.quantity = '';
			}
			newInputs.quantity = value;
			setErrors(newErrors);
			setInputs(newInputs);
		},
		img: (event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value;
			const newInputs = { ...inputs };
			const newErrors = { ...errors };
			if (value === '') {
				newErrors.img = 'Champ obligatoire';
			} else {
				newErrors.img = '';
			}
			newInputs.img = value;
			setErrors(newErrors);
			setInputs(newInputs);
		},
		description: (event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value;
			const newInputs = { ...inputs };
			const newErrors = { ...errors };
			if (value === '') {
				newErrors.description = 'Champ obligatoire!';
			} else {
				newErrors.description = '';
			}
			newInputs.description = value;
			setErrors(newErrors);
			setInputs(newInputs);
		},
	};

	function getStoredProducts() {
		const products = localStorage.getItem('Products');
		if (products) {
			return JSON.parse(products);
		}
		return null;
	}

	const handleAdd = () => {
		const storedProducts = getStoredProducts();

		if (!storedProducts) {
			let productsList: Products[] = [
				{
					name: inputs.name,
					reference: inputs.reference,
					quantity: parseInt(inputs.quantity, 10),
					description: inputs.description,
					img: inputs.img,
				},
			];
			localStorage.setItem('Products', JSON.stringify(productsList));
		} else {
			let productAdded = {
				name: inputs.name,
				reference: inputs.reference,
				quantity: parseInt(inputs.quantity, 10),
				description: inputs.description,
				img: inputs.img,
			};
			storedProducts.push(productAdded);
			localStorage.setItem('Products', JSON.stringify(storedProducts));
		}
		toggle();
	};

	return (
		<>
			<Modal isOpen={isOpen} toggle={toggle}>
				<ModalHeader toggle={toggle}>Ajouter un produit </ModalHeader>
				<ModalBody>
					<div className="d-flex align-items-center mt-1">
						<span className="font-weight-bold" style={{ width: 150 }}>
							Nom du produit :
						</span>
						<div className="d-flex  flex-column">
							<input
								style={{ width: '200px', height: '30px' }}
								className={
									'form-control ml-1 input-style ' +
									(errors.name === '' ? '' : 'is-invalid')
								}
								type="text"
								onChange={validate.name}
							/>
							<div className="invalid-feedback text-left ml-5">{errors.name}</div>
						</div>
					</div>
					<div className="d-flex align-items-center mt-1">
						<span className="font-weight-bold" style={{ width: 150 }}>
							Ref du produit :
						</span>
						<input
							style={{ width: '200px', height: '30px' }}
							className={
								'form-control ml-1 input-style ' +
								(errors.reference === '' ? '' : 'is-invalid')
							}
							type="text"
							onChange={validate.reference}
						/>
					</div>
					<div className="d-flex align-items-center mt-1">
						<span className="font-weight-bold" style={{ width: 150 }}>
							Quantité :
						</span>
						<input
							style={{ width: '200px', height: '30px' }}
							className={
								'form-control ml-1 input-style ' +
								(errors.quantity === '' ? '' : 'is-invalid')
							}
							type="number"
							min={1}
							onChange={validate.quantity}
						/>
					</div>
					<div className="d-flex align-items-center mt-1">
						<span className="font-weight-bold" style={{ width: 150 }}>
							URL image :
						</span>
						<input
							style={{ width: '200px', height: '30px' }}
							className={'form-control ml-1 ' + (errors.img === '' ? '' : 'is-invalid')}
							type="text"
							onChange={validate.img}
						/>
					</div>
					<div className="d-flex align-items-center mt-1">
						<span className="font-weight-bold" style={{ width: 150 }}>
							Description :
						</span>
						<input
							className={
								'form-control ml-1 input-style ' +
								(errors.description === '' ? '' : 'is-invalid')
							}
							style={{ width: '280px', height: '30px' }}
							type="text"
							onChange={validate.description}
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

export default AddProductModal;
