import { toast } from 'react-toastify'
import download from '../../utils/file-download'
import { get, update, send, downloadAgree, getEmailTemplate, sendAgreeInvo, save } from '../../services/api/agreement'

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
  DOWNLOAD_AGREEMENT_LOADING: 'DOWNLOAD_AGREEMENT_LOADING',
  DOWNLOAD_AGREEMENT_SUCCESS: 'DOWNLOAD_AGREEMENT_SUCCESS',
  DOWNLOAD_AGREEMENT_FAILURE: 'DOWNLOAD_AGREEMENT_FAILURE',
  GET_EMAIL_TEMPLATE_AGREEMENT_LOADING: 'GET_EMAIL_TEMPLATE_AGREEMENT_LOADING',
  GET_EMAIL_TEMPLATE_AGREEMENT_SUCCESS: 'GET_EMAIL_TEMPLATE_AGREEMENT_SUCCESS',
  GET_EMAIL_TEMPLATE_AGREEMENT_FAILURE: 'GET_EMAIL_TEMPLATE_AGREEMENT_FAILURE',
  SEND_AGREEMENT_INVOICE_LOADING: 'SEND_AGREEMENT_INVOICE_LOADING',
  SEND_AGREEMENT_INVOICE_SUCCESS: 'SEND_AGREEMENT_INVOICE_SUCCESS',
  SEND_AGREEMENT_INVOICE_FAILURE: 'SEND_AGREEMENT_INVOICE_FAILURE',
  SAVE_AGREEMENT_LOADING: 'SAVE_AGREEMENT_LOADING',
  SAVE_AGREEMENT_SUCCESS: 'SAVE_AGREEMENT_SUCCESS',
  SAVE_AGREEMENT_FAILURE: 'SAVE_AGREEMENT_FAILURE',
  CLEAR_AGREEMENT: 'CLEAR_AGREEMENT'
}

// Reducer

const initialState = {
  get: {
    object: null,
    objectProperty: null,
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
  download: {
    isLoading: false,
    isDownloaded: false,
    error: null
  },
  getEmailTemplate: {
    object: null,
    isLoading: false,
    error: null
  },
  sendAgreeInvo: {
    isLoading: false,
    isSent: false,
    error: null
  },
  save: {
    isLoading: false,
    isSaved: false,
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
          object: action.payload.data,
          objectProperty: action.payload.propertyAgreement,
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
    case Types.DOWNLOAD_AGREEMENT_LOADING:
      return {
        ...state,
        download: {
          ...state.download,
          isLoading: action.payload,
          isDownloaded: false,
          error: null
        }
      }
    case Types.DOWNLOAD_AGREEMENT_SUCCESS:
      return {
        ...state,
        download: {
          ...state.download,
          isLoading: false,
          isDownloaded: true
        }
      }
    case Types.DOWNLOAD_AGREEMENT_FAILURE:
      return {
        ...state,
        download: {
          ...state.download,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.GET_EMAIL_TEMPLATE_AGREEMENT_LOADING:
      return {
        ...state,
        getEmailTemplate: {
          ...state.getEmailTemplate,
          isLoading: true,
          object: null,
          error: null
        }
      }
    case Types.GET_EMAIL_TEMPLATE_AGREEMENT_SUCCESS:
      return {
        ...state,
        getEmailTemplate: {
          ...state.getEmailTemplate,
          isLoading: false,
          object: action.payload,
          error: null
        }
      }
    case Types.GET_EMAIL_TEMPLATE_AGREEMENT_FAILURE:
      return {
        ...state,
        getEmailTemplate: {
          ...state.getEmailTemplate,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.SEND_AGREEMENT_INVOICE_LOADING:
      return {
        ...state,
        sendAgreeInvo: {
          ...state.sendAgreeInvo,
          isLoading: action.payload,
          isSent: false,
          error: null
        }
      }
    case Types.SEND_AGREEMENT_INVOICE_SUCCESS:
      return {
        ...state,
        sendAgreeInvo: {
          ...state.sendAgreeInvo,
          isLoading: false,
          isSent: true
        }
      }
    case Types.SEND_AGREEMENT_INVOICE_FAILURE:
      return {
        ...state,
        sendAgreeInvo: {
          ...state.sendAgreeInvo,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.SAVE_AGREEMENT_LOADING:
      return {
        ...state,
        save: {
          ...state.save,
          isLoading: action.payload,
          isSaved: false,
          error: null
        }
      }
    case Types.SAVE_AGREEMENT_SUCCESS:
      return {
        ...state,
        save: {
          ...state.save,
          isLoading: false,
          isSaved: true
        }
      }
    case Types.SAVE_AGREEMENT_FAILURE:
      return {
        ...state,
        save: {
          ...state.save,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.CLEAR_AGREEMENT:
      return initialState
    default:
      return state
  }
}

// Action Creators
export const agreementBodyLoading = (value, type) => ({
  type: Types[type],
  payload: value
})

export const clearAgreement = () => async dispatch => {
  dispatch({
    type: Types.CLEAR_AGREEMENT
  })
}

export const getAgreementBody = businessId => async dispatch => {
  dispatch({
    type: Types.GET_AGREEMENT_BODY_LOADING,
    payload: true
  })
  try {
    const agreementTemplate = await get(businessId)
    dispatch({
      type: Types.GET_AGREEMENT_BODY_SUCCESS,
      payload: agreementTemplate
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

export const saveAgreement = agreement => async dispatch => {
  dispatch({
    type: Types.SAVE_AGREEMENT_LOADING,
    payload: true
  })
  try {
    const response = await save(agreement)
    dispatch({
      type: Types.SAVE_AGREEMENT_SUCCESS
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.SAVE_AGREEMENT_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const downloadAgreement = agreement => async dispatch => {
  dispatch({
    type: Types.DOWNLOAD_AGREEMENT_LOADING,
    payload: true
  })
  try {
    const response = await downloadAgree(agreement)
    dispatch({
      type: Types.DOWNLOAD_AGREEMENT_SUCCESS
    })
    download(response, agreement.fileName)
  } catch (error) {
    dispatch({
      type: Types.DOWNLOAD_AGREEMENT_FAILURE,
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

export const getEmailTemplateAgreement = (idAgreement, idBusiness) => async dispatch => {
  dispatch({
    type: Types.GET_EMAIL_TEMPLATE_AGREEMENT_LOADING,
    payload: true
  })
  try {
    const agreementTemplate = await getEmailTemplate(idAgreement, idBusiness)
    dispatch({
      type: Types.GET_EMAIL_TEMPLATE_AGREEMENT_SUCCESS,
      payload: agreementTemplate.data
    })
  } catch (error) {
    dispatch({
      type: Types.GET_EMAIL_TEMPLATE_AGREEMENT_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const sendAgreementInvoice = object => async dispatch => {
  dispatch({
    type: Types.SEND_AGREEMENT_INVOICE_LOADING,
    payload: true
  })
  try {
    const response = await sendAgreeInvo(object)
    dispatch({
      type: Types.SEND_AGREEMENT_INVOICE_SUCCESS
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.SEND_AGREEMENT_INVOICE_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}
