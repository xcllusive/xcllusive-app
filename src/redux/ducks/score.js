import { toast } from 'react-toastify'
import { Types as ModalTypes } from './modal'
import {
  list,
  calculate,
  get,
  update,
  enquiries,
  remove
} from '../../services/api/score'

// Action Types

export const Types = {
  CALCULATE_SCORE_LOADING: 'CALCULATE_SCORE_LOADING',
  CALCULATE_SCORE_SUCCESS: 'CALCULATE_SCORE_SUCCESS',
  CALCULATE_SCORE_FAILURE: 'CALCULATE_SCORE_FAILURE',
  LIST_SCORE_LOADING: 'LIST_SCORE_LOADING',
  LIST_SCORE_SUCCESS: 'LIST_SCORE_SUCCESS',
  LIST_SCORE_FAILURE: 'LIST_SCORE_FAILURE',
  GET_SCORE_LOADING: 'GET_SCORE_LOADING',
  GET_SCORE_SUCCESS: 'GET_SCORE_SUCCESS',
  GET_SCORE_FAILURE: 'GET_SCORE_FAILURE',
  CLEAR_SCORE: 'CLEAR_SCORE',
  UPDATE_SCORE_LOADING: 'UPDATE_SCORE_LOADING',
  UPDATE_SCORE_SUCCESS: 'UPDATE_SCORE_SUCCESS',
  UPDATE_SCORE_FAILURE: 'UPDATE_SCORE_FAILURE',
  ENQUIRIES_LAST_4_WEEKS_LOADING: 'ENQUIRIES_LAST_4_WEEKS_LOADING',
  ENQUIRIES_LAST_4_WEEKS_SUCCESS: 'ENQUIRIES_LAST_4_WEEKS_SUCCESS',
  ENQUIRIES_LAST_4_WEEKS_FAILURE: 'ENQUIRIES_LAST_4_WEEKS_FAILURE',
  REMOVE_SCORE_LOADING: 'REMOVE_SCORE_LOADING',
  REMOVE_SCORE_SUCCESS: 'REMOVE_SCORE_SUCCESS',
  REMOVE_SCORE_FAILURE: 'REMOVE_SCORE_FAILURE'
}

// Reducer

const initialState = {
  listScore: {
    array: [],
    isLoading: false,
    error: null,
    pages: 0,
    activePage: 1
  },
  calculateScore: {
    isLoading: false,
    isCalculated: false,
    error: null
  },
  get: {
    object: null,
    isLoading: false,
    error: null
  },
  update: {
    isLoading: false,
    isUpdated: false,
    error: null
  },
  enquiries: {
    object: null,
    isLoading: false,
    error: null
  },
  delete: {
    isLoading: false,
    isDeleted: false,
    error: null
  }
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case Types.LIST_SCORE_LOADING:
      return {
        ...state,
        listScore: {
          ...state.listScore,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.LIST_SCORE_SUCCESS:
      return {
        ...state,
        listScore: {
          ...state.listScore,
          isLoading: false,
          error: null,
          array: action.payload.data.rows,
          pages: action.payload.itemCount
        }
      }
    case Types.LIST_SCORE_FAILURE:
      return {
        ...state,
        listScore: {
          ...state.listScore,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.CALCULATE_SCORE_LOADING:
      return {
        ...state,
        calculateScore: {
          ...state.calculateScore,
          isLoading: action.payload,
          isCalculated: false,
          error: null
        }
      }
    case Types.CALCULATE_SCORE_SUCCESS:
      return {
        ...state,
        calculateScore: {
          ...state.calculateScore,
          isLoading: false,
          isCalculated: true,
          error: null
        }
      }
    case Types.CALCULATE_SCORE_FAILURE:
      return {
        ...state,
        calculateScore: {
          ...state.calculateScore,
          isLoading: false,
          isCalculated: false,
          error: action.payload
        }
      }
    case Types.GET_SCORE_LOADING:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: action.payload,
          object: null,
          error: null
        }
      }
    case Types.GET_SCORE_SUCCESS:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: false,
          object: action.payload,
          error: null
        }
      }
    case Types.GET_SCORE_FAILURE:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.ENQUIRIES_LAST_4_WEEKS_LOADING:
      return {
        ...state,
        enquiries: {
          ...state.enquiries,
          isLoading: action.payload,
          object: null,
          error: null
        }
      }
    case Types.ENQUIRIES_LAST_4_WEEKS_SUCCESS:
      return {
        ...state,
        enquiries: {
          ...state.enquiries,
          isLoading: false,
          object: action.payload,
          error: null
        }
      }
    case Types.ENQUIRIES_LAST_4_WEEKS_FAILURE:
      return {
        ...state,
        enquiries: {
          ...state.enquiries,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.REMOVE_SCORE_LOADING:
      return {
        ...state,
        delete: {
          ...state.delete,
          isLoading: action.payload,
          isDeleted: false,
          error: null
        }
      }
    case Types.REMOVE_SCORE_SUCCESS:
      return {
        ...state,
        delete: {
          ...state.delete,
          isLoading: false,
          isDeleted: true
        }
      }
    case Types.REMOVE_SCORE_FAILURE:
      return {
        ...state,
        delete: {
          ...state.delete,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.CLEAR_SCORE:
      return initialState
    default:
      return state
  }
}

// Action Creators

export const listScore = businessId => async dispatch => {
  dispatch({
    type: Types.LIST_SCORE_LOADING,
    payload: true
  })
  try {
    const listScore = await list(businessId)
    dispatch({
      type: Types.LIST_SCORE_SUCCESS,
      payload: listScore
    })
  } catch (error) {
    dispatch({
      type: Types.LIST_SCORE_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const getScore = idScore => async dispatch => {
  dispatch({
    type: Types.GET_SCORE_LOADING,
    payload: true
  })
  try {
    const getScore = await get(idScore)
    dispatch({
      type: Types.GET_SCORE_SUCCESS,
      payload: getScore.data
    })
  } catch (error) {
    dispatch({
      type: Types.GET_SCORE_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const calculateScore = calculateScore => async dispatch => {
  dispatch({
    type: Types.CALCULATE_SCORE_LOADING,
    payload: true
  })
  try {
    const response = await calculate(calculateScore)
    dispatch({
      type: Types.CALCULATE_SCORE_SUCCESS
    })
    dispatch({
      type: ModalTypes.MODAL_CLOSE
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.CALCULATE_SCORE_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const clearScore = () => dispatch => {
  dispatch({
    type: Types.CLEAR_SCORE
  })
}

export const updateScore = updateScore => async dispatch => {
  dispatch({
    type: Types.UPDATE_SCORE_LOADING,
    payload: true
  })
  try {
    const response = await update(updateScore)
    dispatch({
      type: Types.UPDATE_SCORE_SUCCESS
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.UPDATE_SCORE_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const enquiriesLast4Weeks = businessId => async dispatch => {
  dispatch({
    type: Types.ENQUIRIES_LAST_4_WEEKS_LOADING,
    payload: true
  })
  try {
    const enquiry = await enquiries(businessId)
    dispatch({
      type: Types.ENQUIRIES_LAST_4_WEEKS_SUCCESS,
      payload: enquiry.data
    })
  } catch (error) {
    dispatch({
      type: Types.ENQUIRIES_LAST_4_WEEKS_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const removeScore = score => async dispatch => {
  dispatch({
    type: Types.REMOVE_SCORE_LOADING,
    payload: true
  })
  try {
    const response = await remove(score)
    dispatch({
      type: Types.REMOVE_SCORE_SUCCESS
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.REMOVE_SCORE_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}
