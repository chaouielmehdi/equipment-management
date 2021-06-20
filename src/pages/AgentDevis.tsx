import { FC, ReactElement, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
//import { useHistory } from 'react-router';
//import { ROUTE } from '../App';
import emptycart from '../img/emptycart(1).png';

interface DevisRequestType {
	reference: string;
	quantity: number;
}
interface DevisReplyType {
	reference: string;
	quantity: number;
	unitPrice: number;
}
interface Products {
	name: string;
	reference: string;
	description: string;
	img: string;
	quantity?: string;
}

const AgentDevis: FC = (): ReactElement => {
	/*const history = useHistory();

	const navigateTo = (route: string) => () => {
		history.push(route);
	}; */
	const products = (JSON.parse(localStorage.getItem('Products') || '[]') || []) as Products[];
	const [devisProducts, setDevisProducts] = useState<typeof products>([]);
	const productsDevis = JSON.parse(localStorage.getItem('Devis') || '[]') as DevisRequestType[];
	const demandeurDevis = localStorage.getItem('Demandeur-devis');

	useEffect(() => {
		const initProducts = () => {
			const productsDevis = JSON.parse(localStorage.getItem('Devis') || '[]') as DevisRequestType[];
			//productsDevis is inside to suppress following warning :
			//React Hook useEffect has a missing dependency: 'initIsAddedToCart'. Either include it or remove the dependency array  react-hooks/exhaustive-deps

			const newDevisProducts = [] as typeof products;
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
		initProducts();
	}, []);

	//const [inputValue, setInputValue] = useState('');
	const [inputValue, setInputValue] = useState(new Array(productsDevis.length).fill(1));
	const [total, setTotal] = useState(0);

	const checkInputValue = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		const newInputValue = [...inputValue];
		newInputValue[index] = parseInt(value, 10);
		setInputValue(newInputValue);
	};

	useEffect(() => {
		const newTotal: number = inputValue.reduce((a, b) => parseInt(a, 10) + parseInt(b, 10), 0);
		setTotal(newTotal);
		console.log(inputValue);
	}, [inputValue]);

	const handleSubmit = () => {
		const replyProductsDevis = [] as DevisReplyType[];

		productsDevis.forEach((product, index) => {
			replyProductsDevis.push({
				reference: product.reference,
				quantity: product.quantity,
				unitPrice: parseInt(inputValue[index], 10),
			});
		});

		localStorage.setItem('DevisReply', JSON.stringify(replyProductsDevis));
		localStorage.removeItem('Devis');
		toast.success('Réponse au Devis soumis avec succés!');
		window.location.replace('/');
	};

	const checkStockQuantity = (productReference: string) => () => {
		const getProduct = products.filter((product) => {
			return product.reference === productReference;
		});

		let productObject = getProduct[0];
		console.log(productObject.quantity);
		return productObject.quantity;
	};

	return (
		<div className="row">
			<h1 className="fw-bold" style={{ marginTop: '80px', fontSize: '28px' }}>
				List des produit demandé par : {demandeurDevis}
			</h1>

			{/* {devisProducts.length === 0 && <div className="d-flex justify-content-center ">Devis vide</div>} */}

			{devisProducts.length === 0 && (
				<div className="d-flex justify-content-center">
					<img src={emptycart} height="200px" alt="" />
				</div>
			)}

			{devisProducts.map((product, index) => (
				<div key={product.reference} className=" px-5 my-3">
					<div className="little-shadow px-5 py-3">
						<div className="d-flex justify-content-between p-3">
							<div className="d-flex justify-content-center col-3">
								<img src={product.img} height="200px" alt="" />
							</div>
							<div className="d-flex flex-column col-6 mx-2">
								<div className="d-flex justify-content-center">
									<span
										className="text-center"
										style={{ fontSize: '20px', fontWeight: 'bold' }}
									>
										{product.name} &nbsp;
									</span>
								</div>
								<div className="d-flex justify-content-center mb-3">
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
							<div className="d-flex flex-column col-3">
								<div className="d-flex justify-content-center align-items-center mb-5">
									<div style={{ fontSize: '30px', fontWeight: 'bold' }}>
										Qté demandé : {productsDevis[index]?.quantity}
									</div>
									&nbsp;
								</div>
								{/* <div className="d-flex justify-content-center align-items-center mb-5">
									<span style={{ fontSize: '30px', fontWeight: 'bold' }}>
										Qté en stock :{checkStockQuantity(product.reference)()}
									</span>
									<button
										className="btn btn-primary"
										onClick={checkStockQuantity(product.reference)}
									>
										Click on Qté en stock
									</button>
									&nbsp;
								</div> */}
								<div className="d-flex justify-content-center align-items-center ">
									<span style={{ fontSize: '20px', fontWeight: 'bold' }}>
										Prix unitaire :
									</span>
									<input
										className={
											'form-control ' + (inputValue[index] >= 1 ? '' : 'is-invalid')
										}
										style={{ width: '60px' }}
										value={inputValue[index]}
										//onChange={checkInputValue}
										onChange={checkInputValue(index)}
										//onChange={handleChangeQuantity(index)}
										type="number"
										min={1}
										//disabled={true}
									/>
									<div className="invalid-feedback text-left ml-5">{inputValue}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			))}

			{devisProducts.length !== 0 && (
				<>
					<div className="d-flex justify-content-center mt-3 px-5 py-3">
						<span style={{ fontSize: '20px', fontWeight: 'bold' }}>Total : {total}  MAD</span>
					</div>
					<div className="d-flex justify-content-center mt-3 px-5 py-3">
						<button className="btn btn-primary" onClick={handleSubmit}>
							Valider Devis
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default AgentDevis;
