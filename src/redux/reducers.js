import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import auth from './ducks/auth'
import user from './ducks/user'
import business from './ducks/business'
import businessRegister from './ducks/businessRegister'

export default combineReducers({
  auth,
  user,
  business,
  businessRegister,
  router: routerReducer
})
