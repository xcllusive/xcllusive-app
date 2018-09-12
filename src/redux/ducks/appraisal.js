import { toast } from 'react-toastify'
import download from '../../utils/file-download'
import {
  create,
  getAll,
  get,
  update,
  downloadAppr,
  send,
  remove
} from '../../services/api/appraisal'

// Action Types

export const Types = {
  CREATE_APPRAISAL_LOADING: 'CREATE_APPRAISAL_LOADING',
  CREATE_APPRAISAL_SUCCESS: 'CREATE_APPRAISAL_SUCCESS',
  CREATE_APPRAISAL_FAILURE: 'CREATE_APPRAISAL_FAILURE',
  GET_APPRAISAL_LOADING: 'GET_APPRAISAL_LOADING',
  GET_APPRAISAL_SUCCESS: 'GET_APPRAISAL_SUCCESS',
  GET_APPRAISAL_FAILURE: 'GET_APPRAISAL_FAILURE',
  GET_APPRAISALS_LOADING: 'GET_APPRAISALS_LOADING',
  GET_APPRAISALS_SUCCESS: 'GET_APPRAISALS_SUCCESS',
  GET_APPRAISALS_FAILURE: 'GET_APPRAISALS_FAILURE',
  UPDATE_APPRAISAL_LOADING: 'UPDATE_APPRAISAL_LOADING',
  UPDATE_APPRAISAL_SUCCESS: 'UPDATE_APPRAISAL_SUCCESS',
  UPDATE_APPRAISAL_FAILURE: 'UPDATE_APPRAISAL_FAILURE',
  CLEAR_APPRAISAL: 'CLEAR_APPRAISAL',
  DOWNLOAD_APPRAISAL_LOADING: 'DOWNLOAD_APPRAISAL_LOADING',
  DOWNLOAD_APPRAISAL_SUCCESS: 'DOWNLOAD_APPRAISAL_SUCCESS',
  DOWNLOAD_APPRAISAL_FAILURE: 'DOWNLOAD_APPRAISAL_FAILURE',
  SEND_APPRAISAL_LOADING: 'SEND_APPRAISAL_LOADING',
  SEND_APPRAISAL_SUCCESS: 'SEND_APPRAISAL_SUCCESS',
  SEND_APPRAISAL_FAILURE: 'SEND_APPRAISAL_FAILURE',
  REMOVE_APPRAISAL_LOADING: 'REMOVE_APPRAISAL_LOADING',
  REMOVE_APPRAISAL_SUCCESS: 'REMOVE_APPRAISAL_SUCCESS',
  REMOVE_APPRAISAL_FAILURE: 'REMOVE_APPRAISAL_FAILURE'
}

// Reducer

const initialState = {
  create: {
    isLoading: false,
    isCreated: false,
    error: null
  },
  getAll: {
    array: [],
    isLoading: false,
    error: null
  },
  get: {
    object: null,
    isLoading: false,
    error: null
  },
  update: {
    isLoading: false,
    isUpdated: false,
    error: null,
    appraisal: {}
  },
  download: {
    isLoading: false,
    isDownloaded: false,
    error: null
  },
  send: {
    isLoading: false,
    isSent: false,
    error: null
  },
  delete: {
    isLoading: false,
    isDeleted: false,
    error: null
  }
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case Types.GET_APPRAISALS_LOADING:
      return {
        ...state,
        getAll: {
          ...state.getAll,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.GET_APPRAISALS_SUCCESS:
      return {
        ...state,
        getAll: {
          ...state.getAll,
          isLoading: false,
          array: action.payload,
          error: null
        }
      }
    case Types.GET_APPRAISALS_FAILURE:
      return {
        ...state,
        getAll: {
          ...state.getAll,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.GET_APPRAISAL_LOADING:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: true,
          object: null,
          error: null
        }
      }
    case Types.GET_APPRAISAL_SUCCESS:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: false,
          object: action.payload,
          error: null
        }
      }
    case Types.GET_APPRAISAL_FAILURE:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.CREATE_APPRAISAL_LOADING:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: true,
          isCreated: false
        }
      }
    case Types.CREATE_APPRAISAL_SUCCESS:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: false,
          isCreated: true
        }
      }
    case Types.CREATE_APPRAISAL_FAILURE:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: false,
          isCreated: false,
          error: action.payload
        }
      }
    case Types.UPDATE_APPRAISAL_LOADING:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: action.payload,
          isUpdated: false,
          error: null
        }
      }
    case Types.UPDATE_APPRAISAL_SUCCESS:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: false,
          isUpdated: true,
          error: null
        }
      }
    case Types.UPDATE_APPRAISAL_FAILURE:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: false,
          isUpdated: false,
          error: action.payload
        }
      }
    case Types.DOWNLOAD_APPRAISAL_LOADING:
      return {
        ...state,
        download: {
          ...state.download,
          isLoading: action.payload,
          isDownloaded: false,
          error: null
        }
      }
    case Types.DOWNLOAD_APPRAISAL_SUCCESS:
      return {
        ...state,
        download: {
          ...state.download,
          isLoading: false,
          isDownloaded: true
        }
      }
    case Types.DOWNLOAD_APPRAISAL_FAILURE:
      return {
        ...state,
        download: {
          ...state.download,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.SEND_APPRAISAL_LOADING:
      return {
        ...state,
        send: {
          ...state.send,
          isLoading: action.payload,
          isSent: false,
          error: null
        }
      }
    case Types.SEND_APPRAISAL_SUCCESS:
      return {
        ...state,
        send: {
          ...state.send,
          isLoading: false,
          isSent: true
        }
      }
    case Types.SEND_APPRAISAL_FAILURE:
      return {
        ...state,
        send: {
          ...state.send,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.REMOVE_APPRAISAL_LOADING:
      return {
        ...state,
        delete: {
          ...state.delete,
          isLoading: action.payload,
          isDeleted: false,
          error: null
        }
      }
    case Types.REMOVE_APPRAISAL_SUCCESS:
      return {
        ...state,
        delete: {
          ...state.delete,
          isLoading: false,
          isDeleted: true
        }
      }
    case Types.REMOVE_APPRAISAL_FAILURE:
      return {
        ...state,
        delete: {
          ...state.delete,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.CLEAR_APPRAISAL:
      return initialState
    default:
      return state
  }
}

// Action Creators
export const appraisalTemplateLoading = (value, type) => ({
  type: Types[type],
  payload: value
})

export const createAppraisal = businessId => async dispatch => {
  dispatch({
    type: Types.CREATE_APPRAISAL_LOADING,
    payload: true
  })
  try {
    const response = await create(businessId)
    dispatch({
      type: Types.CREATE_APPRAISAL_SUCCESS
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.CREATE_APPRAISAL_FAILURE,
      payload: error
    })
  }
}

export const getAppraisals = businessId => async dispatch => {
  dispatch({
    type: Types.GET_APPRAISALS_LOADING,
    payload: true
  })
  try {
    const appraisal = await getAll(businessId)
    dispatch({
      type: Types.GET_APPRAISALS_SUCCESS,
      payload: appraisal.data.rows
    })
  } catch (error) {
    dispatch({
      type: Types.GET_APPRAISALS_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const getAppraisal = id => async dispatch => {
  dispatch({
    type: Types.GET_APPRAISAL_LOADING,
    payload: true
  })
  try {
    const appraisal = await get(id)
    dispatch({
      type: Types.GET_APPRAISAL_SUCCESS,
      payload: appraisal.data
    })
  } catch (error) {
    dispatch({
      type: Types.GET_APPRAISAL_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const updateAppraisal = appraisal => async dispatch => {
  dispatch({
    type: Types.UPDATE_APPRAISAL_LOADING,
    payload: true
  })
  try {
    const response = await update(appraisal)
    dispatch({
      type: Types.UPDATE_APPRAISAL_SUCCESS
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.UPDATE_APPRAISAL_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const downloadAppraisal = appraisal => async dispatch => {
  dispatch({
    type: Types.DOWNLOAD_APPRAISAL_LOADING,
    payload: true
  })
  try {
    const response = await downloadAppr(appraisal)
    dispatch({
      type: Types.DOWNLOAD_APPRAISAL_SUCCESS
    })
    download(response, appraisal.fileName)
  } catch (error) {
    dispatch({
      type: Types.DOWNLOAD_APPRAISAL_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const sendAppraisal = appraisal => async dispatch => {
  dispatch({
    type: Types.SEND_APPRAISAL_LOADING,
    payload: true
  })
  try {
    const response = await send(appraisal)
    dispatch({
      type: Types.SEND_APPRAISAL_SUCCESS
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.SEND_APPRAISAL_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const removeAppraisal = appraisalId => async dispatch => {
  dispatch({
    type: Types.REMOVE_APPRAISAL_LOADING,
    payload: true
  })
  try {
    const response = await remove(appraisalId)
    dispatch({
      type: Types.REMOVE_APPRAISAL_SUCCESS
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.REMOVE_APPRAISAL_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const clearAppraisal = () => async dispatch => {
  dispatch({
    type: Types.CLEAR_APPRAISAL
  })
}
