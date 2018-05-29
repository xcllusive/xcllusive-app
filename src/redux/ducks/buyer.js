import { toast } from 'react-toastify'

import {
  create,
  update,
  getAll,
  get,
  getBusinessesFromBuyer as getBusinessesFromBuyerAPI,
  sendEmailBuyerBrokersEmail as sendEmailBuyerBrokersEmailAPI
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
  GET_BUSINESSES_FROM_BUYER_FAILURE: 'GET_BUSINESSES_FROM_BUYER_FAILURE'
}

// Reducer

const initialState = {
  create: {
    isLoading: false,
    isCreated: false,
    error: null
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
          error: null
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
    await create(buyer)
    dispatch({
      type: Types.CREATE_BUYER_SUCCESS
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
