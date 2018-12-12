import { createWeeklyReport as createWeeklyReportAPI } from '../../services/api/broker'
import { toast } from 'react-toastify'

// Action Types

export const Types = {
  CREATE_WEEKLY_REPORT_LOADING: 'CREATE_WEEKLY_REPORT_LOADING',
  CREATE_WEEKLY_REPORT_SUCCESS: 'CREATE_WEEKLY_REPORT_SUCCESS',
  CREATE_WEEKLY_REPORT_FAILURE: 'CREATE_WEEKLY_REPORT_FAILURE'
}

// Reducer

const initialState = {
  create: {
    isLoading: false,
    isCreated: false,
    error: null
  }
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case Types.CREATE_WEEKLY_REPORT_LOADING:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.CREATE_WEEKLY_REPORT_SUCCESS:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: false,
          isCreated: true,
          error: null
        }
      }
    case Types.CREATE_WEEKLY_REPORT_FAILURE:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: false,
          isCreated: false,
          error: action.payload
        }
      }
    default:
      return state
  }
}

// Action Creators

export const createWeeklyReport = newLog => async dispatch => {
  dispatch({
    type: Types.CREATE_WEEKLY_REPORT_LOADING,
    payload: true
  })
  try {
    const response = await createWeeklyReportAPI(newLog)
    dispatch({
      type: Types.CREATE_WEEKLY_REPORT_SUCCESS
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.CREATE_WEEKLY_REPORT_FAILURE,
      payload: error
    })
  }
}
