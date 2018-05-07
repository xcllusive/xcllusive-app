import { get } from '../../services/api/buyerLog'
import { toast } from 'react-toastify'

// Action Types

export const Types = {
  GET_BUYER_LOG_LOADING: 'GET_BUYER_LOG_LOADING',
  GET_BUYER_LOG_SUCCESS: 'GET_BUYER_LOG_SUCCESS',
  GET_BUYER_LOG_FAILURE: 'GET_BUYER_LOG_FAILURE',
  CLEAR_BUYER_LOG: 'CLEAR_BUYER_LOG'
}

// Reducer

const initialState = {
  get: {
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
