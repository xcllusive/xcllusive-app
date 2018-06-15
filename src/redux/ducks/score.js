import { toast } from 'react-toastify'
import { Types as ModalTypes } from './modal'
import { calculate } from '../../services/api/score'

// Action Types

export const Types = {
  CALCULATE_SCORE_LOADING: 'CALCULATE_SCORE_LOADING',
  CALCULATE_SCORE_SUCCESS: 'CALCULATE_SCORE_SUCCESS',
  CALCULATE_SCORE_FAILURE: 'CALCULATE_SCORE_FAILURE'
}

// Reducer

const initialState = {
  create: {
    isLoading: false,
    isCalculated: false,
    error: null
  }
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
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
