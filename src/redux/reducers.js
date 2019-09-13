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
import score from './ducks/score'
import agreementTemplates from './ducks/agreementTemplates'
import agreement from './ducks/agreement'
import invoiceTemplates from './ducks/invoiceTemplates'
import invoice from './ducks/invoice'
import appraisalRegister from './ducks/appraisalRegister'
import appraisal from './ducks/appraisal'
import businessSold from './ducks/businessSold'
import broker from './ducks/broker'
import reports from './ducks/reports'
import officeRegister from './ducks/officeRegister'
import reportsCtc from './ducks/CTC/reports'
import ctcBusiness from './ducks/CTC/business'
import resource from './ducks/resource'
import contact from './ducks/contact'
import documentFolder from './ducks/documentFolder'
import groupEmail from './ducks/groupEmail'
import issue from './ducks/issue'

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
  score,
  agreementTemplates,
  agreement,
  invoiceTemplates,
  invoice,
  appraisalRegister,
  appraisal,
  businessSold,
  broker,
  reports,
  officeRegister,
  reportsCtc,
  ctcBusiness,
  resource,
  contact,
  documentFolder,
  groupEmail,
  issue,
  router: routerReducer
})
