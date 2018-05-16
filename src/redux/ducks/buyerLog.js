import { get, create, update, getBusBuyLog } from '../../services/api/buyerLog'
import { toast } from 'react-toastify'

// Action Types

export const Types = {
  GET_BUYER_LOG_LOADING: 'GET_BUYER_LOG_LOADING',
  GET_BUYER_LOG_SUCCESS: 'GET_BUYER_LOG_SUCCESS',
  GET_BUYER_LOG_FAILURE: 'GET_BUYER_LOG_FAILURE',
  CLEAR_BUYER_LOG: 'CLEAR_BUYER_LOG',
  CREATE_BUYER_LOG_LOADING: 'CREATE_BUYER_LOG_LOADING',
  CREATE_BUYER_LOG_SUCCESS: 'CREATE_BUYER_LOG_SUCCESS',
  CREATE_BUYER_LOG_FAILURE: 'CREATE_BUYER_LOG_FAILURE',
  UPDATE_BUYER_LOG_LOADING: 'UPDATE_BUYER_LOG_LOADING',
  UPDATE_BUYER_LOG_SUCCESS: 'UPDATE_BUYER_LOG_SUCCESS',
  UPDATE_BUYER_LOG_FAILURE: 'UPDATE_BUYER_LOG_FAILURE',
  GET_BUS_BUY_LOG_LOADING: 'GET_BUS_BUY_LOG_LOADING',
  GET_BUS_BUY_LOG_SUCCESS: 'GET_BUS_BUY_LOG_SUCCESS',
  GET_BUS_BUY_LOG_FAILURE: 'GET_BUS_BUY_LOG_FAILURE'
}

// Reducer

const initialState = {
  get: {
    array: [],
    isLoading: false,
    error: null
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
          array: action.payload,
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
    case Types.CREATE_BUYER_LOG_LOADING:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.CREATE_BUYER_LOG_SUCCESS:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: false,
          isCreated: true,
          error: null
        }
      }
    case Types.CREATE_BUYER_LOG_FAILURE:
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
          array: action.payload,
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
    default:
      return state
  }
}

// Action Creators
export const logLoading = (value, type) => ({
  type: Types[type],
  payload: value
})

export const getLog = id => async dispatch => {
  dispatch({
    type: Types.GET_BUYER_LOG_LOADING,
    payload: true
  })
  try {
    const log = await get(id)
    dispatch({
      type: Types.GET_BUYER_LOG_SUCCESS,
      payload: log.data
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

export const createBuyerLog = (buyerId, businessId) => async dispatch => {
  dispatch({
    type: Types.CREATE_BUYER_LOG_LOADING,
    payload: true
  })
  try {
    await create(buyerId, businessId)
    dispatch({
      type: Types.CREATE_BUYER_LOG_SUCCESS
    })
  } catch (error) {
    dispatch({
      type: Types.CREATE_BUYER_LOG_FAILURE,
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

export const getBusinessBuyerLog = (buyerId, businessId) => async dispatch => {
  dispatch({
    type: Types.GET_BUS_BUY_LOG_LOADING,
    payload: true
  })
  try {
    const log = await getBusBuyLog(buyerId, businessId)
    dispatch({
      type: Types.GET_BUS_BUY_LOG_SUCCESS,
      payload: log.data
    })
  } catch (error) {
    dispatch({
      type: Types.GET_BUS_BUY_LOG_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}
