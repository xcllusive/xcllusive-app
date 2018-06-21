import {
  get,
  create,
  update,
  getBusBuyLog,
  finaliseLog
} from '../../services/api/buyerLog'
import { toast } from 'react-toastify'

// Action Types

export const Types = {
  GET_BUYER_LOG_LOADING: 'GET_BUYER_LOG_LOADING',
  GET_BUYER_LOG_SUCCESS: 'GET_BUYER_LOG_SUCCESS',
  GET_BUYER_LOG_FAILURE: 'GET_BUYER_LOG_FAILURE',
  CLEAR_BUYER_LOG: 'CLEAR_BUYER_LOG',
  CREATE_NEW_LOG_LOADING: 'CREATE_NEW_LOG_LOADING',
  CREATE_NEW_LOG_SUCCESS: 'CREATE_NEW_LOG_SUCCESS',
  CREATE_NEW_LOG_FAILURE: 'CREATE_NEW_LOG_FAILURE',
  UPDATE_BUYER_LOG_LOADING: 'UPDATE_BUYER_LOG_LOADING',
  UPDATE_BUYER_LOG_SUCCESS: 'UPDATE_BUYER_LOG_SUCCESS',
  UPDATE_BUYER_LOG_FAILURE: 'UPDATE_BUYER_LOG_FAILURE',
  GET_BUS_BUY_LOG_LOADING: 'GET_BUS_BUY_LOG_LOADING',
  GET_BUS_BUY_LOG_SUCCESS: 'GET_BUS_BUY_LOG_SUCCESS',
  GET_BUS_BUY_LOG_FAILURE: 'GET_BUS_BUY_LOG_FAILURE',
  FINALISE_LOG_BUYER_LOADING: 'FINALISE_LOG_BUYER_LOADING',
  FINALISE_LOG_BUYER_SUCCESS: 'FINALISE_LOG_BUYER_SUCCESS',
  FINALISE_LOG_BUYER_FAILURE: 'FINALISE_LOG_BUYER_FAILURE'
}

// Reducer

const initialState = {
  get: {
    array: [],
    isLoading: false,
    error: null,
    pages: 0,
    activePage: 1
  },
  create: {
    isLoading: false,
    isCreated: false,
    error: null
  },
  update: {
    isLoading: false,
    isUpdated: false,
    error: null,
    buyerLog: {}
  },
  getBusBuyLog: {
    array: [],
    isLoading: false,
    error: null,
    pages: 0,
    activePage: 1
  },
  finaliseLog: {
    isLoading: false,
    isFinalised: false,
    error: null
  }
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case Types.GET_BUYER_LOG_LOADING:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.GET_BUYER_LOG_SUCCESS:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: false,
          array: action.payload.data.rows,
          pages: action.payload.itemCount,
          error: null
        }
      }
    case Types.GET_BUYER_LOG_FAILURE:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.CLEAR_BUYER_LOG:
      return initialState
    case Types.CREATE_NEW_LOG_LOADING:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.CREATE_NEW_LOG_SUCCESS:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: false,
          isCreated: true,
          error: null
        }
      }
    case Types.CREATE_NEW_LOG_FAILURE:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: false,
          isCreated: false,
          error: action.payload
        }
      }
    case Types.UPDATE_BUYER_LOG_LOADING:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: action.payload,
          isUpdated: false,
          error: null
        }
      }
    case Types.UPDATE_BUYER_LOG_SUCCESS:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: false,
          isUpdated: true,
          error: null,
          buyerLog: action.payload
        }
      }
    case Types.UPDATE_BUYER_LOG_FAILURE:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: false,
          isUpdated: false,
          error: action.payload
        }
      }
    case Types.GET_BUS_BUY_LOG_LOADING:
      return {
        ...state,
        getBusBuyLog: {
          ...state.getBusBuyLog,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.GET_BUS_BUY_LOG_SUCCESS:
      return {
        ...state,
        getBusBuyLog: {
          ...state.getBusBuyLog,
          isLoading: false,
          array: action.payload.data.rows,
          pages: action.payload.itemCount,
          error: null
        }
      }
    case Types.GET_BUS_BUY_LOG_FAILURE:
      return {
        ...state,
        getBusBuyLog: {
          ...state.getBusBuyLog,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.FINALISE_LOG_BUYER_LOADING:
      return {
        ...state,
        finaliseLog: {
          ...state.finaliseLog,
          isLoading: action.payload,
          isFinalised: false,
          error: null
        }
      }
    case Types.FINALISE_LOG_BUYER_SUCCESS:
      return {
        ...state,
        finaliseLog: {
          ...state.finaliseLog,
          isLoading: false,
          isFinalised: true
        }
      }
    case Types.FINALISE_LOG_BUYER_FAILURE:
      return {
        ...state,
        finaliseLog: {
          ...state.finaliseLog,
          isLoading: false,
          error: action.payload
        }
      }
    default:
      return state
  }
}

// Action Creators
export const logLoading = (value, type) => ({
  type: Types[type],
  payload: value
})

export const getLog = (id, limit = 10, page = null) => async dispatch => {
  dispatch({
    type: Types.GET_BUYER_LOG_LOADING,
    payload: true
  })
  try {
    const log = await get(id, limit, page)
    dispatch({
      type: Types.GET_BUYER_LOG_SUCCESS,
      payload: log
    })
  } catch (error) {
    dispatch({
      type: Types.GET_BUYER_LOG_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const clearBuyerLog = () => dispatch => {
  dispatch({
    type: Types.CLEAR_BUYER_LOG
  })
}

export const createNewLog = newLog => async dispatch => {
  dispatch({
    type: Types.CREATE_NEW_LOG_LOADING,
    payload: true
  })
  try {
    const response = await create(newLog)
    dispatch({
      type: Types.CREATE_NEW_LOG_SUCCESS
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.CREATE_NEW_LOG_FAILURE,
      payload: error
    })
  }
}

export const updateBuyerLog = buyerLog => async dispatch => {
  dispatch({
    type: Types.UPDATE_BUYER_LOG_LOADING,
    payload: true
  })
  try {
    await update(buyerLog)
    dispatch({
      type: Types.UPDATE_BUYER_LOG_SUCCESS,
      payload: buyerLog
    })
  } catch (error) {
    dispatch({
      type: Types.UPDATE_BUYER_LOG_FAILURE,
      payload: error
    })
  }
}

export const getBusinessBuyerLog = (
  buyerId,
  businessId,
  limit = 10,
  page = false
) => async dispatch => {
  dispatch({
    type: Types.GET_BUS_BUY_LOG_LOADING,
    payload: true
  })
  try {
    const log = await getBusBuyLog(buyerId, businessId, limit, page)
    dispatch({
      type: Types.GET_BUS_BUY_LOG_SUCCESS,
      payload: log
    })
  } catch (error) {
    dispatch({
      type: Types.GET_BUS_BUY_LOG_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const finaliseBuyerLog = (businessId, buyerId) => async dispatch => {
  dispatch({
    type: Types.FINALISE_LOG_BUYER_LOADING,
    payload: true
  })
  try {
    const response = await finaliseLog(businessId, buyerId)
    dispatch({
      type: Types.FINALISE_LOG_BUYER_SUCCESS
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.FINALISE_LOG_BUYER_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}
