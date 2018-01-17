import ReactDom from 'react-dom';
import React from 'react';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import getRoutes from './config/routes';
import restricted from 'helpers/restricted';
import thunk from 'redux-thunk';
import * as reducers from 'redux/modules';


const store = createStore(combineReducers(reducers), compose(
    applyMiddleware(thunk),
	window.devToolsExtension ? window.devToolsExtension() : (f) => f
));

function checkAuth(component) {
	return restricted(component, store);
}

ReactDom.render(
	<Provider store={store}>
		{getRoutes(checkAuth)}
	</Provider>,
	document.getElementById('app')
);
