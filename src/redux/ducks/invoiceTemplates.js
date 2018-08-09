import { toast } from 'react-toastify'
import {
  create,
  getAll,
  get,
  update,
  getState
} from '../../services/api/invoiceTemplates'

// Action Types

export const Types = {
  CREATE_INVOICE_TEMPLATE_LOADING: 'CREATE_INVOICE_TEMPLATE_LOADING',
  CREATE_INVOICE_TEMPLATE_SUCCESS: 'CREATE_INVOICE_TEMPLATE_SUCCESS',
  CREATE_INVOICE_TEMPLATE_FAILURE: 'CREATE_INVOICE_TEMPLATE_FAILURE',
  GET_INVOICE_TEMPLATES_LOADING: 'GET_INVOICE_TEMPLATES_LOADING',
  GET_INVOICE_TEMPLATES_SUCCESS: 'GET_INVOICE_TEMPLATES_SUCCESS',
  GET_INVOICE_TEMPLATES_FAILURE: 'GET_INVOICE_TEMPLATES_FAILURE',
  GET_INVOICE_TEMPLATE_LOADING: 'GET_INVOICE_TEMPLATE_LOADING',
  GET_INVOICE_TEMPLATE_SUCCESS: 'GET_INVOICE_TEMPLATE_SUCCESS',
  GET_INVOICE_TEMPLATE_FAILURE: 'GET_INVOICE_TEMPLATE_FAILURE',
  UPDATE_INVOICE_TEMPLATES_LOADING: 'UPDATE_INVOICE_TEMPLATES_LOADING',
  UPDATE_INVOICE_TEMPLATES_SUCCESS: 'UPDATE_INVOICE_TEMPLATES_SUCCESS',
  UPDATE_INVOICE_TEMPLATES_FAILURE: 'UPDATE_INVOICE_TEMPLATES_FAILURE',
  CLEAR_INVOICE_TEMPLATES: 'CLEAR_INVOICE_TEMPLATES'
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
    templates: {}
  }
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case Types.GET_INVOICE_TEMPLATES_LOADING:
      return {
        ...state,
        getAll: {
          ...state.getAll,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.GET_INVOICE_TEMPLATES_SUCCESS:
      return {
        ...state,
        getAll: {
          ...state.getAll,
          isLoading: false,
          array: action.payload,
          error: null
        }
      }
    case Types.GET_INVOICE_TEMPLATES_FAILURE:
      return {
        ...state,
        getAll: {
          ...state.getAll,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.GET_INVOICE_TEMPLATE_LOADING:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: true,
          object: null,
          error: null
        }
      }
    case Types.GET_INVOICE_TEMPLATE_SUCCESS:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: false,
          object: action.payload,
          error: null
        }
      }
    case Types.GET_INVOICE_TEMPLATE_FAILURE:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.CREATE_INVOICE_TEMPLATE_LOADING:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: true,
          isCreated: false
        }
      }
    case Types.CREATE_INVOICE_TEMPLATE_SUCCESS:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: false,
          isCreated: true
        }
      }
    case Types.CREATE_INVOICE_TEMPLATE_FAILURE:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: false,
          isCreated: false,
          error: action.payload
        }
      }
    case Types.UPDATE_INVOICE_TEMPLATES_LOADING:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: action.payload,
          isUpdated: false,
          error: null
        }
      }
    case Types.UPDATE_INVOICE_TEMPLATES_SUCCESS:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: false,
          isUpdated: true,
          error: null
        }
      }
    case Types.UPDATE_INVOICE_TEMPLATES_FAILURE:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: false,
          isUpdated: false,
          error: action.payload
        }
      }
    case Types.PREVIEW_INVOICE_TEMPLATE_LOADING:
      return {
        ...state,
        preview: {
          ...state.preview,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.PREVIEW_INVOICE_TEMPLATE_SUCCESS:
      return {
        ...state,
        preview: {
          ...state.preview,
          isLoading: false,
          body: action.payload,
          error: null
        }
      }
    case Types.PREVIEW_INVOICE_TEMPLATE_FAILURE:
      return {
        ...state,
        preview: {
          ...state.preview,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.CLEAR_INVOICE_TEMPLATES:
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

export const createInvoiceTemplate = template => async dispatch => {
  dispatch({
    type: Types.CREATE_INVOICE_TEMPLATE_LOADING,
    payload: true
  })
  try {
    await create(template)
    dispatch({
      type: Types.CREATE_INVOICE_TEMPLATE_SUCCESS
    })
  } catch (error) {
    dispatch({
      type: Types.CREATE_INVOICE_TEMPLATE_FAILURE,
      payload: error
    })
  }
}

export const getInvoiceTemplates = (state = false) => async dispatch => {
  dispatch({
    type: Types.GET_INVOICE_TEMPLATES_LOADING,
    payload: true
  })
  try {
    const invoiceTemplate = await getAll(state)
    dispatch({
      type: Types.GET_INVOICE_TEMPLATES_SUCCESS,
      payload: invoiceTemplate.data
    })
  } catch (error) {
    dispatch({
      type: Types.GET_INVOICE_TEMPLATES_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const getInvoiceTemplate = id => async dispatch => {
  dispatch({
    type: Types.GET_INVOICE_TEMPLATE_LOADING,
    payload: true
  })
  try {
    const invoiceTemplate = await get(id)
    dispatch({
      type: Types.GET_INVOICE_TEMPLATE_SUCCESS,
      payload: invoiceTemplate.data
    })
  } catch (error) {
    dispatch({
      type: Types.GET_INVOICE_TEMPLATE_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const getInvoiceTemplateState = state => async dispatch => {
  dispatch({
    type: Types.GET_INVOICE_TEMPLATE_LOADING,
    payload: true
  })
  try {
    const invoiceTemplate = await getState(state)
    dispatch({
      type: Types.GET_INVOICE_TEMPLATE_SUCCESS,
      payload: invoiceTemplate.data[0]
    })
  } catch (error) {
    dispatch({
      type: Types.GET_INVOICE_TEMPLATE_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const updateTemplates = template => async dispatch => {
  dispatch({
    type: Types.UPDATE_INVOICE_TEMPLATES_LOADING,
    payload: true
  })
  try {
    const response = await update(template)
    dispatch({
      type: Types.UPDATE_INVOICE_TEMPLATES_SUCCESS
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.UPDATE_INVOICE_TEMPLATES_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const clearInvoiceTemplates = () => async dispatch => {
  dispatch({
    type: Types.CLEAR_INVOICE_TEMPLATES
  })
}
