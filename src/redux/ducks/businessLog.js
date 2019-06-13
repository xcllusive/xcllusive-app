import { getAllFromBusiness, update, finalise } from '../../services/api/businessLog'
import { toast } from 'react-toastify'

// Action Types

export const Types = {
  GET_BUSINESS_LOG_LOADING: 'GET_BUSINESS_LOG_LOADING',
  GET_BUSINESS_LOG_SUCCESS: 'GET_BUSINESS_LOG_SUCCESS',
  GET_BUSINESS_LOG_FAILURE: 'GET_BUSINESS_LOG_FAILURE',
  CLEAR_BUSINESS_LOG: 'CLEAR_BUSINESS_LOG',
  UPDATE_BUSINESS_LOG_LOADING: 'UPDATE_BUSINESS_LOG_LOADING',
  UPDATE_BUSINESS_LOG_SUCCESS: 'UPDATE_BUSINESS_LOG_SUCCESS',
  UPDATE_BUSINESS_LOG_FAILURE: 'UPDATE_BUSINESS_LOG_FAILURE',
  FINALISE_BUSINESS_LOG_LOADING: 'FINALISE_BUSINESS_LOG_LOADING',
  FINALISE_BUSINESS_LOG_SUCCESS: 'FINALISE_BUSINESS_LOG_SUCCESS',
  FINALISE_BUSINESS_LOG_FAILURE: 'FINALISE_BUSINESS_LOG_FAILURE'
}

// Reducer

const initialState = {
  get: {
    array: [],
    isLoading: false,
    error: null
  },
  updateLog: {
    isLoading: false,
    isUpdated: false,
    error: null
  },
  finaliseLog: {
    isLoading: false,
    isUpdated: false,
    error: null
  }
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case Types.GET_BUSINESS_LOG_LOADING:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: true
        }
      }
    case Types.GET_BUSINESS_LOG_SUCCESS:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: false,
          array: action.payload
        }
      }
    case Types.GET_BUSINESS_LOG_FAILURE:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.CLEAR_BUSINESS_LOG:
      return initialState
    case Types.UPDATE_BUSINESS_LOG_LOADING:
      return {
        ...state,
        updateLog: {
          ...state.updateLog,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.UPDATE_BUSINESS_LOG_SUCCESS:
      return {
        ...state,
        updateLog: {
          ...state.updateStatus,
          isLoading: false,
          isUpdated: action.payload,
          error: null
        }
      }
    case Types.UPDATE_BUSINESS_LOG_FAILURE:
      return {
        ...state,
        updateLog: {
          ...state.updateLog,
          isLoading: false,
          isUpdated: false,
          error: action.payload
        }
      }
    case Types.FINALISE_BUSINESS_LOG_LOADING:
      return {
        ...state,
        finaliseLog: {
          ...state.finaliseLog,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.FINALISE_BUSINESS_LOG_SUCCESS:
      return {
        ...state,
        finaliseLog: {
          ...state.finaliseLog,
          isLoading: false,
          isUpdated: action.payload,
          error: null
        }
      }
    case Types.FINALISE_BUSINESS_LOG_FAILURE:
      return {
        ...state,
        finaliseLog: {
          ...state.finaliseLog,
          isLoading: false,
          isUpdated: false,
          error: action.payload
        }
      }
    default:
      return state
  }
}

// Action Creators

export const getLogFromBusiness = (
  businessId,
  search = false,
  orderByDefault = true,
  descAsc = true
) => async dispatch => {
  dispatch({
    type: Types.GET_BUSINESS_LOG_LOADING
  })
  try {
    const response = await getAllFromBusiness(businessId, search, orderByDefault, descAsc)
    dispatch({
      type: Types.GET_BUSINESS_LOG_SUCCESS,
      payload: response.data
    })
  } catch (error) {
    dispatch({
      type: Types.GET_BUSINESS_LOG_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const clearBusinessLog = () => dispatch => {
  dispatch({
    type: Types.CLEAR_BUSINESS_LOG
  })
}

export const updateBusinessLog = businessLog => async dispatch => {
  dispatch({
    type: Types.UPDATE_BUSINESS_LOG_LOADING,
    payload: true
  })
  try {
    const response = await update(businessLog)
    dispatch({
      type: Types.UPDATE_BUSINESS_LOG_SUCCESS
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.UPDATE_BUSINESS_LOG_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const finaliseBusinessLog = businessLog => async dispatch => {
  dispatch({
    type: Types.FINALISE_BUSINESS_LOG_LOADING,
    payload: true
  })
  try {
    const response = await finalise(businessLog)
    dispatch({
      type: Types.FINALISE_BUSINESS_LOG_SUCCESS
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.FINALISE_BUSINESS_LOG_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const setBusinessLogReducer = logs => {
  return {
    type: Types.GET_BUSINESS_LOG_SUCCESS,
    payload: logs
  }
}
