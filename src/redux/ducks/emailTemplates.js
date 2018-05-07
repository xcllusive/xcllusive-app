import { getAll } from '../../services/api/emailTemplates'
import { toast } from 'react-toastify'

// Action Types

export const Types = {
  GET_EMAIL_TEMPLATES_LOADING: 'GET_EMAIL_TEMPLATES_LOADING',
  GET_EMAIL_TEMPLATES_SUCCESS: 'GET_EMAIL_TEMPLATES_SUCCESS',
  GET_EMAIL_TEMPLATES_FAILURE: 'GET_EMAIL_TEMPLATES_FAILURE'
}

// Reducer

const initialState = {
  getAll: {
    array: [],
    isLoading: false,
    error: null
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
