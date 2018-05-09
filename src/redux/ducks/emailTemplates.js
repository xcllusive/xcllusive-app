import { toast } from 'react-toastify'
import { getAll, get, update } from '../../services/api/emailTemplates'

// Action Types

export const Types = {
  GET_EMAIL_TEMPLATES_LOADING: 'GET_EMAIL_TEMPLATES_LOADING',
  GET_EMAIL_TEMPLATES_SUCCESS: 'GET_EMAIL_TEMPLATES_SUCCESS',
  GET_EMAIL_TEMPLATES_FAILURE: 'GET_EMAIL_TEMPLATES_FAILURE',
  GET_EMAIL_TEMPLATE_LOADING: 'GET_EMAIL_TEMPLATE_LOADING',
  GET_EMAIL_TEMPLATE_SUCCESS: 'GET_EMAIL_TEMPLATE_SUCCESS',
  GET_EMAIL_TEMPLATE_FAILURE: 'GET_EMAIL_TEMPLATE_FAILURE',
  UPDATE_EMAIL_TEMPLATES_LOADING: 'UPDATE_EMAIL_TEMPLATES_LOADING',
  UPDATE_EMAIL_TEMPLATES_SUCCESS: 'UPDATE_EMAIL_TEMPLATES_SUCCESS',
  UPDATE_EMAIL_TEMPLATES_FAILURE: 'UPDATE_EMAIL_TEMPLATES_FAILURE',
  CLEAR_EMAIL_TEMPLATES: 'CLEAR_EMAIL_TEMPLATES'
}

// Reducer

const initialState = {
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
    case Types.GET_EMAIL_TEMPLATES_LOADING:
      return {
        ...state,
        getAll: {
          ...state.getAll,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.GET_EMAIL_TEMPLATES_SUCCESS:
      return {
        ...state,
        getAll: {
          ...state.getAll,
          isLoading: false,
          array: action.payload,
          error: null
        }
      }
    case Types.GET_EMAIL_TEMPLATES_FAILURE:
      return {
        ...state,
        getAll: {
          ...state.getAll,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.GET_EMAIL_TEMPLATE_LOADING:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: action.payload,
          object: null,
          error: null
        }
      }
    case Types.GET_EMAIL_TEMPLATE_SUCCESS:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: false,
          object: action.payload,
          error: null
        }
      }
    case Types.GET_EMAIL_TEMPLATE_FAILURE:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.UPDATE_EMAIL_TEMPLATES_LOADING:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: action.payload,
          isUpdated: false,
          error: null
        }
      }
    case Types.UPDATE_EMAIL_TEMPLATES_SUCCESS:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: false,
          isUpdated: true,
          error: null
        }
      }
    case Types.UPDATE_EMAIL_TEMPLATES_FAILURE:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: false,
          isUpdated: false,
          error: action.payload
        }
      }
    case Types.CLEAR_EMAIL_TEMPLATES:
      return initialState
    default:
      return state
  }
}

// Action Creators
export const emailTemplateLoading = (value, type) => ({
  type: Types[type],
  payload: value
})

export const getEmailTemplates = () => async dispatch => {
  dispatch({
    type: Types.GET_EMAIL_TEMPLATES_LOADING,
    payload: true
  })
  try {
    const emailTemplate = await getAll()
    dispatch({
      type: Types.GET_EMAIL_TEMPLATES_SUCCESS,
      payload: emailTemplate.data
    })
  } catch (error) {
    dispatch({
      type: Types.GET_EMAIL_TEMPLATES_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const getEmailTemplate = id => async dispatch => {
  dispatch({
    type: Types.GET_EMAIL_TEMPLATE_LOADING,
    payload: true
  })
  try {
    const emailTemplate = await get(id)
    dispatch({
      type: Types.GET_EMAIL_TEMPLATE_SUCCESS,
      payload: emailTemplate.data
    })
  } catch (error) {
    dispatch({
      type: Types.GET_EMAIL_TEMPLATE_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const updateTemplates = template => async dispatch => {
  dispatch({
    type: Types.UPDATE_EMAIL_TEMPLATES_LOADING,
    payload: true
  })
  try {
    const response = await update(template)
    console.log(response)
    dispatch({
      type: Types.UPDATE_EMAIL_TEMPLATES_SUCCESS
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.UPDATE_EMAIL_TEMPLATES_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const clearEmailTemplates = () => async dispatch => {
  dispatch({
    type: Types.CLEAR_EMAIL_TEMPLATES
  })
}
