import { toast } from 'react-toastify'
import {
  getCtcAllPerUser,
  getCtcQtdeBusinessEachStagePerUser as getCtcQtdeBusinessEachStagePerUserAPI
} from '../../../services/api/CTC/business'

// Action Types

export const Types = {
  GET_CTC_BUSINESSES_PER_USER_LOADING: 'GET_CTC_BUSINESSES_PER_USER_LOADING',
  GET_CTC_BUSINESSES_PER_USER_SUCCESS: 'GET_CTC_BUSINESSES_PER_USER_SUCCESS',
  GET_CTC_BUSINESSES_PER_USER_FAILURE: 'GET_CTC_BUSINESSES_PER_USER_FAILURE',
  GET_CTC_QTDE_BUSINESS_STAGE_USER_LOADING: 'GET_CTC_QTDE_BUSINESS_STAGE_USER_LOADING',
  GET_CTC_QTDE_BUSINESS_STAGE_USER_SUCCESS: 'GET_CTC_QTDE_BUSINESS_STAGE_USER_SUCCESS',
  GET_CTC_QTDE_BUSINESS_STAGE_USER_FAILURE: 'GET_CTC_QTDE_BUSINESS_STAGE_USER_FAILURE'
}

// Reducer

const initialState = {
  getCtcAllPerUser: {
    isLoading: false,
    array: [],
    error: null
  },
  getCtcQtdeBusinessStageUser: {
    isLoading: true,
    object: {},
    error: null
  }
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case Types.GET_CTC_BUSINESSES_PER_USER_LOADING:
      return {
        ...state,
        getCtcAllPerUser: {
          ...state.getCtcAllPerUser,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.GET_CTC_BUSINESSES_PER_USER_SUCCESS:
      return {
        ...state,
        getCtcAllPerUser: {
          ...state.getCtcAllPerUser,
          isLoading: false,
          array: action.payload.data,
          error: null
        }
      }
    case Types.GET_CTC_BUSINESSES_PER_USER_FAILURE:
      return {
        ...state,
        getCtcAllPerUser: {
          ...state.getCtcAllPerUser,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.GET_CTC_QTDE_BUSINESS_STAGE_USER_LOADING:
      return {
        ...state,
        getCtcQtdeBusinessStageUser: {
          ...state.getCtcQtdeBusinessStageUser,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.GET_CTC_QTDE_BUSINESS_STAGE_USER_SUCCESS:
      return {
        ...state,
        getCtcQtdeBusinessStageUser: {
          ...state.getCtcQtdeBusinessStageUser,
          isLoading: false,
          object: action.payload,
          error: null
        }
      }
    case Types.GET_CTC_QTDE_BUSINESS_STAGE_USER_FAILURE:
      return {
        ...state,
        getCtcQtdeBusinessStageUser: {
          ...state.getCtcQtdeBusinessStageUser,
          isLoading: false,
          error: action.payload
        }
      }
    default:
      return state
  }
}

// Action Creators
export const getCtcBusinessesPerUser = (
  search = false,
  stageId = false,
  filterLog = false,
  orderByDateTimeCreated = false
) => async dispatch => {
  dispatch({
    type: Types.GET_CTC_BUSINESSES_PER_USER_LOADING,
    payload: true
  })
  try {
    const businesses = await getCtcAllPerUser(search, stageId, filterLog, orderByDateTimeCreated)
    dispatch({
      type: Types.GET_CTC_BUSINESSES_PER_USER_SUCCESS,
      payload: businesses
    })
  } catch (error) {
    dispatch({
      type: Types.GET_CTC_BUSINESSES_PER_USER_FAILURE,
      payload: error
    })
    toast.error(error.message)
  }
}

export const getCtcQtdeBusinessEachStagePerUser = () => async dispatch => {
  dispatch({
    type: Types.GET_CTC_QTDE_BUSINESS_STAGE_USER_LOADING,
    payload: true
  })
  try {
    const buyers = await getCtcQtdeBusinessEachStagePerUserAPI()
    dispatch({
      type: Types.GET_CTC_QTDE_BUSINESS_STAGE_USER_SUCCESS,
      payload: buyers.data
    })
  } catch (error) {
    dispatch({
      type: Types.GET_CTC_QTDE_BUSINESS_STAGE_USER_FAILURE,
      payload: error
    })
    toast.error(error.message)
  }
}
