import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from './reducers';

export const history = createHistory();

const middlewares = [logger, thunk, routerMiddleware(history)];

export const store = createStore(reducers, applyMiddleware(...middlewares));
