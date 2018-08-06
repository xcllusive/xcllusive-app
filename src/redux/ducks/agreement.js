import { toast } from 'react-toastify'
import { get, update, send, generate } from '../../services/api/agreement'

// Action Types

export const Types = {
  GET_AGREEMENT_BODY_LOADING: 'GET_AGREEMENT_BODY_LOADING',
  GET_AGREEMENT_BODY_SUCCESS: 'GET_AGREEMENT_BODY_SUCCESS',
  GET_AGREEMENT_BODY_FAILURE: 'GET_AGREEMENT_BODY_FAILURE',
  UPDATE_AGREEMENT_BODY_LOADING: 'UPDATE_AGREEMENT_BODY_LOADING',
  UPDATE_AGREEMENT_BODY_SUCCESS: 'UPDATE_AGREEMENT_BODY_SUCCESS',
  UPDATE_AGREEMENT_BODY_FAILURE: 'UPDATE_AGREEMENT_BODY_FAILURE',
  SEND_AGREEMENT_LOADING: 'SEND_AGREEMENT_LOADING',
  SEND_AGREEMENT_SUCCESS: 'SEND_AGREEMENT_SUCCESS',
  SEND_AGREEMENT_FAILURE: 'SEND_AGREEMENT_FAILURE',
  GENERATE_AGREEMENT_LOADING: 'GENERATE_AGREEMENT_LOADING',
  GENERATE_AGREEMENT_SUCCESS: 'GENERATE_AGREEMENT_SUCCESS',
  GENERATE_AGREEMENT_FAILURE: 'GENERATE_AGREEMENT_FAILURE'
}

// Reducer

const initialState = {
  get: {
    object: null,
    isLoading: false,
    error: null
  },
  update: {
    isLoading: false,
    isUpdated: false,
    error: null
  },
  send: {
    isLoading: false,
    isSent: false,
    error: null
  },
  generate: {
    isLoading: false,
    isGenerated: false,
    error: null
  }
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case Types.GET_AGREEMENT_BODY_LOADING:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: true,
          object: null,
          error: null
        }
      }
    case Types.GET_AGREEMENT_BODY_SUCCESS:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: false,
          object: action.payload,
          error: null
        }
      }
    case Types.GET_AGREEMENT_BODY_FAILURE:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.UPDATE_AGREEMENT_BODY_LOADING:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: action.payload,
          isUpdated: false,
          error: null
        }
      }
    case Types.UPDATE_AGREEMENT_BODY_SUCCESS:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: false,
          isUpdated: true,
          error: null
        }
      }
    case Types.UPDATE_AGREEMENT_BODY_FAILURE:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: false,
          isUpdated: false,
          error: action.payload
        }
      }
    case Types.SEND_AGREEMENT_LOADING:
      return {
        ...state,
        send: {
          ...state.send,
          isLoading: action.payload,
          isSent: false,
          error: null
        }
      }
    case Types.SEND_AGREEMENT_SUCCESS:
      return {
        ...state,
        send: {
          ...state.send,
          isLoading: false,
          isSent: true
        }
      }
    case Types.SEND_AGREEMENT_FAILURE:
      return {
        ...state,
        send: {
          ...state.send,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.GENERATE_AGREEMENT_LOADING:
      return {
        ...state,
        generate: {
          ...state.generate,
          isLoading: action.payload,
          isGenerated: false,
          error: null
        }
      }
    case Types.GENERATE_AGREEMENT_SUCCESS:
      return {
        ...state,
        generate: {
          ...state.generate,
          isLoading: false,
          isGenerated: true
        }
      }
    case Types.GENERATE_AGREEMENT_FAILURE:
      return {
        ...state,
        generate: {
          ...state.generate,
          isLoading: false,
          error: action.payload
        }
      }
    default:
      return state
  }
}

// Action Creators
export const agreementBodyLoading = (value, type) => ({
  type: Types[type],
  payload: value
})

export const getAgreementBody = id => async dispatch => {
  dispatch({
    type: Types.GET_AGREEMENT_BODY_LOADING,
    payload: true
  })
  try {
    const agreementTemplate = await get(id)
    dispatch({
      type: Types.GET_AGREEMENT_BODY_SUCCESS,
      payload: agreementTemplate.data
    })
  } catch (error) {
    dispatch({
      type: Types.GET_AGREEMENT_BODY_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const updateAgreementBody = body => async dispatch => {
  dispatch({
    type: Types.UPDATE_AGREEMENT_BODY_LOADING,
    payload: true
  })
  try {
    const response = await update(body)
    dispatch({
      type: Types.UPDATE_AGREEMENT_BODY_SUCCESS
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.UPDATE_AGREEMENT_BODY_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const generateAgreement = agreement => async dispatch => {
  dispatch({
    type: Types.GENERATE_AGREEMENT_LOADING,
    payload: true
  })
  try {
    const response = await generate(agreement)
    window.open(response, '_blank')
    dispatch({
      type: Types.GENERATE_AGREEMENT_SUCCESS
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.GENERATE_AGREEMENT_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const sendAgreement = agreement => async dispatch => {
  dispatch({
    type: Types.SEND_AGREEMENT_LOADING,
    payload: true
  })
  try {
    const response = await send(agreement)
    dispatch({
      type: Types.SEND_AGREEMENT_SUCCESS
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.SEND_AGREEMENT_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}
