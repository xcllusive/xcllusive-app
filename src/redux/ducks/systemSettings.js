import { toast } from 'react-toastify'
import {
  get,
  update,
  execute,
  exportBuyers as exportBuyersAPI,
  exportIssue as exportIssueAPI
} from '../../services/api/systemSettings'
import download from '../../utils/file-download'
import moment from 'moment'

// Action Types

export const Types = {
  GET_SYSTEM_SETTINGS_LOADING: 'GET_SYSTEM_SETTINGS_LOADING',
  GET_SYSTEM_SETTINGS_SUCCESS: 'GET_SYSTEM_SETTINGS_SUCCESS',
  GET_SYSTEM_SETTINGS_FAILURE: 'GET_SYSTEM_SETTINGS_FAILURE',
  UPDATE_SYSTEM_SETTINGS_LOADING: 'UPDATE_SYSTEM_SETTINGS_LOADING',
  UPDATE_SYSTEM_SETTINGS_SUCCESS: 'UPDATE_SYSTEM_SETTINGS_SUCCESS',
  UPDATE_SYSTEM_SETTINGS_FAILURE: 'UPDATE_SYSTEM_SETTINGS_FAILURE',
  EXECUTE_JAVASCRIPT_LOADING: 'EXECUTE_JAVASCRIPT_LOADING',
  EXECUTE_JAVASCRIPT_SUCCESS: 'EXECUTE_JAVASCRIPT_SUCCESS',
  EXECUTE_JAVASCRIPT_FAILURE: 'EXECUTE_JAVASCRIPT_FAILURE',
  EXPORT_BUYERS_LOADING: 'EXPORT_BUYERS_LOADING',
  EXPORT_BUYERS_SUCCESS: 'EXPORT_BUYERS_SUCCESS',
  EXPORT_BUYERS_FAILURE: 'EXPORT_BUYERS_FAILURE',
  EXPORT_BUSINESS_ISSUE_LOADING: 'EXPORT_BUSINESS_ISSUE_LOADING',
  EXPORT_BUSINESS_ISSUE_SUCCESS: 'EXPORT_BUSINESS_ISSUE_SUCCESS',
  EXPORT_BUSINESS_ISSUE_FAILURE: 'EXPORT_BUSINESS_ISSUE_FAILURE'
}

// Reducer

const initialState = {
  get: {
    object: {},
    isLoading: false,
    error: null
  },
  update: {
    isLoading: false,
    isUpdated: false,
    error: null,
    systemSettings: {}
  },
  executeJavaScript: {
    object: {},
    isLoading: false,
    error: null
  },
  exportBuyers: {
    array: [],
    isLoading: false,
    error: null
  },
  exportIssue: {
    array: [],
    isLoading: false,
    error: null
  }
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case Types.GET_SYSTEM_SETTINGS_LOADING:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: true
        }
      }
    case Types.GET_SYSTEM_SETTINGS_SUCCESS:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: false,
          object: action.payload
        }
      }
    case Types.GET_SYSTEM_SETTINGS_FAILURE:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.UPDATE_SYSTEM_SETTINGS_LOADING:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: action.payload,
          isUpdated: false,
          error: null
        }
      }
    case Types.UPDATE_SYSTEM_SETTINGS_SUCCESS:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: false,
          isUpdated: true,
          error: null,
          systemSettings: action.payload
        }
      }
    case Types.UPDATE_SYSTEM_SETTINGS_FAILURE:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: false,
          isUpdated: false,
          error: action.payload
        }
      }
    case Types.EXECUTE_JAVASCRIPT_LOADING:
      return {
        ...state,
        executeJavaScript: {
          ...state.executeJavaScript,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.EXECUTE_JAVASCRIPT_SUCCESS:
      return {
        ...state,
        executeJavaScript: {
          ...state.executeJavaScript,
          isLoading: false,
          object: action.payload,
          error: null
        }
      }
    case Types.EXECUTE_JAVASCRIPT_FAILURE:
      return {
        ...state,
        executeJavaScript: {
          ...state.executeJavaScript,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.EXPORT_BUYERS_LOADING:
      return {
        ...state,
        exportBuyers: {
          ...state.exportBuyers,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.EXPORT_BUYERS_SUCCESS:
      return {
        ...state,
        exportBuyers: {
          ...state.exportBuyers,
          isLoading: false,
          array: action.payload,
          error: null
        }
      }
    case Types.EXPORT_BUYERS_FAILURE:
      return {
        ...state,
        exportBuyers: {
          ...state.exportBuyers,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.EXPORT_BUSINESS_ISSUE_LOADING:
      return {
        ...state,
        exportIssue: {
          ...state.exportIssue,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.EXPORT_BUSINESS_ISSUE_SUCCESS:
      return {
        ...state,
        exportIssue: {
          ...state.exportIssue,
          isLoading: false,
          array: action.payload,
          error: null
        }
      }
    case Types.EXPORT_BUSINESS_ISSUE_FAILURE:
      return {
        ...state,
        exportIssue: {
          ...state.exportIssue,
          isLoading: false,
          error: action.payload
        }
      }
    default:
      return state
  }
}

// Action Creators

export const getSystemSettings = () => async dispatch => {
  dispatch({
    type: Types.GET_SYSTEM_SETTINGS_LOADING,
    payload: true
  })
  try {
    const systemSettings = await get()
    dispatch({
      type: Types.GET_SYSTEM_SETTINGS_SUCCESS,
      payload: systemSettings.data
    })
  } catch (error) {
    dispatch({
      type: Types.GET_SYSTEM_SETTINGS_FAILURE,
      payload: error
    })
  }
}

export const updateSystemSettings = systemSettings => async dispatch => {
  dispatch({
    type: Types.UPDATE_SYSTEM_SETTINGS_LOADING,
    payload: true
  })
  try {
    await update(systemSettings)
    dispatch({
      type: Types.UPDATE_SYSTEM_SETTINGS_SUCCESS,
      payload: systemSettings
    })
  } catch (error) {
    dispatch({
      type: Types.UPDATE_SYSTEM_SETTINGS_FAILURE,
      payload: error
    })
  }
}

export const exportBuyers = (dateFrom, dateTo, company) => async dispatch => {
  dispatch({
    type: Types.EXPORT_BUYERS_LOADING,
    payload: true
  })
  try {
    const response = await exportBuyersAPI(dateFrom, dateTo, company)
    dispatch({
      type: Types.EXPORT_BUYERS_SUCCESS,
      payload: response
    })
    if (response.type !== 'text/html') download(response, `buyers${moment().format('DD_MM_YYYY_hh_mm_ss')}.xlsx`)
    else toast.error('No buyers in the period informed')
  } catch (error) {
    dispatch({
      type: Types.EXPORT_BUYERS_FAILURE,
      payload: error
    })
  }
}

export const executeJavaScript = () => async dispatch => {
  dispatch({
    type: Types.EXECUTE_JAVASCRIPT_LOADING,
    payload: true
  })
  try {
    const response = await execute()
    dispatch({
      type: Types.EXECUTE_JAVASCRIPT_SUCCESS,
      payload: response
    })
    toast.success('Buyers exported sucessfully')
  } catch (error) {
    dispatch({
      type: Types.EXECUTE_JAVASCRIPT_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const exportIssue = (issueId, label) => async dispatch => {
  dispatch({
    type: Types.EXPORT_BUSINESS_ISSUE_LOADING,
    payload: true
  })
  try {
    const response = await exportIssueAPI(issueId)
    dispatch({
      type: Types.EXPORT_BUSINESS_ISSUE_SUCCESS,
      payload: response
    })
    download(response, `issue_${label}.xlsx`)
    toast.success('File starting the download...')
  } catch (error) {
    dispatch({
      type: Types.EXPORT_BUSINESS_ISSUE_FAILURE,
      payload: error
    })
  }
}
