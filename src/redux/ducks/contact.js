import { toast } from 'react-toastify'
import { sendSmsUsers as sendSmsUsersAPI } from '../../services/api/contact'

// Action Types

export const Types = {
  SEND_SMS_USERS_LOADING: 'SEND_SMS_USERS_LOADING',
  SEND_SMS_USERS_SUCCESS: 'SEND_SMS_USERS_SUCCESS',
  SEND_SMS_USERS_FAILURE: 'SEND_SMS_USERS_FAILURE'
}

// Reducer

const initialState = {
  sendSms: {
    isLoading: false,
    isSent: false,
    error: null
  }
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case Types.SEND_SMS_USERS_LOADING:
      return {
        ...state,
        sendSms: {
          ...state.sendSms,
          isLoading: action.payload,
          isSent: false,
          error: null
        }
      }
    case Types.SEND_SMS_USERS_SUCCESS:
      return {
        ...state,
        sendSms: {
          ...state.sendSms,
          isLoading: false,
          isSent: true
        }
      }
    case Types.SEND_SMS_USERS_FAILURE:
      return {
        ...state,
        sendSms: {
          ...state.sendSms,
          isLoading: false,
          error: action.payload
        }
      }
    default:
      return state
  }
}

// Action Creators

export const sendSmsUsers = (users, message) => async dispatch => {
  dispatch({
    type: Types.SEND_SMS_USERS_LOADING,
    payload: true
  })
  try {
    const response = await sendSmsUsersAPI(users, message)
    dispatch({
      type: Types.SEND_SMS_USERS_SUCCESS
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.SEND_SMS_USERS_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}
