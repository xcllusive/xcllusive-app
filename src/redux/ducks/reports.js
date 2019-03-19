import {
  getMarketingReport as getMarketingReportAPI,
  getAllAnalysts as getAllAnalystsAPI,
  getAnalystReport as getAnalystReportAPI,
  getQtdeBusinessesStagePerUser as getQtdeBusinessesStagePerUserAPI
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
  GET_BUSINESSES_STAGE_PER_USER_FAILURE: 'GET_BUSINESSES_STAGE_PER_USER_FAILURE'
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
    case Types.CLEAR_MARKETING_REPORT:
      return initialState
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
