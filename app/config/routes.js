/**
 * Created by Dvir on 1/4/2018.
 */
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { MainContainer, HomeContainer,
		 AuthenticateContainer, FeedContainer,
		 LogoutContainer, UserContainer } from 'containers';

export default function getRoutes(checkAuth) {
	return (
		<BrowserRouter>
			<MainContainer>
				<Switch>
					<Route exact={true} path='/' component={checkAuth(HomeContainer)} />
					<Route path='/login' component={checkAuth(AuthenticateContainer)} />
					<Route path='/feed' component={checkAuth(FeedContainer)} />
					<Route path='/logout' component={LogoutContainer} />
					<Route path='/:uid' component={checkAuth(UserContainer)} />
				</Switch>
			</MainContainer>
		</BrowserRouter>
    );
}


