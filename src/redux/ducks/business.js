import {create} from '../../services/api/business'

// Action Types

export const Types = {
  CREATE_BUSINESS_LOADING: 'CREATE_BUSINESS_LOADING',
  CREATE_BUSINESS_SUCCESS: 'CREATE_BUSINESS_SUCCESS',
  CREATE_BUSINESS_FAILURE: 'CREATE_BUSINESS_FAILURE'
}

// Reducer

const initialState = {
  error: null,
  isLoading: false,
  business: [],
  isCreatedBusiness: false
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case Types.CREATE_BUSINESS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }
    case Types.CREATE_BUSINESS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        isCreatedBusiness: true
      }
    case Types.CREATE_BUSINESS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        isCreatedBusiness: false
      }
    default:
      return state
  }
}

// Action Creators

export const createBusiness = business => async dispatch => {
  dispatch({
    type: Types.CREATE_BUSINESS_LOADING,
    payload: true
  })
  try {
    await create(business)
    dispatch({
      type: Types.CREATE_BUSINESS_SUCCESS
    })
  } catch (error) {
    dispatch({
      type: Types.CREATE_BUSINESS_FAILURE,
      payload: error
    })
  }
}
