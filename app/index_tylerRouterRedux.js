import ReactDom from 'react-dom';
import React from 'react';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import getRoutes from './config/routes';
import restricted from 'helpers/restricted';
import thunk from 'redux-thunk';
import * as reducers from 'redux/modules';
import {routerReducer, syncHistoryWithStore } from 'react-router-redux';
import { hashHistory } from 'react-router';

const store = createStore(combineReducers({...reducers, routing: routerReducer}), compose(
    applyMiddleware(thunk),
	window.devToolsExtension ? window.devToolsExtension() : (f) => f
));

const history = syncHistoryWithStore(hashHistory, store);

function checkAuth(component) {
	return restricted(component, store);
}

ReactDom.render(
	<Provider store={store}>
		{getRoutes(checkAuth, history)}
	</Provider>,
	document.getElementById('app')
);
