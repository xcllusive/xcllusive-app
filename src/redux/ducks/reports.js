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
