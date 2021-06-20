import { FC, ReactElement, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import AddProductModal from '../modals/AddProductModal';

/* interface CartType {
	reference: string;
	quantity: number;
} */
interface Products {
	name: string;
	reference: string;
	quantity: number;
	description: string;
	img: string;
}

const AgentStock: FC = (): ReactElement => {
	const [stockProducts, setStockProducts] = useState<Products[]>([]);
	const initProducts = () => {
		const products = (JSON.parse(localStorage.getItem('Products') || '[]') || []) as Products[];
		setStockProducts(products);
	};

	const deleteElement = (reference: String) => () => {
		const newUpdatedStock = stockProducts.filter((products) => {
			return products.reference !== reference;
		});

		localStorage.setItem('Products', JSON.stringify(newUpdatedStock));

		setStockProducts(newUpdatedStock);

		toast.success('Product supprimé du stock');
	};

	const handleSubmit = () => {
		toggle();
	};

	const [modal, setModal] = useState<boolean>(false);
	const toggle = () => setModal(!modal);
	useEffect(() => {
		initProducts();
	}, [modal]);
	return (
		<>
			<div className="row">
				<div
					className="d-flex align-items-center justify-content-between"
					style={{ marginTop: '80px' }}
				>
					<div>
						<h1 className="fw-bold">List des produit</h1>
					</div>
					<div>
						<button type="button" className="primary btn-lg m-0" onClick={handleSubmit}>
							Ajouter un Produit
						</button>
					</div>
				</div>

				{stockProducts.length === 0 && <span>Aucun produit n'est stocké!</span>}

				{stockProducts.map((product, index) => (
					<div key={product.reference} className=" px-5 my-3">
						<div className="little-shadow px-3 py-3">
							<div className="d-flex justify-content-end">
								<button
									type="button"
									className="text-danger button-close"
									onClick={deleteElement(product.reference)}
								>
									<i className="fas fa-trash-alt"></i>
								</button>
							</div>
							<div className="d-flex justify-content-between p-3">
								<div className="d-flex justify-content-center mx-3">
									<img src={product.img} height="200px" alt="" />
								</div>

								<div className="d-flex flex-column mx-3">
									<div className="d-flex justify-content-center mt-3">
										<span
											className="text-center"
											style={{ fontSize: '20px', fontWeight: 'bold' }}
										>
											{product.name} &nbsp;
										</span>
									</div>
									<div className="d-flex justify-content-center mt-3">
										<span
											className="text-center"
											style={{ fontSize: '20px', fontWeight: 'bold' }}
										>
											<span className="c-grey">({product.reference})</span>
										</span>
									</div>
									<div className="d-flex justify-content-center">
										<span className="text-center" style={{ fontSize: '14px' }}>
											{product.description}
										</span>
									</div>
								</div>
								<div className="d-flex justify-content-between align-items-center mx-3 mb-5">
									<span style={{ width: '80px', fontSize: '20px', fontWeight: 'bold' }}>
										Qté : {product.quantity}
									</span>
									&nbsp;
								</div>
								{/* <div className="d-flex justify-content-between align-items-center mb-5">
								<input
									style={{ width: '50px' }}
									type="number"
									min={1}
									
									className={'form-control ' + (inputValue === '' ? '' : 'is-invalid')}
									onChange={checkInputValue}
									type={Number}
								/>
							</div> */}
							</div>
						</div>
					</div>
				))}
			</div>
			<AddProductModal isOpen={modal} toggle={toggle} />
		</>
	);
};

export default AgentStock;
