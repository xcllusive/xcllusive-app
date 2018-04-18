import { toast } from 'react-toastify'

import { enquiry } from '../../services/api/clientManager'

export const Types = {
  ENQUIRY_BUSINESS_LOADING: 'ENQUIRY_BUSINESS_LOADING',
  ENQUIRY_BUSINESS_SUCCESS: 'ENQUIRY_BUSINESS_SUCCESS',
  ENQUIRY_BUSINESS_FAILURE: 'ENQUIRY_BUSINESS_FAILURE'
}

// Reducer

const initialState = {
  enquired: {
    isLoading: false,
    isEnquired: false,
    error: null
  }
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case Types.ENQUIRY_BUSINESS_LOADING:
      return {
        ...state,
        enquired: {
          ...state.enquired,
          isLoading: action.payload,
          isEnquired: false,
          error: null
        }
      }
    case Types.ENQUIRY_BUSINESS_SUCCESS:
      return {
        ...state,
        enquired: {
          ...state.enquired,
          isLoading: false,
          isEnquired: true
        }
      }
    case Types.ENQUIRY_BUSINESS_FAILURE:
      return {
        ...state,
        enquired: {
          ...state.enquired,
          isLoading: false,
          error: action.payload
        }
      }
    default:
      return state
  }
}

export const enquiryBusiness = enquiryBusiness => async dispatch => {
  dispatch({
    type: Types.ENQUIRY_BUSINESS_LOADING,
    payload: true
  })
  try {
    const response = await enquiry(enquiryBusiness)
    dispatch({
      type: Types.ENQUIRY_BUSINESS_SUCCESS
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.ENQUIRY_BUSINESS_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}
