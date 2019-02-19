import { getMarketingReport as getMarketingReportAPI } from '../../services/api/reports'
import { toast } from 'react-toastify'

// Action Types

export const Types = {
  GET_MARKETING_REPORT_LOADING: 'GET_MARKETING_REPORT_LOADING',
  GET_MARKETING_REPORT_SUCCESS: 'GET_MARKETING_REPORT_SUCCESS',
  GET_MARKETING_REPORT_FAILURE: 'GET_MARKETING_REPORT_FAILURE'
}

// Reducer

const initialState = {
  getMarketingReport: {
    isLoading: false,
    object: null,
    error: null
  }
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case Types.GET_MARKETING_REPORT_LOADING:
      return {
        ...state,
        getLastWeeklyReport: {
          ...state.getMarketingReport,
          isLoading: action.payload,
          object: null,
          error: null
        }
      }
    case Types.GET_MARKETING_REPORT_SUCCESS:
      return {
        ...state,
        getMarketingReport: {
          ...state.getMarketingReport,
          isLoading: false,
          object: action.payload,
          error: null
        }
      }
    case Types.GET_MARKETING_REPORT_FAILURE:
      return {
        ...state,
        getMarketingReport: {
          ...state.getMarketingReport,
          isLoading: false,
          error: action.payload
        }
      }
    default:
      return state
  }
}

// Action Creators

export const getMarketingReport = businessId => async dispatch => {
  dispatch({
    type: Types.GET_MARKETING_REPORT_LOADING,
    payload: true
  })
  try {
    const getMarketingReport = await getMarketingReportAPI(businessId)
    dispatch({
      type: Types.GET_MARKETING_REPORT_SUCCESS,
      payload: getMarketingReport.data
    })
  } catch (error) {
    dispatch({
      type: Types.GET_MARKETING_REPORT_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}
