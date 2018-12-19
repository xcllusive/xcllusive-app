import {
  createWeeklyReport as createWeeklyReportAPI,
  getLastWeeklyReport as getLastWeeklyReportAPI,
  updateWeeklyReport as updateWeeklyReportAPI,
  getBrokersPerRegion as getBrokersPerRegionAPI,
  getBusinessesPerBroker as getBusinessesPerBrokerAPI
} from '../../services/api/broker'
import { toast } from 'react-toastify'

// Action Types

export const Types = {
  CREATE_WEEKLY_REPORT_LOADING: 'CREATE_WEEKLY_REPORT_LOADING',
  CREATE_WEEKLY_REPORT_SUCCESS: 'CREATE_WEEKLY_REPORT_SUCCESS',
  CREATE_WEEKLY_REPORT_FAILURE: 'CREATE_WEEKLY_REPORT_FAILURE',
  GET_LAST_WEEKLY_REPORT_LOADING: 'GET_LAST_WEEKLY_REPORT_LOADING',
  GET_LAST_WEEKLY_REPORT_SUCCESS: 'GET_LAST_WEEKLY_REPORT_SUCCESS',
  GET_LAST_WEEKLY_REPORT_FAILURE: 'GET_LAST_WEEKLY_REPORT_FAILURE',
  UPDATE_WEEKLY_REPORT_LOADING: 'UPDATE_WEEKLY_REPORT_LOADING',
  UPDATE_WEEKLY_REPORT_SUCCESS: 'UPDATE_WEEKLY_REPORT_SUCCESS',
  UPDATE_WEEKLY_REPORT_FAILURE: 'UPDATE_WEEKLY_REPORT_FAILURE',
  GET_BROKERS_PER_REGION_LOADING: 'GET_BROKERS_PER_REGION_LOADING',
  GET_BROKERS_PER_REGION_SUCCESS: 'GET_BROKERS_PER_REGION_SUCCESS',
  GET_BROKERS_PER_REGION_FAILURE: 'GET_BROKERS_PER_REGION_FAILURE',
  GET_BUSINESSES_PER_BROKER_LOADING: 'GET_BUSINESSES_PER_BROKER_LOADING',
  GET_BUSINESSES_PER_BROKER_SUCCESS: 'GET_BUSINESSES_PER_BROKER_SUCCESS',
  GET_BUSINESSES_PER_BROKER_FAILURE: 'GET_BUSINESSES_PER_BROKER_FAILURE',
  CLEAR_WEEKLY_REPORT: 'CLEAR_WEEKLY_REPORT'
}

// Reducer

const initialState = {
  create: {
    isLoading: false,
    isCreated: false,
    error: null
  },
  getLastWeeklyReport: {
    isLoading: false,
    object: null,
    error: null
  },
  update: {
    isLoading: false,
    isUpdated: false,
    error: null,
    weeklyReport: {}
  },
  getBrokersPerRegion: {
    isLoading: false,
    array: [],
    error: null
  },
  getBusinessesPerBroker: {
    isLoading: false,
    businessesAndReport: [],
    arrayReportOnTheMarket: [],
    arrayReportImStage: [],
    arrayReportUnderOffer: [],
    arrayReportExchanged: [],
    arrayReportWithdrawn: [],
    arrayReportSold: [],
    arrayBusinessesNotAlocated: [],
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
    case Types.GET_LAST_WEEKLY_REPORT_LOADING:
      return {
        ...state,
        getLastWeeklyReport: {
          ...state.getLastWeeklyReport,
          isLoading: action.payload,
          object: null,
          error: null
        }
      }
    case Types.GET_LAST_WEEKLY_REPORT_SUCCESS:
      return {
        ...state,
        getLastWeeklyReport: {
          ...state.getLastWeeklyReport,
          isLoading: false,
          object: action.payload,
          error: null
        }
      }
    case Types.GET_LAST_WEEKLY_REPORT_FAILURE:
      return {
        ...state,
        getLastWeeklyReport: {
          ...state.getLastWeeklyReport,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.UPDATE_WEEKLY_REPORT_LOADING:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: action.payload,
          isUpdated: false,
          error: null
        }
      }
    case Types.UPDATE_WEEKLY_REPORT_SUCCESS:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: false,
          isUpdated: true,
          error: null,
          weeklyReport: action.payload
        }
      }
    case Types.UPDATE_WEEKLY_REPORT_FAILURE:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: false,
          isUpdated: false,
          error: action.payload
        }
      }
    case Types.GET_BROKERS_PER_REGION_LOADING:
      return {
        ...state,
        getBrokersPerRegion: {
          ...state.getBrokersPerRegion,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.GET_BROKERS_PER_REGION_SUCCESS:
      return {
        ...state,
        getBrokersPerRegion: {
          ...state.getBrokersPerRegion,
          isLoading: false,
          array: action.payload,
          error: null
        }
      }
    case Types.GET_BROKERS_PER_REGION_FAILURE:
      return {
        ...state,
        getBrokersPerRegion: {
          ...state.getBrokersPerRegion,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.GET_BUSINESSES_PER_BROKER_LOADING:
      return {
        ...state,
        getBusinessesPerBroker: {
          ...state.getBusinessesPerBroker,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.GET_BUSINESSES_PER_BROKER_SUCCESS:
      return {
        ...state,
        getBusinessesPerBroker: {
          ...state.getBusinessesPerBroker,
          isLoading: false,
          businessesAndReport: action.payload,
          arrayReportOnTheMarket: action.payload.filter(item => {
            return item.reports !== null && item.reports.stage === 'On The Market'
          }),
          arrayReportImStage: action.payload.filter(item => {
            return item.reports !== null && item.reports.stage === 'Info Memorandum'
          }),
          arrayReportUnderOffer: action.payload.filter(item => {
            return item.reports !== null && item.reports.stage === 'Under Offer'
          }),
          arrayReportExchanged: action.payload.filter(item => {
            return item.reports !== null && item.reports.stage === 'Exchanged'
          }),
          arrayReportWithdrawn: action.payload.filter(item => {
            return item.reports !== null && item.reports.stage === 'Withdrawn'
          }),
          arrayReportSold: action.payload.filter(item => {
            return item.reports !== null && item.reports.stage === 'Sold'
          }),
          arrayBusinessesNotAlocated: action.payload.filter(item => {
            return item.reports === null
          }),
          error: null
        }
      }
    case Types.GET_BUSINESSES_PER_BROKER_FAILURE:
      return {
        ...state,
        getBusinessesPerBroker: {
          ...state.getBusinessesPerBroker,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.CLEAR_WEEKLY_REPORT:
      return initialState
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

export const getLastWeeklyReport = businessId => async dispatch => {
  dispatch({
    type: Types.GET_LAST_WEEKLY_REPORT_LOADING,
    payload: true
  })
  try {
    const getLastWeeklyReport = await getLastWeeklyReportAPI(businessId)
    dispatch({
      type: Types.GET_LAST_WEEKLY_REPORT_SUCCESS,
      payload: getLastWeeklyReport.data
    })
  } catch (error) {
    dispatch({
      type: Types.GET_LAST_WEEKLY_REPORT_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const updateWeeklyReport = weeklyReport => async dispatch => {
  dispatch({
    type: Types.UPDATE_WEEKLY_REPORT_LOADING,
    payload: true
  })
  try {
    const response = await updateWeeklyReportAPI(weeklyReport)
    dispatch({
      type: Types.UPDATE_WEEKLY_REPORT_SUCCESS,
      payload: weeklyReport
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.UPDATE_WEEKLY_REPORT_FAILURE,
      payload: error
    })
  }
}

export const getBrokersPerRegion = region => async dispatch => {
  dispatch({
    type: Types.GET_BROKERS_PER_REGION_LOADING,
    payload: true
  })
  try {
    const brokers = await getBrokersPerRegionAPI(region)
    dispatch({
      type: Types.GET_BROKERS_PER_REGION_SUCCESS,
      payload: brokers.data
    })
  } catch (error) {
    dispatch({
      type: Types.GET_BROKERS_PER_REGION_FAILURE,
      payload: error
    })
    toast.error(error.message)
  }
}

export const getBusinessesPerBroker = brokerId => async dispatch => {
  dispatch({
    type: Types.GET_BUSINESSES_PER_BROKER_LOADING,
    payload: true
  })
  try {
    const businessesReport = await getBusinessesPerBrokerAPI(brokerId)
    dispatch({
      type: Types.GET_BUSINESSES_PER_BROKER_SUCCESS,
      payload: businessesReport
    })
  } catch (error) {
    dispatch({
      type: Types.GET_BUSINESSES_PER_BROKER_FAILURE,
      payload: error
    })
    toast.error(error.message)
  }
}

export const clearWeeklyReports = () => async dispatch => {
  dispatch({
    type: Types.CLEAR_WEEKLY_REPORT
  })
}
