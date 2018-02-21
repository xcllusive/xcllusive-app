import {create, getAll} from '../../services/api/business'

// Action Types

export const Types = {
  CREATE_BUSINESS_LOADING: 'CREATE_BUSINESS_LOADING',
  CREATE_BUSINESS_SUCCESS: 'CREATE_BUSINESS_SUCCESS',
  CREATE_BUSINESS_FAILURE: 'CREATE_BUSINESS_FAILURE',
  GET_BUSINESS_LOADING: 'GET_BUSINESS_LOADING',
  GET_BUSINESS_SUCCESS: 'GET_BUSINESS_SUCCESS',
  GET_BUSINESS_FAILURE: 'GET_BUSINESS_FAILURE'
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
    case Types.GET_BUSINESS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }
    case Types.GET_BUSINESS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        business: action.payload,
        error: null
      }
    case Types.GET_BUSINESS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    default:
      return state
  }
}

// Action Creators
export const businessLoading = (value, type) => {
  return {
    type: Types[type],
    payload: value
  }
}

const businessResponse = array => {
  return {
    type: Types.GET_BUSINESS_SUCCESS,
    payload: array
  }
}

const businessError = value => {
  return {
    type: Types.GET_BUSINESS_FAILURE,
    payload: value
  }
}

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

export const getBusiness = (search = false) => async dispatch => {
  dispatch(businessLoading(true, 'GET_BUSINESS_LOADING'))
  try {
    const business = await getAll(search)
    dispatch(businessResponse(business))
  } catch (error) {
    dispatch(businessError(error))
  }
}
