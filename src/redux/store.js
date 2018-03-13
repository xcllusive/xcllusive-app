import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducers from './reducers'

export const history = createHistory()

const logger = createLogger({
  collapsed: true
})

const middlewares = [ thunk, logger, routerMiddleware(history) ]

export const store = createStore(reducers, applyMiddleware(...middlewares))
