import {
  getMarketingReport as getMarketingReportAPI,
  getAllAnalysts as getAllAnalystsAPI,
  getAnalystReport as getAnalystReportAPI,
  getQtdeBusinessesStagePerUser as getQtdeBusinessesStagePerUserAPI,
  getBusinessesPerAnalyst as getBusinessesPerAnalystAPI,
  getEnquiryReport as getEnquiryReportAPI,
  activityRequestControlPerUser as activityRequestControlPerUserAPI,
  getUsersPerRegion as getUsersPerRegionAPI,
  getDailyTimeActivityReport as getDailyTimeActivityReportAPI
} from '../../services/api/reports'
import { toast } from 'react-toastify'

// Action Types

export const Types = {
  GET_MARKETING_REPORT_LOADING: 'GET_MARKETING_REPORT_LOADING',
  GET_MARKETING_REPORT_SUCCESS: 'GET_MARKETING_REPORT_SUCCESS',
  GET_MARKETING_REPORT_FAILURE: 'GET_MARKETING_REPORT_FAILURE',
  CLEAR_MARKETING_REPORT: 'CLEAR_MARKETING_REPORT',
  GET_ALL_ANALYSTS_LOADING: 'GET_ALL_ANALYSTS_LOADING',
  GET_ALL_ANALYSTS_SUCCESS: 'GET_ALL_ANALYSTS_SUCCESS',
  GET_ALL_ANALYSTS_FAILURE: 'GET_ALL_ANALYSTS_FAILURE',
  GET_ANALYST_REPORT_LOADING: 'GET_ANALYST_REPORT_LOADING',
  GET_ANALYST_REPORT_SUCCESS: 'GET_ANALYST_REPORT_SUCCESS',
  GET_ANALYST_REPORT_FAILURE: 'GET_ANALYST_REPORT_FAILURE',
  GET_BUSINESSES_STAGE_PER_USER_LOADING: 'GET_BUSINESSES_STAGE_PER_USER_LOADING',
  GET_BUSINESSES_STAGE_PER_USER_SUCCESS: 'GET_BUSINESSES_STAGE_PER_USER_SUCCESS',
  GET_BUSINESSES_STAGE_PER_USER_FAILURE: 'GET_BUSINESSES_STAGE_PER_USER_FAILURE',
  GET_BUSINESSES_PER_ANALYST_LOADING: 'GET_BUSINESSES_PER_ANALYST_LOADING',
  GET_BUSINESSES_PER_ANALYST_SUCCESS: 'GET_BUSINESSES_PER_ANALYST_SUCCESS',
  GET_BUSINESSES_PER_ANALYST_FAILURE: 'GET_BUSINESSES_PER_ANALYST_FAILURE',
  KEEP_MARKETING_RECORDS: 'KEEP_MARKETING_RECORDS',
  SET_LAST_TAB_SELECTED: 'SET_LAST_TAB_SELECTED',
  KEEP_ANALYST_PARAMS: 'KEEP_ANALYST_PARAMS',
  GET_ENQUIRY_REPORT_LOADING: 'GET_ENQUIRY_REPORT_LOADING',
  GET_ENQUIRY_REPORT_SUCCESS: 'GET_ENQUIRY_REPORT_SUCCESS',
  GET_ENQUIRY_REPORT_FAILURE: 'GET_ENQUIRY_REPORT_FAILURE',
  KEEP_ENQUIRY_PARAMS: 'KEEP_ENQUIRY_PARAMS',
  CLEAR_ENQUIRIES_REPORT: 'CLEAR_ENQUIRIES_REPORT',
  GET_ACTIVITY_REQUEST_CONTROL_LOADING: 'GET_ACTIVITY_REQUEST_CONTROL_LOADING',
  GET_ACTIVITY_REQUEST_CONTROL_SUCCESS: 'GET_ACTIVITY_REQUEST_CONTROL_SUCCESS',
  GET_ACTIVITY_REQUEST_CONTROL_FAILURE: 'GET_ACTIVITY_REQUEST_CONTROL_FAILURE',
  KEEP_ACTIVITY_REQUEST_RECORDS: 'KEEP_ACTIVITY_REQUEST_RECORDS',
  GET_USERS_PER_REGION_LOADING: 'GET_USERS_PER_REGION_LOADING',
  GET_USERS_PER_REGION_SUCCESS: 'GET_USERS_PER_REGION_SUCCESS',
  GET_USERS_PER_REGION_FAILURE: 'GET_USERS_PER_REGION_FAILURE',
  SET_USER_ACCOUNT_NAME: 'SET_USER_ACCOUNT_NAME',
  GET_DAILY_TIME_ACTIVITY_LOADING: 'GET_DAILY_TIME_ACTIVITY_LOADING',
  GET_DAILY_TIME_ACTIVITY_SUCCESS: 'GET_DAILY_TIME_ACTIVITY_SUCCESS',
  GET_DAILY_TIME_ACTIVITY_FAILURE: 'GET_DAILY_TIME_ACTIVITY_FAILURE'
}

// Reducer

const initialState = {
  getMarketingReport: {
    isLoading: false,
    leadsPerAnalystArray: [],
    arrayTotalPerSource: [],
    arrayLeadsPerSourceAdelaide: [],
    arrayLeadsPerSourceCamberra: [],
    arrayLeadsPerSourceCowra: [],
    arrayLeadsPerSourceMelbourne: [],
    arrayLeadsPerSourceSydney: [],
    arrayLeadsPerSourceQueensland: [],
    totalGeralPerSource: null,
    arrayOffices: [],
    error: null
  },
  getAllAnalysts: {
    isLoading: false,
    array: [],
    error: null
  },
  getAnalystReports: {
    isLoading: false,
    array: null,
    error: null
  },
  getQtdeBusinessesStagePerUser: {
    isLoading: false,
    qtde: null,
    error: null
  },
  getBusinessesAnalyst: {
    isLoading: false,
    object: {},
    error: null
  },
  keepMarketingRecords: {
    records: null
  },
  setLastTabSelected: {
    index: 0
  },
  keepAnalystParams: null,
  getEnquiryReport: {
    isLoading: false,
    objectEnquiry: null,
    error: null
  },
  keepEnquiryParams: null,
  getActivityRequestControl: {
    isLoading: false,
    array: null,
    error: null
  },
  keepActivityRequestRecords: null,
  getUsersPerRegion: {
    isLoading: false,
    array: [],
    error: null
  },
  getDailyTimeActivityReport: {
    isLoading: false,
    array: [],
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
          leadsPerAnalystArray: null,
          arrayTotalPerSource: null,
          arrayLeadsPerSourceAdelaide: null,
          arrayLeadsPerSourceCamberra: null,
          arrayLeadsPerSourceCowra: null,
          arrayLeadsPerSourceMelbourne: null,
          arrayLeadsPerSourceSydney: null,
          arrayLeadsPerSourceQueensland: null,
          totalGeralPerSource: null,
          arrayOffices: null,
          error: null
        }
      }
    case Types.GET_MARKETING_REPORT_SUCCESS:
      return {
        ...state,
        getMarketingReport: {
          ...state.getMarketingReport,
          isLoading: false,
          leadsPerAnalystArray: action.payload.arrayFinal,
          arrayTotalPerSource: action.payload.arrayTotalPerSource,
          arrayLeadsPerSourceAdelaide: action.payload.arrayLeadsPerSourceAdelaide,
          arrayLeadsPerSourceCamberra: action.payload.arrayLeadsPerSourceCamberra,
          arrayLeadsPerSourceCowra: action.payload.arrayLeadsPerSourceCowra,
          arrayLeadsPerSourceGosford: action.payload.arrayLeadsPerSourceGosford,
          arrayLeadsPerSourceMelbourne: action.payload.arrayLeadsPerSourceMelbourne,
          arrayLeadsPerSourceSydney: action.payload.arrayLeadsPerSourceSydney,
          arrayLeadsPerSourceQueensland: action.payload.arrayLeadsPerSourceQueensland,
          totalGeralPerSource: action.payload.totalGeralPerSource,
          arrayOffices: action.payload.arrayOffices,
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
    case Types.GET_ALL_ANALYSTS_LOADING:
      return {
        ...state,
        getAllAnalysts: {
          ...state.getAllAnalysts,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.GET_ALL_ANALYSTS_SUCCESS:
      return {
        ...state,
        getAllAnalysts: {
          ...state.getAllAnalysts,
          isLoading: false,
          array: action.payload,
          error: null
        }
      }
    case Types.GET_ALL_ANALYSTS_FAILURE:
      return {
        ...state,
        getAllAnalysts: {
          ...state.getAllAnalysts,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.GET_ANALYST_REPORT_LOADING:
      return {
        ...state,
        getAnalystReports: {
          ...state.getAnalystReports,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.GET_ANALYST_REPORT_SUCCESS:
      return {
        ...state,
        getAnalystReports: {
          ...state.getAnalystReports,
          isLoading: false,
          array: action.payload,
          error: null
        }
      }
    case Types.GET_ANALYST_REPORT_FAILURE:
      return {
        ...state,
        getAnalystReports: {
          ...state.getAnalystReports,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.GET_BUSINESSES_STAGE_PER_USER_LOADING:
      return {
        ...state,
        getQtdeBusinessesStagePerUser: {
          ...state.getQtdeBusinessesStagePerUser,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.GET_BUSINESSES_STAGE_PER_USER_SUCCESS:
      return {
        ...state,
        getQtdeBusinessesStagePerUser: {
          ...state.getQtdeBusinessesStagePerUser,
          isLoading: false,
          qtde: action.payload,
          error: null
        }
      }
    case Types.GET_BUSINESSES_STAGE_PER_USER_FAILURE:
      return {
        ...state,
        getQtdeBusinessesStagePerUser: {
          ...state.getQtdeBusinessesStagePerUser,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.GET_BUSINESSES_PER_ANALYST_LOADING:
      return {
        ...state,
        getBusinessesAnalyst: {
          ...state.getBusinessesAnalyst,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.GET_BUSINESSES_PER_ANALYST_SUCCESS:
      return {
        ...state,
        getBusinessesAnalyst: {
          ...state.getBusinessesAnalyst,
          isLoading: false,
          object: action.payload,
          error: null
        }
      }
    case Types.GET_BUSINESSES_PER_ANALYST_FAILURE:
      return {
        ...state,
        getBusinessesAnalyst: {
          ...state.getBusinessesAnalyst,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.KEEP_MARKETING_RECORDS:
      return {
        ...state,
        keepMarketingRecords: {
          ...state.getBusinessesAnalyst,
          records: action.payload
        }
      }
    case Types.SET_LAST_TAB_SELECTED:
      return {
        ...state,
        setLastTabSelected: {
          ...state.setLastTabSelected,
          index: action.payload
        }
      }
    case Types.KEEP_ANALYST_PARAMS:
      return {
        ...state,
        keepAnalystParams: action.payload
      }
    case Types.GET_ENQUIRY_REPORT_LOADING:
      return {
        ...state,
        getEnquiryReport: {
          ...state.getEnquiryReport,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.GET_ENQUIRY_REPORT_SUCCESS:
      return {
        ...state,
        getEnquiryReport: {
          ...state.getEnquiryReport,
          isLoading: false,
          objectEnquiry: action.payload,
          error: null
        }
      }
    case Types.GET_ENQUIRY_REPORT_FAILURE:
      return {
        ...state,
        getEnquiryReport: {
          ...state.getEnquiryReport,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.KEEP_ENQUIRY_PARAMS:
      return {
        ...state,
        keepEnquiryParams: action.payload
      }
    case Types.GET_ACTIVITY_REQUEST_CONTROL_LOADING:
      return {
        ...state,
        getActivityRequestControl: {
          ...state.getActivityRequestControl,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.GET_ACTIVITY_REQUEST_CONTROL_SUCCESS:
      return {
        ...state,
        getActivityRequestControl: {
          ...state.getActivityRequestControl,
          isLoading: false,
          array: action.payload.data,
          maxTotalsPerDate: action.payload.maxTotalsPerDate,
          minTotalsPerDate: action.payload.minTotalsPerDate,
          avgTotalsPerDate: action.payload.avgTotalsPerDate,
          maxTotalsAnalystsPerDate: action.payload.maxTotalsAnalystsPerDate,
          avgTotalsAnalystsPerDate: action.payload.avgTotalsAnalystsPerDate,
          maxTotalsBrokersPerDate: action.payload.maxTotalsBrokersPerDate,
          avgTotalsBrokersPerDate: action.payload.avgTotalsBrokersPerDate,
          error: null
        }
      }
    case Types.GET_ACTIVITY_REQUEST_CONTROL_FAILURE:
      return {
        ...state,
        getActivityRequestControl: {
          ...state.getActivityRequestControl,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.KEEP_ACTIVITY_REQUEST_RECORDS:
      return {
        ...state,
        keepActivityRequestRecords: action.payload
      }
    case Types.GET_USERS_PER_REGION_LOADING:
      return {
        ...state,
        getUsersPerRegion: {
          ...state.getUsersPerRegion,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.GET_USERS_PER_REGION_SUCCESS:
      return {
        ...state,
        getUsersPerRegion: {
          ...state.getUsersPerRegion,
          isLoading: false,
          array: action.payload,
          error: null
        }
      }
    case Types.GET_USERS_PER_REGION_FAILURE:
      return {
        ...state,
        getUsersPerRegion: {
          ...state.getUsersPerRegion,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.SET_USER_ACCOUNT_NAME:
      return {
        ...state,
        userAccountName: action.payload
      }
    case Types.GET_DAILY_TIME_ACTIVITY_LOADING:
      return {
        ...state,
        getDailyTimeActivityReport: {
          ...state.getDailyTimeActivityReport,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.GET_DAILY_TIME_ACTIVITY_SUCCESS:
      return {
        ...state,
        getDailyTimeActivityReport: {
          ...state.getDailyTimeActivityReport,
          isLoading: false,
          array: action.payload,
          error: null
        }
      }
    case Types.GET_DAILY_TIME_ACTIVITY_FAILURE:
      return {
        ...state,
        getDailyTimeActivityReport: {
          ...state.getDailyTimeActivityReport,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.CLEAR_MARKETING_REPORT:
      return initialState
    case Types.CLEAR_ENQUIRIES_REPORT:
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
    type: Types.GET_MARKETING_REPORT_LOADING,
    payload: true
  })
  try {
    const getMarketingReport = await getMarketingReportAPI(dateFrom, dateTo)
    dispatch({
      type: Types.GET_MARKETING_REPORT_SUCCESS,
      payload: getMarketingReport.data
    })
    dispatch({
      type: Types.KEEP_MARKETING_RECORDS,
      payload: { dateFrom, dateTo }
    })
  } catch (error) {
    dispatch({
      type: Types.GET_MARKETING_REPORT_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const clearMarketingReports = () => async dispatch => {
  dispatch({
    type: Types.CLEAR_MARKETING_REPORT
  })
}

export const getAllAnalysts = () => async dispatch => {
  dispatch({
    type: Types.GET_ALL_ANALYSTS_LOADING,
    payload: true
  })
  try {
    const getMarketingReport = await getAllAnalystsAPI()
    dispatch({
      type: Types.GET_ALL_ANALYSTS_SUCCESS,
      payload: getMarketingReport.data
    })
  } catch (error) {
    dispatch({
      type: Types.GET_ALL_ANALYSTS_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const getAnalystReport = (analystId, dateFrom, dateTo, stageId) => async dispatch => {
  dispatch({
    type: Types.GET_ANALYST_REPORT_LOADING,
    payload: true
  })
  try {
    const getAnalystReport = await getAnalystReportAPI(analystId, dateFrom, dateTo, stageId)
    dispatch({
      type: Types.GET_ANALYST_REPORT_SUCCESS,
      payload: getAnalystReport.data
    })
    dispatch({
      type: Types.KEEP_ANALYST_PARAMS,
      payload: { analystId, dateFrom, dateTo, stageId }
    })
  } catch (error) {
    dispatch({
      type: Types.GET_ANALYST_REPORT_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const getQtdeBusinessesStagePerUser = (analystId, dateFrom, dateTo) => async dispatch => {
  dispatch({
    type: Types.GET_BUSINESSES_STAGE_PER_USER_LOADING,
    payload: true
  })
  try {
    const getAnalystReport = await getQtdeBusinessesStagePerUserAPI(analystId, dateFrom, dateTo)
    dispatch({
      type: Types.GET_BUSINESSES_STAGE_PER_USER_SUCCESS,
      payload: getAnalystReport.data
    })
  } catch (error) {
    dispatch({
      type: Types.GET_BUSINESSES_STAGE_PER_USER_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const getBusinessesPerAnalyst = (analystId, dateFrom, dateTo) => async dispatch => {
  dispatch({
    type: Types.GET_BUSINESSES_PER_ANALYST_LOADING,
    payload: true
  })
  try {
    const getBusinessesAnalyst = await getBusinessesPerAnalystAPI(analystId, dateFrom, dateTo)
    dispatch({
      type: Types.GET_BUSINESSES_PER_ANALYST_SUCCESS,
      payload: getBusinessesAnalyst.data
    })
  } catch (error) {
    dispatch({
      type: Types.GET_BUSINESSES_PER_ANALYST_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const setLastTabSelected = indexLastTab => async dispatch => {
  dispatch({
    type: Types.SET_LAST_TAB_SELECTED,
    payload: indexLastTab
  })
}

export const getEnquiryReport = (
  dateFrom,
  dateTo,
  listOfIdOfAnalysts = false,
  arraySelectedAnalysts = false,
  showAllEnquiries
) => async dispatch => {
  dispatch({
    type: Types.GET_ENQUIRY_REPORT_LOADING,
    payload: true
  })
  try {
    const getEnquiryReport = await getEnquiryReportAPI(dateFrom, dateTo, listOfIdOfAnalysts)
    dispatch({
      type: Types.GET_ENQUIRY_REPORT_SUCCESS,
      payload: getEnquiryReport.data
    })
    dispatch({
      type: Types.KEEP_ENQUIRY_PARAMS,
      payload: { dateFrom, dateTo, arraySelectedAnalysts, showAllEnquiries }
    })
  } catch (error) {
    dispatch({
      type: Types.GET_ENQUIRY_REPORT_FAILURE,
      payload: error
    })
    toast.error(error.message)
  }
}

export const clearEnquiriesReports = () => async dispatch => {
  dispatch({
    type: Types.CLEAR_ENQUIRIES_REPORT
  })
}

export const activityRequestControlPerUser = (
  officeId,
  userIdSelected,
  dateFrom,
  dateTo,
  dataGraph
) => async dispatch => {
  dispatch({
    type: Types.GET_ACTIVITY_REQUEST_CONTROL_LOADING,
    payload: true
  })
  try {
    const getActivityRequestControl = await activityRequestControlPerUserAPI(
      officeId,
      userIdSelected,
      dateFrom,
      dateTo,
      dataGraph
    )
    dispatch({
      type: Types.GET_ACTIVITY_REQUEST_CONTROL_SUCCESS,
      payload: getActivityRequestControl
    })
  } catch (error) {
    dispatch({
      type: Types.GET_ACTIVITY_REQUEST_CONTROL_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const keepActivityRequestControlPerUser = (
  officeId,
  userIdSelected,
  dateFrom,
  dateTo,
  dataGraph
) => async dispatch => {
  dispatch({
    type: Types.KEEP_ACTIVITY_REQUEST_RECORDS,
    payload: { officeId, userIdSelected, dateFrom, dateTo, dataGraph }
  })
}

export const getUsersPerRegion = region => async dispatch => {
  dispatch({
    type: Types.GET_USERS_PER_REGION_LOADING,
    payload: true
  })
  try {
    const users = await getUsersPerRegionAPI(region)
    dispatch({
      type: Types.GET_USERS_PER_REGION_SUCCESS,
      payload: users.data
    })
  } catch (error) {
    dispatch({
      type: Types.GET_USERS_PER_REGION_FAILURE,
      payload: error
    })
    toast.error(error.message)
  }
}

export const setUserAccountName = value => dispatch => {
  dispatch({
    type: Types.SET_USER_ACCOUNT_NAME,
    payload: value
  })
}

export const getDailyTimeActivityReport = (id, date) => async dispatch => {
  dispatch({
    type: Types.GET_DAILY_TIME_ACTIVITY_LOADING,
    payload: true
  })
  try {
    const dailyTime = await getDailyTimeActivityReportAPI(id, date)
    dispatch({
      type: Types.GET_DAILY_TIME_ACTIVITY_SUCCESS,
      payload: dailyTime.data
    })
  } catch (error) {
    dispatch({
      type: Types.GET_DAILY_TIME_ACTIVITY_FAILURE,
      payload: error
    })
    toast.error(error.message)
  }
}
