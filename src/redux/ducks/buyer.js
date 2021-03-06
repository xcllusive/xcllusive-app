import { toast } from 'react-toastify'

import {
  create,
  update,
  getAll,
  get,
  getBusinessesFromBuyer as getBusinessesFromBuyerAPI,
  sendEmailBuyerBrokersEmail as sendEmailBuyerBrokersEmailAPI,
  sendGroupEmail as sendGroupEmailAPI,
  getBuyerBusinesses as getBuyerBusinessesAPI,
  getBuyersFromBusiness as getBuyersFromBusinessAPI,
  getBusinessFromBuyer as getBusinessFromBuyerAPI,
  getBuyersGroupEmail as getBuyersGroupEmailAPI,
  verifyDuplicatedBuyer as verifyDuplicatedBuyerAPI,
  updateBusinessFromBuyer as updateBusinessFromBuyerAPI,
  getBusinessLogFromBuyer as getBusinessLogFromBuyerAPI,
  updateBusinessLogFromBuyer as updateBusinessLogFromBuyerAPI,
  finaliseBusinessLogFromBuyer as finaliseBusinessLogFromBuyerAPI,
  checkCaReminder as checkCaReminderAPI
} from '../../services/api/buyer'

// Action Types

export const Types = {
  CREATE_BUYER_LOADING: 'CREATE_BUYER_LOADING',
  CREATE_BUYER_SUCCESS: 'CREATE_BUYER_SUCCESS',
  CREATE_BUYER_FAILURE: 'CREATE_BUYER_FAILURE',
  GET_BUYERS_LOADING: 'GET_BUYERS_LOADING',
  GET_BUYERS_SUCCESS: 'GET_BUYERS_SUCCESS',
  GET_BUYERS_FAILURE: 'GET_BUYERS_FAILURE',
  UPDATE_BUYER_LOADING: 'UPDATE_BUYER_LOADING',
  UPDATE_BUYER_SUCCESS: 'UPDATE_BUYER_SUCCESS',
  UPDATE_BUYER_FAILURE: 'UPDATE_BUYER_FAILURE',
  GET_BUYER_LOADING: 'GET_BUYER_LOADING',
  GET_BUYER_SUCCESS: 'GET_BUYER_SUCCESS',
  GET_BUYER_FAILURE: 'GET_BUYER_FAILURE',
  GET_BUSINESSES_FROM_BUYER_LOADING: 'GET_BUSINESSES_FROM_BUYER_LOADING',
  GET_BUSINESSES_FROM_BUYER_SUCCESS: 'GET_BUSINESSES_FROM_BUYER_SUCCESS',
  GET_BUSINESSES_FROM_BUYER_FAILURE: 'GET_BUSINESSES_FROM_BUYER_FAILURE',
  SEND_EMAIL_BUYER_BROKERS_EMAIL_LOADING: 'SEND_EMAIL_BUYER_BROKERS_EMAIL_LOADING',
  SEND_EMAIL_BUYER_BROKERS_EMAIL_SUCCESS: 'SEND_EMAIL_BUYER_BROKERS_EMAIL_SUCCESS',
  SEND_EMAIL_BUYER_BROKERS_EMAIL_FAILURE: 'SEND_EMAIL_BUYER_BROKERS_EMAIL_FAILURE',
  SEND_GROUP_EMAIL_LOADING: 'SEND_GROUP_EMAIL_LOADING',
  SEND_GROUP_EMAIL_SUCCESS: 'SEND_GROUP_EMAIL_SUCCESS',
  SEND_GROUP_EMAIL_FAILURE: 'SEND_GROUP_EMAIL_FAILURE',
  GET_BUYER_BUSINESSES_LOADING: 'GET_BUYER_BUSINESSES_LOADING',
  GET_BUYER_BUSINESSES_FOR_SALE_SUCCESS: 'GET_BUYER_BUSINESSES_FOR_SALE_SUCCESS',
  GET_BUYER_BUSINESSES_UNDER_OFFER_SUCCESS: 'GET_BUYER_BUSINESSES_UNDER_OFFER_SUCCESS',
  GET_BUYER_BUSINESSES_FAILURE: 'GET_BUYER_BUSINESSES_FAILURE',
  GET_BUYER_BUSINESSES_SALES_MEMO_SUCCESS: 'GET_BUYER_BUSINESSES_SALES_MEMO_SUCCESS',
  GET_BUYERS_FROM_BUSINESS_LOADING: 'GET_BUYERS_FROM_BUSINESS_LOADING',
  GET_BUYERS_FROM_BUSINESS_SUCCESS: 'GET_BUYERS_FROM_BUSINESS_SUCCESS',
  GET_BUYERS_FROM_BUSINESS_FAILURE: 'GET_BUYERS_FROM_BUSINESS_FAILURE',
  GET_BUSINESS_FROM_BUYER_LOADING: 'GET_BUSINESS_FROM_BUYER_LOADING',
  GET_BUSINESS_FROM_BUYER_SUCCESS: 'GET_BUSINESS_FROM_BUYER_SUCCESS',
  GET_BUSINESS_FROM_BUYER_FAILURE: 'GET_BUSINESS_FROM_BUYER_FAILURE',
  UPDATE_BUSINESS_FROM_BUYER_LOADING: 'UPDATE_BUSINESS_FROM_BUYER_LOADING',
  UPDATE_BUSINESS_FROM_BUYER_SUCCESS: 'UPDATE_BUSINESS_FROM_BUYER_SUCCESS',
  UPDATE_BUSINESS_FROM_BUYER_FAILURE: 'UPDATE_BUSINESS_FROM_BUYER_FAILURE',
  GET_BUSINESS_LOG_FROM_BUYER_LOADING: 'GET_BUSINESS_LOG_FROM_BUYER_LOADING',
  GET_BUSINESS_LOG_FROM_BUYER_SUCCESS: 'GET_BUSINESS_LOG_FROM_BUYER_SUCCESS',
  GET_BUSINESS_LOG_FROM_BUYER_FAILURE: 'GET_BUSINESS_LOG_FROM_BUYER_FAILURE',
  UPDATE_BUSINESS_LOG_FROM_BUYER_LOADING: 'UPDATE_BUSINESS_LOG_FROM_BUYER_LOADING',
  UPDATE_BUSINESS_LOG_FROM_BUYER_SUCCESS: 'UPDATE_BUSINESS_LOG_FROM_BUYER_SUCCESS',
  UPDATE_BUSINESS_LOG_FROM_BUYER_FAILURE: 'UPDATE_BUSINESS_LOG_FROM_BUYER_FAILURE',
  FINALISE_BUSINESS_LOG_FROM_BUYER_LOADING: 'FINALISE_BUSINESS_LOG_FROM_BUYER_LOADING',
  FINALISE_BUSINESS_LOG_FROM_BUYER_SUCCESS: 'FINALISE_BUSINESS_LOG_FROM_BUYER_SUCCESS',
  FINALISE_BUSINESS_LOG_FROM_BUYER_FAILURE: 'FINALISE_BUSINESS_LOG_FROM_BUYER_FAILURE',
  GET_BUYERS_GROUP_EMAIL_LOADING: 'GET_BUYERS_GROUP_EMAIL_LOADING',
  GET_BUYERS_GROUP_EMAIL_SUCCESS: 'GET_BUYERS_GROUP_EMAIL_SUCCESS',
  GET_BUYERS_GROUP_EMAIL_FAILURE: 'GET_BUYERS_GROUP_EMAIL_FAILURE',
  VERIFY_DUPLICATED_BUYER_LOADING: 'VERIFY_DUPLICATED_BUYER_LOADING',
  VERIFY_DUPLICATED_BUYER_SUCCESS: 'VERIFY_DUPLICATED_BUYER_SUCCESS',
  VERIFY_DUPLICATED_BUYER_FAILURE: 'VERIFY_DUPLICATED_BUYER_FAILURE',
  CLEAR_BUYER: 'CLEAR_BUYER',
  SET_BUSINESS_LAST_TAB_FROM_BUYER_SELECTED: 'SET_BUSINESS_LAST_TAB_FROM_BUYER_SELECTED',
  CHECK_CA_REMINDER_LOADING: 'CHECK_CA_REMINDER_LOADING',
  CHECK_CA_REMINDER_SUCCESS: 'CHECK_CA_REMINDER_SUCCESS',
  CHECK_CA_REMINDER_FAILURE: 'CHECK_CA_REMINDER_FAILURE'
}

// Reducer

const initialState = {
  create: {
    isLoading: false,
    isCreated: false,
    error: null,
    newBuyer: null
  },
  update: {
    isLoading: false,
    isUpdated: false,
    error: null,
    buyer: {}
  },
  getAll: {
    array: [],
    isLoading: false,
    error: null
  },
  get: {
    isLoading: true,
    object: null,
    error: null
  },
  getBusinessesFromBuyer: {
    isLoading: true,
    array: [],
    error: null
  },
  sendEmailBuyerBrokersEmail: {
    isLoading: false,
    isSent: false,
    error: null
  },
  sendGroupEmail: {
    isLoading: false,
    isSent: false,
    error: null
  },
  getBuyerBusinessesForSale: {
    isLoading: true,
    array: [],
    error: null
  },
  getBuyerBusinessesUnderOffer: {
    isLoading: true,
    array: [],
    error: null
  },
  getBuyerBusinessesSalesMemo: {
    isLoading: true,
    array: [],
    error: null
  },
  getBuyersFromBusiness: {
    isLoading: true,
    array: [],
    countAll: 0,
    isGotBuyers: false,
    error: null
  },
  getBusinessFromBuyer: {
    isLoading: true,
    object: null,
    totalEnquiry: 0,
    totalLastScore: null,
    stageOptions: [],
    sourceOptions: [],
    ratingOptions: [],
    productOptions: [],
    industryOptions: [],
    typeOptions: [],
    stageNotSignedOptions: [],
    stageNotWantOptions: [],
    error: null,
    countAllEnquiry: 0
  },
  getBuyersGroupEmail: {
    isLoading: true,
    array: [],
    error: null
  },
  verifyDuplicatedBuyer: {
    isLoading: true,
    disable: false,
    object: null,
    error: null
  },
  updateBusinessFromBuyer: {
    isLoading: false,
    isUpdated: false,
    error: null
  },
  getBusinessLogFromBuyer: {
    array: [],
    isLoading: false,
    error: null
  },
  updateBusinessLogFromBuyer: {
    isLoading: false,
    isUpdated: false,
    error: null
  },
  finaliseBusinessLogFromBuyer: {
    isLoading: false,
    isUpdated: false,
    error: null
  },
  setLastTabSelected: {
    index: 0
  },
  checkCaReminder: {
    isLoading: false,
    isChecked: false,
    error: null
  }
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case Types.CREATE_BUYER_LOADING:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.CREATE_BUYER_SUCCESS:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: false,
          isCreated: true,
          error: null,
          newBuyer: action.payload
        }
      }
    case Types.CREATE_BUYER_FAILURE:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: false,
          isCreated: false,
          error: action.payload
        }
      }
    case Types.UPDATE_BUYER_LOADING:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: action.payload,
          isUpdated: false,
          error: null
        }
      }
    case Types.UPDATE_BUYER_SUCCESS:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: false,
          isUpdated: true,
          error: null,
          buyer: action.payload
        }
      }
    case Types.UPDATE_BUYER_FAILURE:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: false,
          isUpdated: false,
          error: action.payload
        }
      }
    case Types.GET_BUYERS_LOADING:
      return {
        ...state,
        getAll: {
          ...state.getAll,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.GET_BUYERS_SUCCESS:
      return {
        ...state,
        getAll: {
          ...state.getAll,
          isLoading: false,
          array: action.payload,
          error: null
        }
      }
    case Types.GET_BUYERS_FAILURE:
      return {
        ...state,
        getAll: {
          ...state.getAll,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.GET_BUYER_LOADING:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.GET_BUYER_SUCCESS:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: false,
          object: action.payload,
          error: null
        }
      }
    case Types.GET_BUYER_FAILURE:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.GET_BUSINESSES_FROM_BUYER_LOADING:
      return {
        ...state,
        getBusinessesFromBuyer: {
          ...state.getBusinessesFromBuyer,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.GET_BUSINESSES_FROM_BUYER_SUCCESS:
      return {
        ...state,
        getBusinessesFromBuyer: {
          ...state.getBusinessesFromBuyer,
          isLoading: false,
          array: action.payload,
          error: null
        }
      }
    case Types.GET_BUSINESSES_FROM_BUYER_FAILURE:
      return {
        ...state,
        getBusinessesFromBuyer: {
          ...state.getBusinessesFromBuyer,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.UPDATE_BUSINESS_FROM_BUYER_LOADING:
      return {
        ...state,
        updateBusinessFromBuyer: {
          ...state.update,
          isLoading: action.payload,
          error: null,
          isUpdated: false
        }
      }
    case Types.UPDATE_BUSINESS_FROM_BUYER_SUCCESS:
      return {
        ...state,
        updateBusinessFromBuyer: {
          ...state.update,
          isLoading: false,
          isUpdated: true,
          error: null
        },
        get: {
          ...state.get,
          isLoading: false,
          object: action.payload.business,
          totalEnquiry: action.payload.countAllEnquiry,
          totalLastScore: action.payload.lastScore ? action.payload.lastScore.total : null,
          stageOptions: action.payload.stageList,
          sourceOptions: action.payload.sourceList,
          ratingOptions: action.payload.ratingList,
          productOptions: action.payload.productList,
          industryOptions: action.payload.industryList,
          typeOptions: action.payload.typeList,
          usersBroker: action.payload.usersBroker,
          stageNotSignedOptions: action.payload.stageNotSignedList,
          stageNotWantOptions: action.payload.stageNotWantList,
          error: null
        }
      }
    case Types.UPDATE_BUSINESS_FROM_BUYER_FAILURE:
      return {
        ...state,
        updateBusinessFromBuyer: {
          ...state.updateBusinessFromBuyer,
          isLoading: false,
          isUpdated: false,
          error: action.payload
        }
      }
    case Types.GET_BUSINESS_LOG_FROM_BUYER_LOADING:
      return {
        ...state,
        getBusinessLogFromBuyer: {
          ...state.getBusinessLogFromBuyer,
          isLoading: true
        }
      }
    case Types.GET_BUSINESS_LOG_FROM_BUYER_SUCCESS:
      return {
        ...state,
        getBusinessLogFromBuyer: {
          ...state.getBusinessLogFromBuyer,
          isLoading: false,
          array: action.payload
        }
      }
    case Types.GET_BUSINESS_LOG_FROM_BUYER_FAILURE:
      return {
        ...state,
        getBusinessLogFromBuyer: {
          ...state.getBusinessLogFromBuyer,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.SEND_EMAIL_BUYER_BROKERS_EMAIL_LOADING:
      return {
        ...state,
        sendEmailBuyerBrokersEmail: {
          ...state.sendEmailBuyerBrokersEmail,
          isLoading: action.payload,
          isSent: false,
          error: null
        }
      }
    case Types.SEND_EMAIL_BUYER_BROKERS_EMAIL_SUCCESS:
      return {
        ...state,
        sendEmailBuyerBrokersEmail: {
          ...state.sendEmailBuyerBrokersEmail,
          isLoading: false,
          isSent: true
        }
      }
    case Types.SEND_EMAIL_BUYER_BROKERS_EMAIL_FAILURE:
      return {
        ...state,
        sendEmailBuyerBrokersEmail: {
          ...state.sendEmailBuyerBrokersEmail,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.SEND_GROUP_EMAIL_LOADING:
      return {
        ...state,
        sendGroupEmail: {
          ...state.sendGroupEmail,
          isLoading: action.payload,
          isSent: false,
          error: null
        }
      }
    case Types.SEND_GROUP_EMAIL_SUCCESS:
      return {
        ...state,
        sendGroupEmail: {
          ...state.sendGroupEmail,
          isLoading: false,
          isSent: true
        }
      }
    case Types.SEND_GROUP_EMAIL_FAILURE:
      return {
        ...state,
        sendGroupEmail: {
          ...state.sendGroupEmail,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.GET_BUYER_BUSINESSES_LOADING:
      return {
        ...state,
        getBuyerBusinesses: {
          ...state.getBuyerBusinesses,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.GET_BUYER_BUSINESSES_FOR_SALE_SUCCESS:
      return {
        ...state,
        getBuyerBusinessesForSale: {
          ...state.getBuyerBusinessesForSale,
          isLoading: false,
          array: action.payload,
          error: null
        }
      }
    case Types.GET_BUYER_BUSINESSES_UNDER_OFFER_SUCCESS:
      return {
        ...state,
        getBuyerBusinessesUnderOffer: {
          ...state.getBuyerBusinessesUnderOffer,
          isLoading: false,
          array: action.payload,
          error: null
        }
      }
    case Types.GET_BUYER_BUSINESSES_FAILURE:
      return {
        ...state,
        getBuyerBusinesses: {
          ...state.getBuyerBusinesses,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.GET_BUYER_BUSINESSES_SALES_MEMO_SUCCESS:
      return {
        ...state,
        getBuyerBusinessesSalesMemo: {
          ...state.getBuyerBusinessesSalesMemo,
          isLoading: false,
          array: action.payload,
          error: null
        }
      }
    case Types.GET_BUYERS_FROM_BUSINESS_LOADING:
      return {
        ...state,
        getBuyersFromBusiness: {
          ...state.getBuyersFromBusiness,
          isLoading: action.payload,
          isGotBuyers: false,
          error: null
        }
      }
    case Types.GET_BUYERS_FROM_BUSINESS_SUCCESS:
      return {
        ...state,
        getBuyersFromBusiness: {
          ...state.getBuyersFromBusiness,
          isLoading: false,
          array: action.payload.array,
          countAll: action.payload.countAll,
          isGotBuyers: true,
          error: null
        }
      }
    case Types.GET_BUYERS_FROM_BUSINESS_FAILURE:
      return {
        ...state,
        getBuyersFromBusiness: {
          ...state.getBuyersFromBusiness,
          isLoading: false,
          isGotBuyers: false,
          error: action.payload
        }
      }
    case Types.GET_BUSINESS_FROM_BUYER_LOADING:
      return {
        ...state,
        getBusinessFromBuyer: {
          ...state.getBusinessFromBuyer,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.GET_BUSINESS_FROM_BUYER_SUCCESS:
      return {
        ...state,
        getBusinessFromBuyer: {
          ...state.getBusinessFromBuyer,
          isLoading: false,
          object: action.payload.business,
          totalEnquiry: action.payload.countAllEnquiry,
          totalLastScore: action.payload.lastScore ? action.payload.lastScore.total : null,
          stageOptions: action.payload.stageList,
          sourceOptions: action.payload.sourceList,
          ratingOptions: action.payload.ratingList,
          productOptions: action.payload.productList,
          industryOptions: action.payload.industryList,
          typeOptions: action.payload.typeList,
          usersBroker: action.payload.usersBroker,
          stageNotSignedOptions: action.payload.stageNotSignedList,
          stageNotWantOptions: action.payload.stageNotWantList,
          countAllEnquiry: action.payload.countAllEnquiry,
          error: null
        }
      }
    case Types.GET_BUSINESS_FROM_BUYER_FAILURE:
      return {
        ...state,
        getBusinessFromBuyer: {
          ...state.getBusinessFromBuyer,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.GET_BUYERS_GROUP_EMAIL_LOADING:
      return {
        ...state,
        getBuyersGroupEmail: {
          ...state.getBuyersGroupEmail,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.GET_BUYERS_GROUP_EMAIL_SUCCESS:
      return {
        ...state,
        getBuyersGroupEmail: {
          ...state.getBuyersGroupEmail,
          isLoading: false,
          array: action.payload,
          error: null
        }
      }
    case Types.GET_BUYERS_GROUP_EMAIL_FAILURE:
      return {
        ...state,
        getBuyersGroupEmail: {
          ...state.getBuyersGroupEmail,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.VERIFY_DUPLICATED_BUYER_LOADING:
      return {
        ...state,
        verifyDuplicatedBuyer: {
          ...state.verifyDuplicatedBuyer,
          isLoading: action.payload,
          disable: false,
          error: null
        }
      }
    case Types.VERIFY_DUPLICATED_BUYER_SUCCESS:
      return {
        ...state,
        verifyDuplicatedBuyer: {
          ...state.verifyDuplicatedBuyer,
          isLoading: false,
          disable: true,
          object: action.payload,
          error: null
        }
      }
    case Types.VERIFY_DUPLICATED_BUYER_FAILURE:
      return {
        ...state,
        verifyDuplicatedBuyer: {
          ...state.verifyDuplicatedBuyer,
          isLoading: false,
          disable: false,
          error: action.payload
        }
      }
    case Types.UPDATE_BUSINESS_LOG_FROM_BUYER_LOADING:
      return {
        ...state,
        updateBusinessLogFromBuyer: {
          ...state.updateBusinessLogFromBuyer,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.UPDATE_BUSINESS_LOG_FROM_BUYER_SUCCESS:
      return {
        ...state,
        updateBusinessLogFromBuyer: {
          ...state.updateBusinessLogFromBuyer,
          isLoading: false,
          isUpdated: action.payload,
          error: null
        }
      }
    case Types.UPDATE_BUSINESS_LOG_FROM_BUYER_FAILURE:
      return {
        ...state,
        updateBusinessLogFromBuyer: {
          ...state.updateBusinessLogFromBuyer,
          isLoading: false,
          isUpdated: false,
          error: action.payload
        }
      }
    case Types.FINALISE_BUSINESS_LOG_FROM_BUYER_LOADING:
      return {
        ...state,
        finaliseBusinessLogFromBuyer: {
          ...state.finaliseBusinessLogFromBuyer,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.FINALISE_BUSINESS_LOG_FROM_BUYER_SUCCESS:
      return {
        ...state,
        finaliseBusinessLogFromBuyer: {
          ...state.finaliseBusinessLogFromBuyer,
          isLoading: false,
          isUpdated: action.payload,
          error: null
        }
      }
    case Types.FINALISE_BUSINESS_LOG_FROM_BUYER_FAILURE:
      return {
        ...state,
        finaliseBusinessLogFromBuyer: {
          ...state.finaliseBusinessLogFromBuyer,
          isLoading: false,
          isUpdated: false,
          error: action.payload
        }
      }
    case Types.SET_BUSINESS_LAST_TAB_FROM_BUYER_SELECTED:
      return {
        ...state,
        setLastTabSelected: {
          ...state.setLastTabSelected,
          index: action.payload
        }
      }
    case Types.CHECK_CA_REMINDER_LOADING:
      return {
        ...state,
        checkCaReminder: {
          ...state.checkCaReminder,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.CHECK_CA_REMINDER_SUCCESS:
      return {
        ...state,
        checkCaReminder: {
          ...state.checkCaReminder,
          isLoading: false,
          isChecked: action.payload,
          error: null
        }
      }
    case Types.CHECK_CA_REMINDER_FAILURE:
      return {
        ...state,
        checkCaReminder: {
          ...state.checkCaReminder,
          isLoading: false,
          isChecked: false,
          error: action.payload
        }
      }
    case Types.CLEAR_BUYER:
      return initialState
    default:
      return state
  }
}

// Action Creators
export const buyerLoading = (value, type) => ({
  type: Types[type],
  payload: value
})

export const createBuyer = buyer => async dispatch => {
  dispatch({
    type: Types.CREATE_BUYER_LOADING,
    payload: true
  })
  try {
    const buyers = await create(buyer)
    dispatch({
      type: Types.CREATE_BUYER_SUCCESS,
      payload: buyers.data
    })
  } catch (error) {
    dispatch({
      type: Types.CREATE_BUYER_FAILURE,
      payload: error
    })
  }
}

export const updateBuyer = buyer => async dispatch => {
  dispatch({
    type: Types.UPDATE_BUYER_LOADING,
    payload: true
  })
  try {
    await update(buyer)
    dispatch({
      type: Types.UPDATE_BUYER_SUCCESS,
      payload: buyer
    })
  } catch (error) {
    dispatch({
      type: Types.UPDATE_BUYER_FAILURE,
      payload: error
    })
  }
}

export const checkCaReminder = () => async dispatch => {
  dispatch({
    type: Types.CHECK_CA_REMINDER_LOADING,
    payload: true
  })
  try {
    await checkCaReminderAPI()
    dispatch({
      type: Types.CHECK_CA_REMINDER_SUCCESS
      // payload: buyer
    })
  } catch (error) {
    dispatch({
      type: Types.CHECK_CA_REMINDER_FAILURE,
      payload: error
    })
  }
}

export const getBuyers = (search = false) => async dispatch => {
  dispatch({
    type: Types.GET_BUYERS_LOADING,
    payload: true
  })
  try {
    const buyers = await getAll(search)
    dispatch({
      type: Types.GET_BUYERS_SUCCESS,
      payload: buyers.data
    })
  } catch (error) {
    dispatch({
      type: Types.GET_BUYERS_FAILURE,
      payload: error
    })
  }
}

export const getBuyer = id => async dispatch => {
  dispatch({
    type: Types.GET_BUYER_LOADING,
    payload: true
  })
  try {
    const buyer = await get(id)
    dispatch({
      type: Types.GET_BUYER_SUCCESS,
      payload: buyer.data
    })
  } catch (error) {
    dispatch({
      type: Types.GET_BUYER_FAILURE,
      payload: error
    })
  }
}

export const getBusinessesFromBuyer = (search = false) => async dispatch => {
  dispatch({
    type: Types.GET_BUSINESSES_FROM_BUYER_LOADING,
    payload: true
  })
  try {
    const businesses = await getBusinessesFromBuyerAPI(search)
    dispatch({
      type: Types.GET_BUSINESSES_FROM_BUYER_SUCCESS,
      payload: businesses.data
    })
  } catch (error) {
    dispatch({
      type: Types.GET_BUSINESSES_FROM_BUYER_FAILURE,
      payload: error
    })
  }
}

export const sendEmailBuyerBrokersEmail = sendEmail => async dispatch => {
  dispatch({
    type: Types.SEND_EMAIL_BUYER_BROKERS_EMAIL_LOADING,
    payload: true
  })
  try {
    const response = await sendEmailBuyerBrokersEmailAPI(sendEmail)
    dispatch({
      type: Types.SEND_EMAIL_BUYER_BROKERS_EMAIL_SUCCESS
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.SEND_EMAIL_BUYER_BROKERS_EMAIL_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const sendGroupEmail = (sendGroupEmail, array, businessId) => async dispatch => {
  dispatch({
    type: Types.SEND_GROUP_EMAIL_LOADING,
    payload: true
  })
  try {
    const response = await sendGroupEmailAPI(sendGroupEmail, array, businessId)
    dispatch({
      type: Types.SEND_GROUP_EMAIL_SUCCESS
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.SEND_GROUP_EMAIL_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const getBuyerBusinesses = (search = false, stageId = false) => async dispatch => {
  dispatch({
    type: Types.GET_BUYER_BUSINESSES_LOADING,
    payload: true
  })
  try {
    if (stageId === 4) {
      /* For Sale */
      const buyerBusiness = await getBuyerBusinessesAPI(search, stageId)
      dispatch({
        type: Types.GET_BUYER_BUSINESSES_FOR_SALE_SUCCESS,
        payload: buyerBusiness
      })
    }
    if (stageId === 5) {
      /* Under Offer */
      const buyerBusiness = await getBuyerBusinessesAPI(search, stageId)
      dispatch({
        type: Types.GET_BUYER_BUSINESSES_UNDER_OFFER_SUCCESS,
        payload: buyerBusiness
      })
    }
    if (stageId === 3) {
      /* Sales Memo */
      const buyerBusiness = await getBuyerBusinessesAPI(search, stageId)
      dispatch({
        type: Types.GET_BUYER_BUSINESSES_SALES_MEMO_SUCCESS,
        payload: buyerBusiness
      })
    }
  } catch (error) {
    dispatch({
      type: Types.GET_BUYER_BUSINESSES_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const getBuyersFromBusiness = (businessId, showAll = false) => async dispatch => {
  dispatch({
    type: Types.GET_BUYERS_FROM_BUSINESS_LOADING,
    payload: true
  })
  try {
    const buyers = await getBuyersFromBusinessAPI(businessId, showAll)
    dispatch({
      type: Types.GET_BUYERS_FROM_BUSINESS_SUCCESS,
      payload: buyers.data
    })
  } catch (error) {
    dispatch({
      type: Types.GET_BUYERS_FROM_BUSINESS_FAILURE,
      payload: error
    })
    toast.error(error.message)
  }
}

export const getBusinessFromBuyer = id => async dispatch => {
  dispatch({
    type: Types.GET_BUSINESS_FROM_BUYER_LOADING,
    payload: true
  })
  try {
    const business = await getBusinessFromBuyerAPI(id)
    dispatch({
      type: Types.GET_BUSINESS_FROM_BUYER_SUCCESS,
      payload: business
    })
  } catch (error) {
    dispatch({
      type: Types.GET_BUSINESS_FROM_BUYER_FAILURE,
      payload: error
    })
    toast.error(error.message)
  }
}

export const updateBusinessFromBuyer = business => async dispatch => {
  dispatch({
    type: Types.UPDATE_BUSINESS_FROM_BUYER_LOADING,
    payload: true
  })
  try {
    const response = await updateBusinessFromBuyerAPI(business)
    const getBusiness = await getBusinessFromBuyerAPI(business.id)
    dispatch({
      type: Types.UPDATE_BUSINESS_FROM_BUYER_SUCCESS,
      payload: getBusiness
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.UPDATE_BUSINESS_FROM_BUYER_FAILURE,
      payload: error
    })
    toast.error('Error trying to upload the business. Please get in contact with IT department.')
  }
}

export const getBusinessLogFromBuyer = (businessId, search = false) => async dispatch => {
  dispatch({
    type: Types.GET_BUSINESS_LOG_FROM_BUYER_LOADING
  })
  try {
    const response = await getBusinessLogFromBuyerAPI(businessId, search)
    dispatch({
      type: Types.GET_BUSINESS_LOG_FROM_BUYER_SUCCESS,
      payload: response.data
    })
  } catch (error) {
    dispatch({
      type: Types.GET_BUSINESS_LOG_FROM_BUYER_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const updateBusinessLogFromBuyer = businessLog => async dispatch => {
  dispatch({
    type: Types.UPDATE_BUSINESS_LOG_FROM_BUYER_LOADING,
    payload: true
  })
  try {
    const response = await updateBusinessLogFromBuyerAPI(businessLog)
    dispatch({
      type: Types.UPDATE_BUSINESS_LOG_FROM_BUYER_SUCCESS
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.UPDATE_BUSINESS_LOG_FROM_BUYER_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const finaliseBusinessLogFromBuyer = businessLog => async dispatch => {
  dispatch({
    type: Types.FINALISE_BUSINESS_LOG_FROM_BUYER_LOADING,
    payload: true
  })
  try {
    const response = await finaliseBusinessLogFromBuyerAPI(businessLog)
    dispatch({
      type: Types.FINALISE_BUSINESS_LOG_FROM_BUYER_SUCCESS
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.FINALISE_BUSINESS_LOG_FROM_BUYER_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const getBuyersGroupEmail = businessId => async dispatch => {
  dispatch({
    type: Types.GET_BUYERS_GROUP_EMAIL_LOADING,
    payload: true
  })
  try {
    const buyers = await getBuyersGroupEmailAPI(businessId)
    dispatch({
      type: Types.GET_BUYERS_GROUP_EMAIL_SUCCESS,
      payload: buyers.data
    })
  } catch (error) {
    dispatch({
      type: Types.GET_BUYERS_GROUP_EMAIL_FAILURE,
      payload: error
    })
    toast.error(error.message)
  }
}

export const verifyDuplicatedBuyer = values => async dispatch => {
  dispatch({
    type: Types.VERIFY_DUPLICATED_BUYER_LOADING,
    payload: true
  })
  try {
    const verifyDuplicatedBuyer = await verifyDuplicatedBuyerAPI(values)
    dispatch({
      type: Types.VERIFY_DUPLICATED_BUYER_SUCCESS,
      payload: verifyDuplicatedBuyer.data
    })
  } catch (error) {
    dispatch({
      type: Types.VERIFY_DUPLICATED_BUYER_FAILURE,
      payload: error
    })
    toast.error(error.message)
  }
}

export const clearBuyer = () => async dispatch => {
  dispatch({
    type: Types.CLEAR_BUYER
  })
}

export const setLastBusinessTabFromBuyerSelected = indexLastTab => async dispatch => {
  dispatch({
    type: Types.SET_BUSINESS_LAST_TAB_FROM_BUYER_SELECTED,
    payload: indexLastTab
  })
}
