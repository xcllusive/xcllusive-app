import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import auth from './ducks/auth'
import user from './ducks/user'
import business from './ducks/business'

export default combineReducers({
  auth,
  user,
  business,
  router: routerReducer
})
