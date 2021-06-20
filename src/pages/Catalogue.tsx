import { FC, ReactElement, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

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

const Catalogue: FC = (): ReactElement => {
	const products = (JSON.parse(localStorage.getItem('Products') || '[]') || []) as Products[];
	const [quantities, setQuantities] = useState(new Array(products.length).fill(1));
	const [isAddedToCart, setIsAddedToCart] = useState<boolean[]>(new Array(products.length).fill(false));

	const initIsAddedToCart = () => {
		const newIsAddedToCart = [...isAddedToCart];

		let cart = (JSON.parse(localStorage.getItem('cart') || '[]') || []) as CartType[];
		if (cart) {
			const cartReferences = cart.map((element) => element.reference);

			products.forEach((product, index) => {
				if (cartReferences.includes(product.reference)) {
					newIsAddedToCart[index] = true;
				}
			});

			setIsAddedToCart(newIsAddedToCart);
		}
	};
	useEffect(() => {
		initIsAddedToCart();
	}, []);

	const handleChangeQuantity = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
		const newQuantities = [...quantities];

		if (+event.target.value > 0) {
			newQuantities[index] = +event.target.value;
		}

		setQuantities(newQuantities);
	};

	const addToCart = (index: number) => () => {
		let cart = (JSON.parse(localStorage.getItem('cart') || '[]') || []) as CartType[];

		cart.push({
			reference: products[index].reference,
			quantity: quantities[index],
		});

		// clean cart from duplicates
		cart = cart.filter(function (item, pos, self) {
			return self.indexOf(item) === pos;
		});

		// store data
		localStorage.setItem('cart', JSON.stringify(cart));
		initIsAddedToCart();

		toast.success('Element a été ajouté au panier');
	};

	return (
		<div className="row">
			<h1 className="fw-bold" style={{ marginTop: '80px' }}>
				Catalogue
			</h1>

			{products.map((product, index) => (
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

						{!isAddedToCart[index] && (
							<div className="d-flex justify-content-center mt-3">
								<span style={{ fontSize: '18px', fontWeight: 'bold' }}>Quantité :</span>{' '}
								&nbsp;
								<input
									style={{ width: '50px' }}
									type="number"
									min={1}
									value={quantities[index]}
									onChange={handleChangeQuantity(index)}
								/>
							</div>
						)}

						<div className="d-flex justify-content-center mt-3">
							{isAddedToCart[index] ? (
								'- Déjà ajouté au panier -'
							) : (
								<button className="btn btn-secondary" onClick={addToCart(index)}>
									Ajouter Au Panier
								</button>
							)}
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default Catalogue;
