import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import auth from './ducks/auth'
import user from './ducks/user'

export default combineReducers({
  auth,
  user,
  router: routerReducer
})
