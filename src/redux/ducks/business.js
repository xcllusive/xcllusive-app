import { get, getAll, create, update,
  createBusinessSource as createBusinessSourceAPI,
  createBusinessRating as createBusinessRatingAPI,
  createBusinessProduct as createBusinessProductAPI,
  createBusinessIndustry as createBusinessIndustryAPI,
  createBusinessType as createBusinessTypeAPI,
  createBusinessOwnersTime as createBusinessOwnersTimeAPI } from '../../services/api/business'
import { toast } from 'react-toastify'

// Action Types

export const Types = {
  CREATE_BUSINESS_LOADING: 'CREATE_BUSINESS_LOADING',
  CREATE_BUSINESS_SUCCESS: 'CREATE_BUSINESS_SUCCESS',
  CREATE_BUSINESS_FAILURE: 'CREATE_BUSINESS_FAILURE',
  UPDATE_BUSINESS_LOADING: 'UPDATE_BUSINESS_LOADING',
  UPDATE_BUSINESS_SUCCESS: 'UPDATE_BUSINESS_SUCCESS',
  UPDATE_BUSINESS_FAILURE: 'UPDATE_BUSINESS_FAILURE',
  GET_BUSINESS_LOADING: 'GET_BUSINESS_LOADING',
  GET_BUSINESS_SUCCESS: 'GET_BUSINESS_SUCCESS',
  GET_BUSINESS_FAILURE: 'GET_BUSINESS_FAILURE',
  GET_BUSINESSES_LOADING: 'GET_BUSINESSES_LOADING',
  GET_BUSINESSES_SUCCESS: 'GET_BUSINESSES_SUCCESS',
  GET_BUSINESSES_FAILURE: 'GET_BUSINESSES_FAILURE',
  CREATE_BUSINESS_SOURCE_LOADING: 'CREATE_BUSINESS_SOURCE_LOADING',
  CREATE_BUSINESS_SOURCE_SUCCESS: 'CREATE_BUSINESS_SOURCE_SUCCESS',
  CREATE_BUSINESS_SOURCE_FAILURE: 'CREATE_BUSINESS_SOURCE_FAILURE',
  CREATE_BUSINESS_RATING_LOADING: 'CREATE_BUSINESS_RATING_LOADING',
  CREATE_BUSINESS_RATING_SUCCESS: 'CREATE_BUSINESS_RATING_SUCCESS',
  CREATE_BUSINESS_RATING_FAILURE: 'CREATE_BUSINESS_RATING_FAILURE',
  CREATE_BUSINESS_PRODUCT_LOADING: 'CREATE_BUSINESS_PRODUCT_LOADING',
  CREATE_BUSINESS_PRODUCT_SUCCESS: 'CREATE_BUSINESS_PRODUCT_SUCCESS',
  CREATE_BUSINESS_PRODUCT_FAILURE: 'CREATE_BUSINESS_PRODUCT_FAILURE',
  CREATE_BUSINESS_INDUSTRY_LOADING: 'CREATE_BUSINESS_INDUSTRY_LOADING',
  CREATE_BUSINESS_INDUSTRY_SUCCESS: 'CREATE_BUSINESS_INDUSTRY_SUCCESS',
  CREATE_BUSINESS_INDUSTRY_FAILURE: 'CREATE_BUSINESS_INDUSTRY_FAILURE',
  CREATE_BUSINESS_TYPE_LOADING: 'CREATE_BUSINESS_TYPE_LOADING',
  CREATE_BUSINESS_TYPE_SUCCESS: 'CREATE_BUSINESS_TYPE_SUCCESS',
  CREATE_BUSINESS_TYPE_FAILURE: 'CREATE_BUSINESS_TYPE_FAILURE',
  CREATE_BUSINESS_OWNERSTIME_LOADING: 'CREATE_BUSINESS_OWNERSTIME_LOADING',
  CREATE_BUSINESS_OWNERSTIME_SUCCESS: 'CREATE_BUSINESS_OWNERSTIME_SUCCESS',
  CREATE_BUSINESS_OWNERSTIME_FAILURE: 'CREATE_BUSINESS_OWNERSTIME_FAILURE'

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
          isUpdated: action.payload,
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
    type: Types.UPDATE_BUSINESS_LOADING,
    payload: true
  })
  try {
    const response = await update(business)
    dispatch({
      type: Types.UPDATE_BUSINESS_SUCCESS,
      payload: response.message
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.UPDATE_BUSINESS_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const createBusinessSource = businessSource => async dispatch => {
  dispatch({
    type: Types.CREATE_BUSINESS_SOURCE_LOADING,
    payload: true
  })
  try {
    await createBusinessSourceAPI(businessSource)
    dispatch({
      type: Types.CREATE_BUSINESS_SOURCE_SUCCESS
    })
  } catch (error) {
    dispatch({
      type: Types.CREATE_BUSINESS_SOURCE_FAILURE,
      payload: error
    })
  }
}

export const createBusinessRating = businessRating => async dispatch => {
  dispatch({
    type: Types.CREATE_BUSINESS_RATING_LOADING,
    payload: true
  })
  try {
    await createBusinessRatingAPI(businessRating)
    dispatch({
      type: Types.CREATE_BUSINESS_RATING_SUCCESS
    })
  } catch (error) {
    dispatch({
      type: Types.CREATE_BUSINESS_RATING_FAILURE,
      payload: error
    })
  }
}

export const createBusinessProduct = businessProduct => async dispatch => {
  dispatch({
    type: Types.CREATE_BUSINESS_PRODUCT_LOADING,
    payload: true
  })
  try {
    await createBusinessProductAPI(businessProduct)
    dispatch({
      type: Types.CREATE_BUSINESS_PRODUCT_SUCCESS
    })
  } catch (error) {
    dispatch({
      type: Types.CREATE_BUSINESS_PRODUCT_FAILURE,
      payload: error
    })
  }
}

export const createBusinessIndustry = businessIndustry => async dispatch => {
  dispatch({
    type: Types.CREATE_BUSINESS_INDUSTRY_LOADING,
    payload: true
  })
  try {
    await createBusinessIndustryAPI(businessIndustry)
    dispatch({
      type: Types.CREATE_BUSINESS_INDUSTRY_SUCCESS
    })
  } catch (error) {
    dispatch({
      type: Types.CREATE_BUSINESS_INDUSTRY_FAILURE,
      payload: error
    })
  }
}

export const createBusinessType = businessType => async dispatch => {
  dispatch({
    type: Types.CREATE_BUSINESS_TYPE_LOADING,
    payload: true
  })
  try {
    await createBusinessTypeAPI(businessType)
    dispatch({
      type: Types.CREATE_BUSINESS_TYPE_SUCCESS
    })
  } catch (error) {
    dispatch({
      type: Types.CREATE_BUSINESS_TYPE_FAILURE,
      payload: error
    })
  }
}

export const createBusinessOwnersTime = businessOwnersTime => async dispatch => {
  dispatch({
    type: Types.CREATE_BUSINESS_OWNERSTIME_LOADING,
    payload: true
  })
  try {
    await createBusinessOwnersTimeAPI(businessOwnersTime)
    dispatch({
      type: Types.CREATE_BUSINESS_TYPE_SUCCESS
    })
  } catch (error) {
    dispatch({
      type: Types.CREATE_BUSINESS_TYPE_FAILURE,
      payload: error
    })
  }
}
