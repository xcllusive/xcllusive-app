import { toast } from 'react-toastify'

import {
  enquiryBusiness as enquiryBusinessAPI,
  sendCa as sendCaAPI,
  sendIm as sendImAPI,
  caReceived as caReceivedAPI,
  emailBuyer as emailBuyerAPI,
  requestOwnersApproval as requestOwnersApprovalAPI,
  sendEnquiryToOwner as sendEnquiryToOwnerAPI,
  sendEmailCtcBusiness as sendEmailCtcBusinessAPI,
  sendSms as sendSmsAPI
} from '../../services/api/clientManager'

export const Types = {
  ENQUIRY_BUSINESS_LOADING: 'ENQUIRY_BUSINESS_LOADING',
  ENQUIRY_BUSINESS_SUCCESS: 'ENQUIRY_BUSINESS_SUCCESS',
  ENQUIRY_BUSINESS_FAILURE: 'ENQUIRY_BUSINESS_FAILURE',
  SEND_CA_LOADING: 'SEND_CA_LOADING',
  SEND_CA_SUCCESS: 'SEND_CA_SUCCESS',
  SEND_CA_FAILURE: 'SEND_CA_FAILURE',
  SEND_IM_LOADING: 'SEND_IM_LOADING',
  SEND_IM_SUCCESS: 'SEND_IM_SUCCESS',
  SEND_IM_FAILURE: 'SEND_IM_FAILURE',
  CA_RECEIVED_LOADING: 'CA_RECEIVED_LOADING',
  CA_RECEIVED_SUCCESS: 'CA_RECEIVED_SUCCESS',
  CA_RECEIVED_FAILURE: 'CA_RECEIVED_FAILURE',
  EMAIL_BUYER_LOADING: 'EMAIL_BUYER_LOADING',
  EMAIL_BUYER_SUCCESS: 'EMAIL_BUYER_SUCCESS',
  EMAIL_BUYER_FAILURE: 'EMAIL_BUYER_FAILURE',
  REQUEST_OWNERS_APPROVAL_LOADING: 'REQUEST_OWNERS_APPROVAL_LOADING',
  REQUEST_OWNERS_APPROVAL_SUCCESS: 'REQUEST_OWNERS_APPROVAL_SUCCESS',
  REQUEST_OWNERS_APPROVAL_FAILURE: 'REQUEST_OWNERS_APPROVAL_FAILURE',
  SEND_ENQUIRY_ONWER_LOADING: 'SEND_ENQUIRY_ONWER_LOADING',
  SEND_ENQUIRY_ONWER_SUCCESS: 'SEND_ENQUIRY_ONWER_SUCCESS',
  SEND_ENQUIRY_ONWER_FAILURE: 'SEND_ENQUIRY_ONWER_FAILURE',
  SEND_EMAIL_CTC_BUSINESS_LOADING: 'SEND_EMAIL_CTC_BUSINESS_LOADING',
  SEND_EMAIL_CTC_BUSINESS_SUCCESS: 'SEND_EMAIL_CTC_BUSINESS_SUCCESS',
  SEND_EMAIL_CTC_BUSINESS_FAILURE: 'SEND_EMAIL_CTC_BUSINESS_FAILURE',
  SEND_SMS_LOADING: 'SEND_SMS_LOADING',
  SEND_SMS_SUCCESS: 'SEND_SMS_SUCCESS',
  SEND_SMS_FAILURE: 'SEND_SMS_FAILURE'
}

// Reducer

const initialState = {
  enquired: {
    isLoading: false,
    isEnquired: false,
    error: null
  },
  sentCa: {
    isLoading: false,
    isSent: false,
    error: null
  },
  sentIm: {
    isLoading: false,
    isSent: false,
    error: null
  },
  caReceived: {
    isLoading: false,
    isReceived: false,
    error: null
  },
  emailBuyer: {
    isLoading: false,
    isSent: false,
    error: null
  },
  requestOwnersApproval: {
    isLoading: false,
    isSent: false,
    error: null
  },
  sendEnquiryToOwner: {
    isLoading: false,
    isSent: false,
    error: null
  },
  sendEmailCtcBusiness: {
    isLoading: false,
    isSent: false,
    error: null
  },
  sendSms: {
    isLoading: false,
    isSent: false,
    error: null
  }
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case Types.ENQUIRY_BUSINESS_LOADING:
      return {
        ...state,
        enquired: {
          ...state.enquired,
          isLoading: action.payload,
          isEnquired: false,
          error: null
        }
      }
    case Types.ENQUIRY_BUSINESS_SUCCESS:
      return {
        ...state,
        enquired: {
          ...state.enquired,
          isLoading: false,
          isEnquired: true
        }
      }
    case Types.ENQUIRY_BUSINESS_FAILURE:
      return {
        ...state,
        enquired: {
          ...state.enquired,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.SEND_CA_LOADING:
      return {
        ...state,
        sentCa: {
          ...state.sentCa,
          isLoading: action.payload,
          isSent: false,
          error: null
        }
      }
    case Types.SEND_CA_SUCCESS:
      return {
        ...state,
        sentCa: {
          ...state.sentCa,
          isLoading: false,
          isSent: true
        }
      }
    case Types.SEND_CA_FAILURE:
      return {
        ...state,
        sentCa: {
          ...state.sentCa,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.SEND_IM_LOADING:
      return {
        ...state,
        sentIm: {
          ...state.sentIm,
          isLoading: action.payload,
          isSent: false,
          error: null
        }
      }
    case Types.SEND_IM_SUCCESS:
      return {
        ...state,
        sentIm: {
          ...state.sentIm,
          isLoading: false,
          isSent: true
        }
      }
    case Types.SEND_IM_FAILURE:
      return {
        ...state,
        sentIm: {
          ...state.sentIm,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.CA_RECEIVED_LOADING:
      return {
        ...state,
        caReceived: {
          ...state.caReceived,
          isLoading: action.payload,
          isReceived: false,
          error: null
        }
      }
    case Types.CA_RECEIVED_SUCCESS:
      return {
        ...state,
        caReceived: {
          ...state.caReceived,
          isLoading: false,
          isReceived: true
        }
      }
    case Types.CA_RECEIVED_FAILURE:
      return {
        ...state,
        caReceived: {
          ...state.caReceived,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.EMAIL_BUYER_LOADING:
      return {
        ...state,
        emailBuyer: {
          ...state.emailBuyer,
          isLoading: action.payload,
          isSent: false,
          error: null
        }
      }
    case Types.EMAIL_BUYER_SUCCESS:
      return {
        ...state,
        emailBuyer: {
          ...state.emailBuyer,
          isLoading: false,
          isSent: true
        }
      }
    case Types.EMAIL_BUYER_FAILURE:
      return {
        ...state,
        emailBuyer: {
          ...state.emailBuyer,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.REQUEST_OWNERS_APPROVAL_LOADING:
      return {
        ...state,
        requestOwnersApproval: {
          ...state.requestOwnersApproval,
          isLoading: action.payload,
          isSent: false,
          error: null
        }
      }
    case Types.REQUEST_OWNERS_APPROVAL_SUCCESS:
      return {
        ...state,
        requestOwnersApproval: {
          ...state.requestOwnersApproval,
          isLoading: false,
          isSent: true
        }
      }
    case Types.REQUEST_OWNERS_APPROVAL_FAILURE:
      return {
        ...state,
        requestOwnersApproval: {
          ...state.requestOwnersApproval,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.SEND_ENQUIRY_ONWER_LOADING:
      return {
        ...state,
        sendEnquiryToOwner: {
          ...state.sendEnquiryToOwner,
          isLoading: action.payload,
          isSent: false,
          error: null
        }
      }
    case Types.SEND_ENQUIRY_ONWER_SUCCESS:
      return {
        ...state,
        sendEnquiryToOwner: {
          ...state.sendEnquiryToOwner,
          isLoading: false,
          isSent: true
        }
      }
    case Types.SEND_ENQUIRY_ONWER_FAILURE:
      return {
        ...state,
        sendEnquiryToOwner: {
          ...state.sendEnquiryToOwner,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.SEND_EMAIL_CTC_BUSINESS_LOADING:
      return {
        ...state,
        sendEmailCtcBusiness: {
          ...state.sendEmailCtcBusiness,
          isLoading: action.payload,
          isSent: false,
          error: null
        }
      }
    case Types.SEND_EMAIL_CTC_BUSINESS_SUCCESS:
      return {
        ...state,
        sendEmailCtcBusiness: {
          ...state.sendEmailCtcBusiness,
          isLoading: false,
          isSent: true
        }
      }
    case Types.SEND_EMAIL_CTC_BUSINESS_FAILURE:
      return {
        ...state,
        sendEmailCtcBusiness: {
          ...state.sendEmailCtcBusiness,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.SEND_SMS_LOADING:
      return {
        ...state,
        sendSms: {
          ...state.sendSms,
          isLoading: action.payload,
          isSent: false,
          error: null
        }
      }
    case Types.SEND_SMS_SUCCESS:
      return {
        ...state,
        sendSms: {
          ...state.sendSms,
          isLoading: false,
          isSent: true
        }
      }
    case Types.SEND_SMS_FAILURE:
      return {
        ...state,
        sendSms: {
          ...state.sendSms,
          isLoading: false,
          error: action.payload
        }
      }
    default:
      return state
  }
}

export const enquiryBusiness = (buyerId, businessId) => async dispatch => {
  dispatch({
    type: Types.ENQUIRY_BUSINESS_LOADING,
    payload: true
  })
  try {
    const response = await enquiryBusinessAPI(buyerId, businessId)
    dispatch({
      type: Types.ENQUIRY_BUSINESS_SUCCESS
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.ENQUIRY_BUSINESS_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const sendCa = (buyerId, businessId) => async dispatch => {
  dispatch({
    type: Types.SEND_CA_LOADING,
    payload: true
  })
  try {
    const response = await sendCaAPI(buyerId, businessId)
    dispatch({
      type: Types.SEND_CA_SUCCESS
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.SEND_CA_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const sendIm = (buyerId, businessId) => async dispatch => {
  dispatch({
    type: Types.SEND_IM_LOADING,
    payload: true
  })
  try {
    const response = await sendImAPI(buyerId, businessId)
    dispatch({
      type: Types.SEND_IM_SUCCESS
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.SEND_IM_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const caReceived = (caFile, buyerId, businessId) => async dispatch => {
  dispatch({
    type: Types.CA_RECEIVED_LOADING,
    payload: true
  })
  try {
    const response = await caReceivedAPI(caFile, buyerId, businessId)
    dispatch({
      type: Types.CA_RECEIVED_SUCCESS
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.CA_RECEIVED_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const emailBuyer = (buyerId, businessId) => async dispatch => {
  dispatch({
    type: Types.EMAIL_BUYER_LOADING,
    payload: true
  })
  try {
    const response = await emailBuyerAPI(buyerId, businessId)
    dispatch({
      type: Types.EMAIL_BUYER_SUCCESS
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.EMAIL_BUYER_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const requestOwnersApproval = (buyerId, businessId) => async dispatch => {
  dispatch({
    type: Types.REQUEST_OWNERS_APPROVAL_LOADING,
    payload: true
  })
  try {
    const response = await requestOwnersApprovalAPI(buyerId, businessId)
    dispatch({
      type: Types.REQUEST_OWNERS_APPROVAL_SUCCESS
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.REQUEST_OWNERS_APPROVAL_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const sendEnquiryToOwner = (buyerId, businessId) => async dispatch => {
  dispatch({
    type: Types.SEND_ENQUIRY_ONWER_LOADING,
    payload: true
  })
  try {
    const response = await sendEnquiryToOwnerAPI(buyerId, businessId)
    dispatch({
      type: Types.SEND_ENQUIRY_ONWER_SUCCESS
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.SEND_ENQUIRY_ONWER_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const sendEmailCtcBusiness = (buyer, business) => async dispatch => {
  dispatch({
    type: Types.SEND_EMAIL_CTC_BUSINESS_LOADING,
    payload: true
  })
  try {
    const response = await sendEmailCtcBusinessAPI(buyer, business)
    dispatch({
      type: Types.SEND_EMAIL_CTC_BUSINESS_SUCCESS
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.SEND_EMAIL_CTC_BUSINESS_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const sendSms = (buyer, business, phone, message) => async dispatch => {
  dispatch({
    type: Types.SEND_SMS_LOADING,
    payload: true
  })
  try {
    const response = await sendSmsAPI(buyer, business, phone, message)
    dispatch({
      type: Types.SEND_SMS_SUCCESS
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.SEND_SMS_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}
