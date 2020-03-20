/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

export default function configureStore() {
	const middlewares = [];

	if (process.env.NODE_ENV === 'development') {
		const { logger } = require(`redux-logger`);
		middlewares.push(logger);
	}

	const middlewareEnhacer = applyMiddleware(thunk, ...middlewares);
	const composeEnhancers = composeWithDevTools(middlewareEnhacer);

	const store = createStore(rootReducer, {}, composeEnhancers);

	if (module.hot) {
		module.hot.accept('./reducers/', () => {
			const nextReducer = require('./reducers/index').default;
			store.replaceReducer(nextReducer);
		});
	}

	return store;
}
