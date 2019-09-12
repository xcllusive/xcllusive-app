import {
  getMarketingReport as getMarketingReportAPI,
  getBusinessesPerAnalyst as getBusinessesPerAnalystAPI,
  getAllAnalysts as getAllAnalystsAPI,
  getQtdeBusinessesStagePerUser as getQtdeBusinessesStagePerUserAPI,
  getAnalystReport as getAnalystReportAPI,
  getEnquiryReport as getEnquiryReportAPI
} from '../../../services/api/CTC/reports'
import { toast } from 'react-toastify'

// Action Types

export const Types = {
  GET_CTC_MARKETING_REPORT_LOADING: 'GET_CTC_MARKETING_REPORT_LOADING',
  GET_CTC_MARKETING_REPORT_SUCCESS: 'GET_CTC_MARKETING_REPORT_SUCCESS',
  GET_CTC_MARKETING_REPORT_FAILURE: 'GET_CTC_MARKETING_REPORT_FAILURE',
  CLEAR_CTC_MARKETING_REPORT: 'CLEAR_CTC_MARKETING_REPORT',
  KEEP_CTC_MARKETING_RECORDS: 'KEEP_CTC_MARKETING_RECORDS',
  GET_CTC_BUSINESSES_PER_ANALYST_LOADING: 'GET_CTC_BUSINESSES_PER_ANALYST_LOADING',
  GET_CTC_BUSINESSES_PER_ANALYST_SUCCESS: 'GET_CTC_BUSINESSES_PER_ANALYST_SUCCESS',
  GET_CTC_BUSINESSES_PER_ANALYST_FAILURE: 'GET_CTC_BUSINESSES_PER_ANALYST_FAILURE',
  SET_CTC_LAST_TAB_SELECTED: 'SET_CTC_LAST_TAB_SELECTED',
  GET_CTC_ALL_ANALYSTS_LOADING: 'GET_CTC_ALL_ANALYSTS_LOADING',
  GET_CTC_ALL_ANALYSTS_SUCCESS: 'GET_CTC_ALL_ANALYSTS_SUCCESS',
  GET_CTC_ALL_ANALYSTS_FAILURE: 'GET_CTC_ALL_ANALYSTS_FAILURE',
  GET_CTC_BUSINESSES_STAGE_PER_USER_LOADING: 'GET_CTC_BUSINESSES_STAGE_PER_USER_LOADING',
  GET_CTC_BUSINESSES_STAGE_PER_USER_SUCCESS: 'GET_CTC_BUSINESSES_STAGE_PER_USER_SUCCESS',
  GET_CTC_BUSINESSES_STAGE_PER_USER_FAILURE: 'GET_CTC_BUSINESSES_STAGE_PER_USER_FAILURE',
  GET_CTC_ANALYST_REPORT_LOADING: 'GET_CTC_ANALYST_REPORT_LOADING',
  GET_CTC_ANALYST_REPORT_SUCCESS: 'GET_CTC_ANALYST_REPORT_SUCCESS',
  GET_CTC_ANALYST_REPORT_FAILURE: 'GET_CTC_ANALYST_REPORT_FAILURE',
  KEEP_CTC_ANALYST_PARAMS: 'KEEP_CTC_ANALYST_PARAMS',
  GET_CTC_ENQUIRY_REPORT_LOADING: 'GET_CTC_ENQUIRY_REPORT_LOADING',
  GET_CTC_ENQUIRY_REPORT_SUCCESS: 'GET_CTC_ENQUIRY_REPORT_SUCCESS',
  GET_CTC_ENQUIRY_REPORT_FAILURE: 'GET_CTC_ENQUIRY_REPORT_FAILURE',
  KEEP_CTC_ENQUIRY_PARAMS: 'KEEP_CTC_ENQUIRY_PARAMS',
  CLEAR_CTC_ENQUIRIES_REPORT: 'CLEAR_CTC_ENQUIRIES_REPORT'
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
  },
  getCtcBusinessesAnalyst: {
    isLoading: false,
    object: {},
    error: null
  },
  setLastTabSelected: {
    index: 0
  },
  getAllAnalysts: {
    isLoading: false,
    array: [],
    error: null
  },
  getQtdeBusinessesStagePerUser: {
    isLoading: false,
    qtde: null,
    error: null
  },
  getAnalystReports: {
    isLoading: false,
    array: null,
    error: null
  },
  getEnquiryReport: {
    isLoading: false,
    objectEnquiry: null,
    error: null
  },
  keepEnquiryParams: null
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
    case Types.GET_CTC_BUSINESSES_PER_ANALYST_LOADING:
      return {
        ...state,
        getCtcBusinessesAnalyst: {
          ...state.getCtcBusinessesAnalyst,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.GET_CTC_BUSINESSES_PER_ANALYST_SUCCESS:
      return {
        ...state,
        getCtcBusinessesAnalyst: {
          ...state.getCtcBusinessesAnalyst,
          isLoading: false,
          object: action.payload,
          error: null
        }
      }
    case Types.GET_CTC_BUSINESSES_PER_ANALYST_FAILURE:
      return {
        ...state,
        getCtcBusinessesAnalyst: {
          ...state.getCtcBusinessesAnalyst,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.SET_CTC_LAST_TAB_SELECTED:
      return {
        ...state,
        setLastTabSelected: {
          ...state.setLastTabSelected,
          index: action.payload
        }
      }
    case Types.GET_CTC_ALL_ANALYSTS_LOADING:
      return {
        ...state,
        getAllAnalysts: {
          ...state.getAllAnalysts,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.GET_CTC_ALL_ANALYSTS_SUCCESS:
      return {
        ...state,
        getAllAnalysts: {
          ...state.getAllAnalysts,
          isLoading: false,
          array: action.payload,
          error: null
        }
      }
    case Types.GET_CTC_ALL_ANALYSTS_FAILURE:
      return {
        ...state,
        getAllAnalysts: {
          ...state.getAllAnalysts,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.GET_CTC_BUSINESSES_STAGE_PER_USER_LOADING:
      return {
        ...state,
        getQtdeBusinessesStagePerUser: {
          ...state.getQtdeBusinessesStagePerUser,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.GET_CTC_BUSINESSES_STAGE_PER_USER_SUCCESS:
      return {
        ...state,
        getQtdeBusinessesStagePerUser: {
          ...state.getQtdeBusinessesStagePerUser,
          isLoading: false,
          qtde: action.payload,
          error: null
        }
      }
    case Types.GET_CTC_BUSINESSES_STAGE_PER_USER_FAILURE:
      return {
        ...state,
        getQtdeBusinessesStagePerUser: {
          ...state.getQtdeBusinessesStagePerUser,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.GET_CTC_ANALYST_REPORT_LOADING:
      return {
        ...state,
        getAnalystReports: {
          ...state.getAnalystReports,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.GET_CTC_ANALYST_REPORT_SUCCESS:
      return {
        ...state,
        getAnalystReports: {
          ...state.getAnalystReports,
          isLoading: false,
          array: action.payload,
          error: null
        }
      }
    case Types.GET_CTC_ANALYST_REPORT_FAILURE:
      return {
        ...state,
        getAnalystReports: {
          ...state.getAnalystReports,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.KEEP_CTC_ANALYST_PARAMS:
      return {
        ...state,
        keepAnalystParams: action.payload
      }
    case Types.GET_CTC_ENQUIRY_REPORT_LOADING:
      return {
        ...state,
        getEnquiryReport: {
          ...state.getEnquiryReport,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.GET_CTC_ENQUIRY_REPORT_SUCCESS:
      return {
        ...state,
        getEnquiryReport: {
          ...state.getEnquiryReport,
          isLoading: false,
          objectEnquiry: action.payload,
          error: null
        }
      }
    case Types.GET_CTC_ENQUIRY_REPORT_FAILURE:
      return {
        ...state,
        getEnquiryReport: {
          ...state.getEnquiryReport,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.KEEP_CTC_ENQUIRY_PARAMS:
      return {
        ...state,
        keepEnquiryParams: action.payload
      }
    case Types.CLEAR_CTC_ENQUIRIES_REPORT:
      return {
        ...state,
        getEnquiryReport: {
          ...state.getEnquiryReport,
          isLoading: false,
          error: null,
          objectEnquiry: null
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

export const getBusinessesPerAnalyst = (analystId, dateFrom, dateTo) => async dispatch => {
  dispatch({
    type: Types.GET_CTC_BUSINESSES_PER_ANALYST_LOADING,
    payload: true
  })
  try {
    const getCtcBusinessesAnalyst = await getBusinessesPerAnalystAPI(analystId, dateFrom, dateTo)
    dispatch({
      type: Types.GET_CTC_BUSINESSES_PER_ANALYST_SUCCESS,
      payload: getCtcBusinessesAnalyst.data
    })
  } catch (error) {
    dispatch({
      type: Types.GET_CTC_BUSINESSES_PER_ANALYST_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const setLastCtcTabSelected = indexLastTab => async dispatch => {
  dispatch({
    type: Types.SET_CTC_LAST_TAB_SELECTED,
    payload: indexLastTab
  })
}

export const getAllAnalysts = () => async dispatch => {
  dispatch({
    type: Types.GET_CTC_ALL_ANALYSTS_LOADING,
    payload: true
  })
  try {
    const getMarketingReport = await getAllAnalystsAPI()
    dispatch({
      type: Types.GET_CTC_ALL_ANALYSTS_SUCCESS,
      payload: getMarketingReport.data
    })
  } catch (error) {
    dispatch({
      type: Types.GET_CTC_ALL_ANALYSTS_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const getQtdeBusinessesStagePerUser = (analystId, dateFrom, dateTo) => async dispatch => {
  dispatch({
    type: Types.GET_CTC_BUSINESSES_STAGE_PER_USER_LOADING,
    payload: true
  })
  try {
    const getAnalystReport = await getQtdeBusinessesStagePerUserAPI(analystId, dateFrom, dateTo)
    dispatch({
      type: Types.GET_CTC_BUSINESSES_STAGE_PER_USER_SUCCESS,
      payload: getAnalystReport.data
    })
  } catch (error) {
    dispatch({
      type: Types.GET_CTC_BUSINESSES_STAGE_PER_USER_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const getAnalystReport = (analystId, dateFrom, dateTo, stageId) => async dispatch => {
  dispatch({
    type: Types.GET_CTC_ANALYST_REPORT_LOADING,
    payload: true
  })
  try {
    const getAnalystReport = await getAnalystReportAPI(analystId, dateFrom, dateTo, stageId)
    dispatch({
      type: Types.GET_CTC_ANALYST_REPORT_SUCCESS,
      payload: getAnalystReport.data
    })
    dispatch({
      type: Types.KEEP_CTC_ANALYST_PARAMS,
      payload: { analystId, dateFrom, dateTo, stageId }
    })
  } catch (error) {
    dispatch({
      type: Types.GET_CTC_ANALYST_REPORT_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const getEnquiryReport = (
  dateFrom,
  dateTo,
  listOfIdOfAnalysts = false,
  arraySelectedAnalysts = false,
  showAllEnquiries
) => async dispatch => {
  dispatch({
    type: Types.GET_CTC_ENQUIRY_REPORT_LOADING,
    payload: true
  })
  try {
    const getEnquiryReport = await getEnquiryReportAPI(dateFrom, dateTo, listOfIdOfAnalysts)
    dispatch({
      type: Types.GET_CTC_ENQUIRY_REPORT_SUCCESS,
      payload: getEnquiryReport.data
    })
    dispatch({
      type: Types.KEEP_CTC_ENQUIRY_PARAMS,
      payload: { dateFrom, dateTo, arraySelectedAnalysts, showAllEnquiries }
    })
  } catch (error) {
    dispatch({
      type: Types.GET_CTC_ENQUIRY_REPORT_FAILURE,
      payload: error
    })
    toast.error(error.message)
  }
}

export const clearEnquiriesReports = () => async dispatch => {
  dispatch({
    type: Types.CLEAR_CTC_ENQUIRIES_REPORT
  })
}
