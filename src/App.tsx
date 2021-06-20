import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import { FC, useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AfterLoginRouteAgent } from './guards/AfterLoginRouteAgent';
import { AfterLoginRouteClient } from './guards/AfterLoginRouteClient';
import { BeforeLoginRoute } from './guards/BeforeLoginRoute';
import { products } from './data/products';
import Footer from './components/Footer';
import Header from './components/Header';
import Cart from './pages/Cart';
import Catalogue from './pages/Catalogue';
import Hero from './pages/Hero';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AgentHome from './pages/AgentHome';
import AgentDevis from './pages/AgentDevis';
import AgentStock from './pages/AgentStock';

export enum ROUTE {
	HERO = '/hero',
	HOME = '/home',
	SIGN_IN = '/sign-in',
	SIGN_UP = '/sign-up',
	CATALOGUE = '/catalogue',
	CART = '/cart',
	AGENT_HOME = '/agent-home',
	AGENT_DEVIS = '/agent-devis',
	AGENT_STOCK = '/agent-stock',
}

interface Products {
	name: string;
	reference: string;
	quantity: number;
	description: string;
	img: string;
}

const App: FC = () => {
	//console.log(products);
	const isConnected = localStorage.getItem('isConnected') ? true : false;

	function getStoredProducts() {
		const products = localStorage.getItem('Products');
		if (products) {
			return JSON.parse(products);
		}
		return null;
	}

	const importProducts = () => {
		const storedProducts = getStoredProducts();
		if (!storedProducts) {
			//let productsList = (JSON.parse(localStorage.getItem('Products') || '[]') || []) as Products[];
			let productsList: Products[] = [];

			products.forEach((element) => {
				productsList.push(element);
			});
			localStorage.setItem('Products', JSON.stringify(productsList));
		}
	};
	useEffect(() => {
		importProducts();
	}, []);

	return (
		<Router>
			<Header />
			<div className="container-fluid main py-5">
				<Switch>
					<Route exact path="/">
						{!isConnected && <Redirect to={ROUTE.HERO} />}
						{isConnected && <Redirect to={ROUTE.HOME} />}
					</Route>
					<BeforeLoginRoute path={ROUTE.HERO} children={<Hero />} />
					<AfterLoginRouteClient path={ROUTE.HOME} children={<Home />} />
					<BeforeLoginRoute path={ROUTE.SIGN_IN} children={<SignIn />} />
					<BeforeLoginRoute path={ROUTE.SIGN_UP} children={<SignUp />} />
					<AfterLoginRouteClient path={ROUTE.CATALOGUE} children={<Catalogue />} />
					<AfterLoginRouteClient path={ROUTE.CART} children={<Cart />} />
					<AfterLoginRouteAgent path={ROUTE.AGENT_HOME} children={<AgentHome />} />
					<AfterLoginRouteAgent path={ROUTE.AGENT_DEVIS} children={<AgentDevis />} />
					<AfterLoginRouteAgent path={ROUTE.AGENT_STOCK} children={<AgentStock />} />
					<Route path="*">
						{!isConnected && <Redirect to={ROUTE.HERO} />}
						{isConnected && <Redirect to={ROUTE.HOME} />}
					</Route>
				</Switch>
				<ToastContainer />
				<Footer />
			</div>
		</Router>
	);
};

export default App;
