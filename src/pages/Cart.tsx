import { FC, ReactElement, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { products } from '../data/products';

interface CartType {
	reference: string;
	quantity: number;
}

const Cart: FC = (): ReactElement => {
	const cart = (JSON.parse(localStorage.getItem('cart') || '[]') || []) as CartType[];
	const [cartProducts, setCartProducts] = useState(products);

	const initProducts = () => {
		const newCartProducts = [] as typeof products;

		let cart = (JSON.parse(localStorage.getItem('cart') || '[]') || []) as CartType[];
		if (cart) {
			const cartReferences = cart.map((element) => element.reference);

			products.forEach((product) => {
				if (cartReferences.includes(product.reference)) {
					newCartProducts.push(product);
				}
			});

			setCartProducts(newCartProducts);
		}
	};

	useEffect(() => {
		initProducts();
	}, []);

	return (
		<div className="row">
			<div className="d-flex align-items-center justify-content-between" style={{ marginTop: '80px' }}>
				<div>
					<h1 className="fw-bold">Panier</h1>
				</div>
				<div>
					<button type="button" className="primary btn-lg m-0">
						Demander devis
					</button>
				</div>
			</div>

			{cartProducts.length === 0 && <span>Panier vide</span>}

			{cartProducts.map((product, index) => (
				<div key={product.reference} className="col-4 my-3">
					<div className="little-shadow p-3">
						<div className="d-flex justify-content-center">
							<img src={product.img} height="200px" alt="" />
						</div>
						<div className="d-flex justify-content-center mt-3">
							<span className="text-center" style={{ fontSize: '20px', fontWeight: 'bold' }}>
								{product.name} &nbsp;
							</span>
						</div>
						<div className="d-flex justify-content-center mt-3">
							<span className="text-center" style={{ fontSize: '20px', fontWeight: 'bold' }}>
								<span className="c-grey">({product.reference})</span>
							</span>
						</div>
						<div className="d-flex justify-content-center">
							<span className="text-center" style={{ fontSize: '14px' }}>
								{product.description}
							</span>
						</div>

						<div className="d-flex justify-content-center mt-3">
							<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Quantité :</span>
							&nbsp;
							<input
								style={{ width: '50px' }}
								type="number"
								min={1}
								value={cart[index]?.quantity}
								disabled={true}
							/>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default Cart;
