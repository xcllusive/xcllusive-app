import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import modal from './ducks/modal'
import auth from './ducks/auth'
import user from './ducks/user'
import business from './ducks/business'
import businessLog from './ducks/businessLog'
import businessRegister from './ducks/businessRegister'
import buyerRegister from './ducks/buyerRegister'
import scoreRegister from './ducks/scoreRegister'
import buyer from './ducks/buyer'
import clientManager from './ducks/clientManager'
import buyerLog from './ducks/buyerLog'
import emailTemplates from './ducks/emailTemplates'
import systemSettings from './ducks/systemSettings'

export default combineReducers({
  modal,
  auth,
  user,
  business,
  businessLog,
  businessRegister,
  buyerRegister,
  scoreRegister,
  buyer,
  clientManager,
  buyerLog,
  emailTemplates,
  systemSettings,
  router: routerReducer
})
