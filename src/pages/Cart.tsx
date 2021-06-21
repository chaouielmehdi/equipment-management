import { FC, ReactElement, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import emptycart from '../img/emptycart(1).png';
import { ROUTE } from '../App';

interface CartType {
	reference: string;
	quantity: number;
}
interface Products {
	name: string;
	reference: string;
	description: string;
	img: string;
}

const Cart: FC = (): ReactElement => {
	const products = (JSON.parse(localStorage.getItem('Products') || '[]') || []) as Products[];
	const cart = (JSON.parse(localStorage.getItem('cart') || '[]') || []) as CartType[];
	const [cartProducts, setCartProducts] = useState<typeof products>([]);

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

	const deleteElement = (reference: String) => () => {
		const newCart = cart.filter((products) => {
			return products.reference !== reference;
		});

		localStorage.setItem('cart', JSON.stringify(newCart));

		const newCartProducts = cartProducts.filter((products) => {
			return products.reference !== reference;
		});

		setCartProducts(newCartProducts);

		toast.success('Element a été supprimé du panier');
	};

	function getCart() {
		const item = localStorage.getItem('cart');

		if (item) {
			return JSON.parse(item);
		}
		return null;
	}
	function getConectedUser() {
		const connectedUser = localStorage.getItem('ConnectedUser');

		if (connectedUser) {
			return JSON.parse(connectedUser);
		}
		return null;
	}

	const handleSubmit = () => {
		const cart = getCart();
		const connectedUser = getConectedUser();

		if (cart === null) {
			toast.error('Panier est vide!!');
		} else {
			localStorage.setItem('Devis', JSON.stringify(cart));
			localStorage.setItem('Demandeur-devis', JSON.stringify(connectedUser));
			localStorage.removeItem('cart');
			toast.success('Devis soumis avec succés!');
			window.location.replace(ROUTE.CART);
		}
	};

	return (
		<div className="row">
			<div className="d-flex align-items-center justify-content-between" style={{ marginTop: '80px' }}>
				<div>
					<h1 className="fw-bold">Panier</h1>
				</div>
				<div>
					{cartProducts.length > 0 && (
						<button type="button" className="primary btn-lg m-0" onClick={handleSubmit}>
							Demander devis
						</button>
					)}
				</div>
			</div>

			{/* {cartProducts.length === 0 && <span>Panier vide</span>} */}
			{cartProducts.length === 0 && (
				<div className="d-flex justify-content-center">
					<img src={emptycart} height="200px" alt="" />
				</div>
			)}

			{cartProducts.map((product, index) => (
				<div key={product.reference} className="col-4 my-3">
					<div className="little-shadow p-3">
						<div className="d-flex justify-content-end">
							<button
								type="button"
								className="text-danger button-close"
								onClick={deleteElement(product.reference)}
							>
								<i className="fas fa-trash-alt"></i>
							</button>
						</div>
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
