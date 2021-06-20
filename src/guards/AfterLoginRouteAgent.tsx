import { FC, ReactElement } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { ROUTE } from '../App';
import { IProps } from '../types/IProps';

interface IAfterLoginRouteProps {
	path: string;
}

export const AfterLoginRouteAgent: FC<IProps & IAfterLoginRouteProps> = ({
	path,
	children,
}): ReactElement => {
	const isConnected = localStorage.getItem('isConnected') ? true : false;
	const user = localStorage.getItem('UserType');

	if (!isConnected) {
		return <Redirect to={ROUTE.HERO} />;
	}
	if (user === 'Agent') {
		return <Route path={path} children={children} />;
	}
	return <Redirect to={ROUTE.HOME} />;
};
