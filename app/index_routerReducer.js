import ReactDom from 'react-dom';
import React from 'react';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import getRoutes from './config/routes';
import restricted from 'helpers/restricted';
import thunk from 'redux-thunk';
import * as reducers from 'redux/modules';
import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';

const history = createHistory();
const routerReduxMiddleware = routerMiddleware(history);

const store = createStore(combineReducers({
        ...reducers,
        router: routerReducer,
    }), compose(
    applyMiddleware(thunk, routerMiddleware),
	window.devToolsExtension ? window.devToolsExtension() : (f) => f
));

function checkAuth(component) {
	return restricted(component, store);
}

ReactDom.render(
	<Provider store={store}>
		{getRoutes(checkAuth, history)}
	</Provider>,
	document.getElementById('app')
);
