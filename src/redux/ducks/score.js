import { toast } from 'react-toastify'
import { Types as ModalTypes } from './modal'
import { list, calculate } from '../../services/api/score'

// Action Types

export const Types = {
  CALCULATE_SCORE_LOADING: 'CALCULATE_SCORE_LOADING',
  CALCULATE_SCORE_SUCCESS: 'CALCULATE_SCORE_SUCCESS',
  CALCULATE_SCORE_FAILURE: 'CALCULATE_SCORE_FAILURE',
  LIST_SCORE_LOADING: 'LIST_SCORE_LOADING',
  LIST_SCORE_SUCCESS: 'LIST_SCORE_SUCCESS',
  LIST_SCORE_FAILURE: 'LIST_SCORE_FAILURE'
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
  create: {
    isLoading: false,
    isCalculated: false,
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
