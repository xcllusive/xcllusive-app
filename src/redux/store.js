import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import logger from 'redux-logger';
import reducers from './reducers';

export const history = createHistory();

const middlewares = [logger, routerMiddleware(history)];

export const store = createStore(reducers, applyMiddleware(...middlewares));
