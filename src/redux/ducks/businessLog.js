import {
  getAllFromBusiness,
  updateStatus
} from '../../services/api/businessLog'
import { toast } from 'react-toastify'

// Action Types

export const Types = {
  GET_BUSINESS_LOG_LOADING: 'GET_BUSINESS_LOG_LOADING',
  GET_BUSINESS_LOG_SUCCESS: 'GET_BUSINESS_LOG_SUCCESS',
  GET_BUSSINES_LOG_FAILURE: 'GET_BUSSINES_LOG_FAILURE',
  CLEAR_BUSINESS_LOG: 'CLEAR_BUSINESS_LOG',
  UPDATE_BUSINESS_FOLLOW_UP_STATUS_LOADING:
    'UPDATE_BUSINESS_FOLLOW_UP_STATUS_LOADING',
  UPDATE_BUSINESS_FOLLOW_UP_STATUS_SUCCESS:
    'UPDATE_BUSINESS_FOLLOW_UP_STATUS_SUCCESS',
  UPDATE_BUSINESS_FOLLOW_UP_STATUS_FAILURE:
    'UPDATE_BUSINESS_FOLLOW_UP_STATUS_FAILURE'
}

// Reducer

const initialState = {
  get: {
    array: [],
    isLoading: false,
    error: null
  },
  updateStatus: {
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
    case Types.GET_BUSSINES_LOG_FAILURE:
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
    case Types.UPDATE_BUSINESS_FOLLOW_UP_STATUS_LOADING:
      return {
        ...state,
        updateStatus: {
          ...state.updateStatus,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.UPDATE_BUSINESS_FOLLOW_UP_STATUS_SUCCESS:
      return {
        ...state,
        updateStatus: {
          ...state.updateStatus,
          isLoading: false,
          isUpdated: action.payload,
          error: null
        }
      }
    case Types.UPDATE_BUSINESS_FOLLOW_UP_STATUS_FAILURE:
      return {
        ...state,
        updateStatus: {
          ...state.updateStatus,
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

export const getLogFromBusiness = businessId => async dispatch => {
  dispatch({
    type: Types.GET_BUSINESS_LOG_LOADING
  })
  try {
    const response = await getAllFromBusiness(businessId)
    dispatch({
      type: Types.GET_BUSINESS_LOG_SUCCESS,
      payload: response.data
    })
  } catch (error) {
    dispatch({
      type: Types.GET_BUSSINES_LOG_FAILURE,
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

export const updateFollowUpStatus = businessLog => async dispatch => {
  dispatch({
    type: Types.UPDATE_BUSINESS_FOLLOW_UP_STATUS_LOADING,
    payload: true
  })
  try {
    const response = await updateStatus(businessLog)
    dispatch({
      type: Types.UPDATE_BUSINESS_FOLLOW_UP_STATUS_SUCCESS
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.UPDATE_BUSINESS_FOLLOW_UP_STATUS_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}
