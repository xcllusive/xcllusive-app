import { getMarketingReport as getMarketingReportAPI } from '../../../services/api/CTC/reports'
import { toast } from 'react-toastify'

// Action Types

export const Types = {
  GET_CTC_MARKETING_REPORT_LOADING: 'GET_CTC_MARKETING_REPORT_LOADING',
  GET_CTC_MARKETING_REPORT_SUCCESS: 'GET_CTC_MARKETING_REPORT_SUCCESS',
  GET_CTC_MARKETING_REPORT_FAILURE: 'GET_CTC_MARKETING_REPORT_FAILURE',
  CLEAR_CTC_MARKETING_REPORT: 'CLEAR_CTC_MARKETING_REPORT',
  KEEP_CTC_MARKETING_RECORDS: 'KEEP_CTC_MARKETING_RECORDS'
}

// Reducer

const initialState = {
  getMarketingReport: {
    isLoading: false,
    leadsPerAnalystArray: [],
    arrayTotalPerSource: [],
    arrayLeadsPerSource: [],
    totalGeralPerSource: null,
    totalsArray: [],
    error: null
  },
  keepMarketingRecords: {
    records: null
  }
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case Types.GET_CTC_MARKETING_REPORT_LOADING:
      return {
        ...state,
        getLastWeeklyReport: {
          ...state.getMarketingReport,
          isLoading: action.payload,
          leadsPerAnalystArray: null,
          totalsArray: null,
          arrayTotalPerSource: null,
          arrayLeadsPerSource: null,
          totalGeralPerSource: null,
          error: null
        }
      }
    case Types.GET_CTC_MARKETING_REPORT_SUCCESS:
      return {
        ...state,
        getMarketingReport: {
          ...state.getMarketingReport,
          isLoading: false,
          leadsPerAnalystArray: action.payload.leadsPerAnalyst,
          totalsArray: action.payload.totalsArray,
          arrayTotalPerSource: action.payload.arrayTotalPerSource,
          arrayLeadsPerSource: action.payload.arrayLeadsPerSource,
          totalGeralPerSource: action.payload.totalGeralPerSource,
          error: null
        }
      }
    case Types.GET_CTC_MARKETING_REPORT_FAILURE:
      return {
        ...state,
        getMarketingReport: {
          ...state.getMarketingReport,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.KEEP_CTC_MARKETING_RECORDS:
      return {
        ...state,
        keepMarketingRecords: {
          ...state.getBusinessesAnalyst,
          records: action.payload
        }
      }
    default:
      return state
  }
}

// Action Creators

export const getMarketingReport = (dateFrom, dateTo) => async dispatch => {
  dispatch({
    type: Types.GET_CTC_MARKETING_REPORT_LOADING,
    payload: true
  })
  try {
    const getMarketingReport = await getMarketingReportAPI(dateFrom, dateTo)
    dispatch({
      type: Types.GET_CTC_MARKETING_REPORT_SUCCESS,
      payload: getMarketingReport.data
    })
    dispatch({
      type: Types.KEEP_CTC_MARKETING_RECORDS,
      payload: { dateFrom, dateTo }
    })
  } catch (error) {
    dispatch({
      type: Types.GET_CTC_MARKETING_REPORT_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const clearMarketingReports = () => async dispatch => {
  dispatch({
    type: Types.CLEAR_CTC_MARKETING_REPORT
  })
}
