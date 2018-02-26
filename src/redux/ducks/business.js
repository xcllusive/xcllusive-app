import { get, getAll, create, update } from '../../services/api/business'

// Action Types

export const Types = {
  CREATE_BUSINESS_LOADING: 'CREATE_BUSINESS_LOADING',
  CREATE_BUSINESS_SUCCESS: 'CREATE_BUSINESS_SUCCESS',
  CREATE_BUSINESS_FAILURE: 'CREATE_BUSINESS_FAILURE',
  UPDATE_BUSINESS_LOADING: 'UPDATE_BUSINESS_LOADING',
  UPDATE_BUSINESS_SUCCESS: 'UPDATE_BUSINESS_LOADING',
  UPDATE_BUSINESS_FAILURE: 'UPDATE_BUSINESS_LOADING',
  GET_BUSINESS_LOADING: 'GET_BUSINESS_LOADING',
  GET_BUSINESS_SUCCESS: 'GET_BUSINESS_SUCCESS',
  GET_BUSINESS_FAILURE: 'GET_BUSINESS_FAILURE',
  GET_BUSINESSES_LOADING: 'GET_BUSINESSES_LOADING',
  GET_BUSINESSES_SUCCESS: 'GET_BUSINESSES_SUCCESS',
  GET_BUSINESSES_FAILURE: 'GET_BUSINESSES_FAILURE'
}

// Reducer

const initialState = {
  error: null,
  business: {},
  businesses: [],
  isCreatedBusiness: false,
  isLoadingGetBusiness: false,
  isLoadingGetBusinesses: false,
  isLoadingCreateBusiness: false,
  update: {
    isLoading: false,
    isUpdated: false,
    error: null
  }
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case Types.CREATE_BUSINESS_LOADING:
      return {
        ...state,
        isLoadingCreateBusiness: action.payload
      }
    case Types.CREATE_BUSINESS_SUCCESS:
      return {
        ...state,
        isLoadingCreateBusiness: false,
        error: false,
        isCreatedBusiness: true
      }
    case Types.CREATE_BUSINESS_FAILURE:
      return {
        ...state,
        isLoadingCreateBusiness: false,
        error: action.payload,
        isCreatedBusiness: false
      }
    case Types.GET_BUSINESSES_LOADING:
      return {
        ...state,
        isLoadingGetBusinesses: action.payload
      }
    case Types.GET_BUSINESSES_SUCCESS:
      return {
        ...state,
        isLoadingGetBusinesses: false,
        businesses: action.payload,
        error: null
      }
    case Types.GET_BUSINESSES_FAILURE:
      return {
        ...state,
        isLoadingGetBusinesses: false,
        error: action.payload
      }
    case Types.GET_BUSINESS_LOADING:
      return {
        ...state,
        isLoadingGetBusiness: action.payload
      }
    case Types.GET_BUSINESS_SUCCESS:
      return {
        ...state,
        business: action.payload
      }
    case Types.GET_BUSINESS_FAILURE:
      return {
        ...state,
        error: action.payload
      }
    case Types.UPDATE_BUSINESS_LOADING:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: action.payload
        }
      }
    case Types.UPDATE_BUSINESS_SUCCESS:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: false,
          isUpdated: true,
          error: null
        }
      }
    case Types.UPDATE_BUSINESS_FAILURE:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: false,
          isUpdated: false,
          error: action.payload
        }
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

export const getBusiness = id => async dispatch => {
  dispatch({
    type: Types.GET_BUSINESS_LOADING,
    payload: true
  })
  try {
    const business = await get(id)
    dispatch({
      type: Types.GET_BUSINESS_SUCCESS,
      payload: business
    })
  } catch (error) {
    dispatch({
      type: Types.GET_BUSINESS_FAILURE,
      payload: error
    })
  }
}

export const getBusinesses = (search = false) => async dispatch => {
  dispatch({
    type: Types.GET_BUSINESSES_LOADING,
    payload: true
  })
  try {
    const businesses = await getAll(search)
    dispatch({
      type: Types.GET_BUSINESSES_SUCCESS,
      payload: businesses
    })
  } catch (error) {
    dispatch({
      type: Types.GET_BUSINESSES_FAILURE,
      payload: error
    })
  }
}

export const updateBusiness = business => async dispatch => {
  dispatch({
    type: Types.UPDATE_BUSINESSES_LOADING,
    payload: true
  })
  try {
    await update(business)
    dispatch({
      type: Types.UPDATE_BUSINESSES_SUCCESS
    })
  } catch (error) {
    dispatch({
      type: Types.UPDATE_BUSINESSES_FAILURE,
      payload: error
    })
  }
}
