import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import modal from './ducks/modal'
import auth from './ducks/auth'
import user from './ducks/user'
import business from './ducks/business'
import businessRegister from './ducks/businessRegister'
import buyer from './ducks/buyer'

export default combineReducers({
  modal,
  auth,
  user,
  business,
  businessRegister,
  buyer,
  router: routerReducer
})
