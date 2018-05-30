import { getAllFromBusiness } from '../../services/api/businessLog'
import { toast } from 'react-toastify'

// Action Types

export const Types = {
  GET_BUSINESS_LOG_LOADING: 'GET_BUSINESS_LOG_LOADING',
  GET_BUSINESS_LOG_SUCCESS: 'GET_BUSINESS_LOG_SUCCESS',
  GET_BUSSINES_LOG_FAILURE: 'GET_BUSSINES_LOG_FAILURE'
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
