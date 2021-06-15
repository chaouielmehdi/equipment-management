import { FC, ReactElement, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { ROUTE } from '../App';
import { products } from '../data/products';

interface DevisType {
	reference: string;
	quantity: number;
}

const AgentDevis: FC = (): ReactElement => {
	const history = useHistory();

	const navigateTo = (route: string) => () => {
		history.push(route);
	};

	const [devisProducts, setDevisProducts] = useState<typeof products>([]);

	const productsDevis = JSON.parse(localStorage.getItem('Devis') || '[]') as DevisType[];
	const demandeurDevis = localStorage.getItem('Demandeur-devis');

	const initProducts = () => {
		const newDevisProducts = [] as typeof products;
		//let cart = (JSON.parse(localStorage.getItem('cart') || '[]') || []) as CartType[];
		if (productsDevis) {
			let references = productsDevis.map((element) => element.reference);

			products.forEach((product) => {
				if (references.includes(product.reference)) {
					newDevisProducts.push(product);
				}
			});

			setDevisProducts(newDevisProducts);
		}
	};
	useEffect(() => {
		initProducts();
	}, []);

	return (
		<div className="row">
			<h1 className="fw-bold" style={{ marginTop: '80px', fontSize: '28px' }}>
				List des produit demandé par : {demandeurDevis}
			</h1>

			{devisProducts.length === 0 && <span>Devis vide</span>}

			{devisProducts.map((product, index) => (
				<div key={product.reference} className=" px-5 my-3">
					<div className="little-shadow px-5 py-3">
						{/* <div className="d-flex justify-content-end">
							<button
								type="button"
								className="text-danger button-close"
								onClick={deleteElement(product.reference)}
							>
								<i className="fas fa-trash-alt"></i>
							</button>
						</div> */}
						<div className="d-flex justify-content-between p-3">
							<div className="d-flex justify-content-center">
								<img src={product.img} height="200px" alt="" />
							</div>

							<div className="d-flex flex-column mx-2">
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
							<div className="d-flex justify-content-between align-items-center mb-5">
								<span style={{ fontSize: '20px', fontWeight: 'bold' }}>
									Qté : {productsDevis[index]?.quantity}
								</span>
								&nbsp;
								{/* <span style={{ fontSize: '18px' }}>{productsDevis[index]?.quantity}</span> */}
								{/* <input
									style={{ width: '50px' }}
									type="number"
									value={cart[index]?.quantity}
									disabled={true}
								/> */}
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default AgentDevis;
