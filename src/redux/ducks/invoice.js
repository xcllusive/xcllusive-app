import { toast } from 'react-toastify'
import download from '../../utils/file-download'
import {
  create,
  getAll,
  get,
  update,
  getLast,
  downloadInv,
  send
} from '../../services/api/invoice'

// Action Types

export const Types = {
  CREATE_INVOICE_LOADING: 'CREATE_INVOICE_LOADING',
  CREATE_INVOICE_SUCCESS: 'CREATE_INVOICE_SUCCESS',
  CREATE_INVOICE_FAILURE: 'CREATE_INVOICE_FAILURE',
  GET_INVOICE_LOADING: 'GET_INVOICE_LOADING',
  GET_INVOICE_SUCCESS: 'GET_INVOICE_SUCCESS',
  GET_INVOICE_FAILURE: 'GET_INVOICE_FAILURE',
  GET_INVOICES_LOADING: 'GET_INVOICES_LOADING',
  GET_INVOICES_SUCCESS: 'GET_INVOICES_SUCCESS',
  GET_INVOICES_FAILURE: 'GET_INVOICES_FAILURE',
  UPDATE_INVOICE_LOADING: 'UPDATE_INVOICE_LOADING',
  UPDATE_INVOICE_SUCCESS: 'UPDATE_INVOICE_SUCCESS',
  UPDATE_INVOICE_FAILURE: 'UPDATE_INVOICE_FAILURE',
  CLEAR_INVOICE: 'CLEAR_INVOICE',
  GET_LAST_INVOICE_LOADING: 'GET_LAST_INVOICE_LOADING',
  GET_LAST_INVOICE_SUCCESS: 'GET_LAST_INVOICE_SUCCESS',
  GET_LAST_INVOICE_FAILURE: 'GET_LAST_INVOICE_FAILURE',
  DOWNLOAD_INVOICE_LOADING: 'DOWNLOAD_INVOICE_LOADING',
  DOWNLOAD_INVOICE_SUCCESS: 'DOWNLOAD_INVOICE_SUCCESS',
  DOWNLOAD_INVOICE_FAILURE: 'DOWNLOAD_INVOICE_FAILURE',
  SEND_INVOICE_LOADING: 'SEND_INVOICE_LOADING',
  SEND_INVOICE_SUCCESS: 'SEND_INVOICE_SUCCESS',
  SEND_INVOICE_FAILURE: 'SEND_INVOICE_FAILURE'
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
    invoice: {}
  },
  getLastInvoice: {
    object: null,
    isLoading: false,
    error: null
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
  }
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case Types.GET_INVOICES_LOADING:
      return {
        ...state,
        getAll: {
          ...state.getAll,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.GET_INVOICES_SUCCESS:
      return {
        ...state,
        getAll: {
          ...state.getAll,
          isLoading: false,
          array: action.payload,
          error: null
        }
      }
    case Types.GET_INVOICES_FAILURE:
      return {
        ...state,
        getAll: {
          ...state.getAll,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.GET_INVOICE_LOADING:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: true,
          object: null,
          error: null
        }
      }
    case Types.GET_INVOICE_SUCCESS:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: false,
          object: action.payload,
          error: null
        }
      }
    case Types.GET_INVOICE_FAILURE:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.CREATE_INVOICE_LOADING:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: true,
          isCreated: false
        }
      }
    case Types.CREATE_INVOICE_SUCCESS:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: false,
          isCreated: true
        }
      }
    case Types.CREATE_INVOICE_FAILURE:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: false,
          isCreated: false,
          error: action.payload
        }
      }
    case Types.UPDATE_INVOICE_LOADING:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: action.payload,
          isUpdated: false,
          error: null
        }
      }
    case Types.UPDATE_INVOICE_SUCCESS:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: false,
          isUpdated: true,
          error: null
        }
      }
    case Types.UPDATE_INVOICE_FAILURE:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: false,
          isUpdated: false,
          error: action.payload
        }
      }
    case Types.GET_LAST_INVOICE_LOADING:
      return {
        ...state,
        getLastInvoice: {
          ...state.getLastInvoice,
          isLoading: true,
          object: null,
          error: null
        }
      }
    case Types.GET_LAST_INVOICE_SUCCESS:
      return {
        ...state,
        getLastInvoice: {
          ...state.getLastInvoice,
          isLoading: false,
          object: action.payload,
          error: null
        }
      }
    case Types.GET_LAST_INVOICE_FAILURE:
      return {
        ...state,
        getLastInvoice: {
          ...state.getLastInvoice,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.DOWNLOAD_INVOICE_LOADING:
      return {
        ...state,
        download: {
          ...state.download,
          isLoading: action.payload,
          isDownloaded: false,
          error: null
        }
      }
    case Types.DOWNLOAD_INVOICE_SUCCESS:
      return {
        ...state,
        download: {
          ...state.download,
          isLoading: false,
          isDownloaded: true
        }
      }
    case Types.DOWNLOAD_INVOICE_FAILURE:
      return {
        ...state,
        download: {
          ...state.download,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.SEND_INVOICE_LOADING:
      return {
        ...state,
        send: {
          ...state.send,
          isLoading: action.payload,
          isSent: false,
          error: null
        }
      }
    case Types.SEND_INVOICE_SUCCESS:
      return {
        ...state,
        send: {
          ...state.send,
          isLoading: false,
          isSent: true
        }
      }
    case Types.SEND_INVOICE_FAILURE:
      return {
        ...state,
        send: {
          ...state.send,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.CLEAR_INVOICE:
      return initialState
    default:
      return state
  }
}

// Action Creators
export const invoiceTemplateLoading = (value, type) => ({
  type: Types[type],
  payload: value
})

export const createInvoice = (invoice, businessId) => async dispatch => {
  dispatch({
    type: Types.CREATE_INVOICE_LOADING,
    payload: true
  })
  try {
    const response = await create(invoice, businessId)
    dispatch({
      type: Types.CREATE_INVOICE_SUCCESS
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.CREATE_INVOICE_FAILURE,
      payload: error
    })
  }
}

export const getInvoices = businessId => async dispatch => {
  dispatch({
    type: Types.GET_INVOICES_LOADING,
    payload: true
  })
  try {
    const invoice = await getAll(businessId)
    dispatch({
      type: Types.GET_INVOICES_SUCCESS,
      payload: invoice.data.rows
    })
  } catch (error) {
    dispatch({
      type: Types.GET_INVOICES_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const getInvoice = id => async dispatch => {
  dispatch({
    type: Types.GET_INVOICE_LOADING,
    payload: true
  })
  try {
    const invoice = await get(id)
    dispatch({
      type: Types.GET_INVOICE_SUCCESS,
      payload: invoice.data
    })
  } catch (error) {
    dispatch({
      type: Types.GET_INVOICE_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const updateInvoice = invoice => async dispatch => {
  dispatch({
    type: Types.UPDATE_INVOICE_LOADING,
    payload: true
  })
  try {
    const response = await update(invoice)
    dispatch({
      type: Types.UPDATE_INVOICE_SUCCESS
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.UPDATE_INVOICE_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const getLastInvoice = businessId => async dispatch => {
  dispatch({
    type: Types.GET_LAST_INVOICE_LOADING,
    payload: true
  })
  try {
    const invoice = await getLast(businessId)
    dispatch({
      type: Types.GET_LAST_INVOICE_SUCCESS,
      payload: invoice.data
    })
  } catch (error) {
    dispatch({
      type: Types.GET_LAST_INVOICE_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const downloadInvoice = invoice => async dispatch => {
  dispatch({
    type: Types.DOWNLOAD_INVOICE_LOADING,
    payload: true
  })
  try {
    const response = await downloadInv(invoice)
    dispatch({
      type: Types.DOWNLOAD_INVOICE_SUCCESS
    })
    download(response, invoice.fileName)
  } catch (error) {
    dispatch({
      type: Types.DOWNLOAD_INVOICE_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const sendInvoice = invoice => async dispatch => {
  dispatch({
    type: Types.SEND_INVOICE_LOADING,
    payload: true
  })
  try {
    const response = await send(invoice)
    dispatch({
      type: Types.SEND_INVOICE_SUCCESS
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.SEND_INVOICE_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const clearInvoice = () => async dispatch => {
  dispatch({
    type: Types.CLEAR_INVOICE
  })
}
