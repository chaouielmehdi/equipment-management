import 'bootstrap/dist/css/bootstrap.css';
import { FC } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Footer from './components/Footer';
import Header from './components/Header';
import { AfterLoginRoute } from './guards/AfterLoginRoute';
import { BeforeLoginRoute } from './guards/BeforeLoginRoute';
import Hero from './pages/Hero';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

export enum ROUTE {
	HERO = '/hero',
	HOME = '/home',
	SIGN_IN = '/sign-in',
	SIGN_UP = '/sign-up',
}

const App: FC = () => {
	const isConnected = localStorage.getItem('isConnected') ? true : false;

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
					<AfterLoginRoute path={ROUTE.HOME} children={<Home />} />

					<BeforeLoginRoute path={ROUTE.SIGN_IN} children={<SignIn />} />
					<BeforeLoginRoute path={ROUTE.SIGN_UP} children={<SignUp />} />

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
