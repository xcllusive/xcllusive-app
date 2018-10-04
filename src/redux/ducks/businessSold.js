import { create, get, update, finalise, getAll } from '../../services/api/businessSold'
import { getBuyersFromBusiness } from '../../services/api/business'
import { toast } from 'react-toastify'

// Action Types

export const Types = {
  CREATE_BUSINESS_SOLD_LOADING: 'CREATE_BUSINESS_SOLD_LOADING',
  CREATE_BUSINESS_SOLD_SUCCESS: 'CREATE_BUSINESS_SOLD_SUCCESS',
  CREATE_BUSINESS_SOLD_FAILURE: 'CREATE_BUSINESS_SOLD_FAILURE',
  GET_BUSINESS_SOLD_LOADING: 'GET_BUSINESS_SOLD_LOADING',
  GET_BUSINESS_SOLD_SUCCESS: 'GET_BUSINESS_SOLD_SUCCESS',
  GET_BUSINESS_SOLD_FAILURE: 'GET_BUSINESS_SOLD_FAILURE',
  UPDATE_BUSINESS_SOLD_LOADING: 'UPDATE_BUSINESS_SOLD_LOADING',
  UPDATE_BUSINESS_SOLD_SUCCESS: 'UPDATE_BUSINESS_SOLD_SUCCESS',
  UPDATE_BUSINESS_SOLD_FAILURE: 'UPDATE_BUSINESS_SOLD_FAILURE',
  FINALISE_BUSINESS_SOLD_LOADING: 'FINALISE_BUSINESS_SOLD_LOADING',
  FINALISE_BUSINESS_SOLD_SUCCESS: 'FINALISE_BUSINESS_SOLD_SUCCESS',
  FINALISE_BUSINESS_SOLD_FAILURE: 'FINALISE_BUSINESS_SOLD_FAILURE',
  GET_BUYERS_BUSINESS_SOLD_LOADING: 'GET_BUYERS_BUSINESS_SOLD_LOADING',
  GET_BUYERS_BUSINESS_SOLD_SUCCESS: 'GET_BUYERS_BUSINESS_SOLD_SUCCESS',
  GET_BUYERS_BUSINESS_SOLD_FAILURE: 'GET_BUYERS_BUSINESS_SOLD_FAILURE',
  GET_BUSINESSES_SOLD_LOADING: 'GET_BUSINESSES_SOLD_LOADING',
  GET_BUSINESSES_SOLD_SUCCESS: 'GET_BUSINESSES_SOLD_SUCCESS',
  GET_BUSINESSES_SOLD_FAILURE: 'GET_BUSINESSES_SOLD_FAILURE'
}

// Reducer

const initialState = {
  create: {
    isLoading: false,
    isCreated: false,
    error: null,
    object: null
  },
  get: {
    object: {},
    isLoading: false,
    error: null
  },
  updateSold: {
    isLoading: false,
    isUpdated: false,
    error: null
  },
  finaliseSold: {
    isLoading: false,
    isUpdated: false,
    error: null
  },
  getBuyersBusiness: {
    array: [],
    isLoading: false,
    error: null
  },
  getAll: {
    isLoading: true,
    array: [],
    error: null
  }
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case Types.CREATE_BUSINESS_SOLD_LOADING:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: action.payload,
          error: null,
          object: null
        }
      }
    case Types.CREATE_BUSINESS_SOLD_SUCCESS:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: false,
          isCreated: true,
          error: null,
          object: action.payload
        }
      }
    case Types.CREATE_BUSINESS_SOLD_FAILURE:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: false,
          isCreated: false,
          error: action.payload
        }
      }
    case Types.GET_BUSINESS_SOLD_LOADING:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: true,
          error: null
        }
      }
    case Types.GET_BUSINESS_SOLD_SUCCESS:
      return {
        ...state,
        get: {
          ...state.get,
          object: action.payload,
          isLoading: false,
          error: null
        }
      }
    case Types.GET_BUSINESS_SOLD_FAILURE:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.UPDATE_BUSINESS_SOLD_LOADING:
      return {
        ...state,
        updateSold: {
          ...state.updateSold,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.UPDATE_BUSINESS_SOLD_SUCCESS:
      return {
        ...state,
        updateSold: {
          ...state.updateStatus,
          isLoading: false,
          isUpdated: action.payload,
          error: null
        }
      }
    case Types.UPDATE_BUSINESS_SOLD_FAILURE:
      return {
        ...state,
        updateSold: {
          ...state.updateSold,
          isLoading: false,
          isUpdated: false,
          error: action.payload
        }
      }
    case Types.FINALISE_BUSINESS_SOLD_LOADING:
      return {
        ...state,
        finaliseSold: {
          ...state.finaliseSold,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.FINALISE_BUSINESS_SOLD_SUCCESS:
      return {
        ...state,
        finaliseSold: {
          ...state.finaliseSold,
          isLoading: false,
          isUpdated: action.payload,
          error: null
        }
      }
    case Types.FINALISE_BUSINESS_SOLD_FAILURE:
      return {
        ...state,
        finaliseSold: {
          ...state.finaliseSold,
          isLoading: false,
          isUpdated: false,
          error: action.payload
        }
      }
    case Types.GET_BUYERS_BUSINESS_SOLD_LOADING:
      return {
        ...state,
        getBuyersBusiness: {
          ...state.getBuyersBusiness,
          array: [],
          isLoading: true
        }
      }
    case Types.GET_BUYERS_BUSINESS_SOLD_SUCCESS:
      return {
        ...state,
        getBuyersBusiness: {
          ...state.getBuyersBusiness,
          array: action.payload,
          isLoading: false
        }
      }
    case Types.GET_BUYERS_BUSINESS_SOLD_FAILURE:
      return {
        ...state,
        getBuyersBusiness: {
          ...state.getBuyersBusiness,
          array: [],
          isLoading: false,
          error: action.payload
        }
      }
    case Types.GET_BUSINESSES_SOLD_LOADING:
      return {
        ...state,
        getAll: {
          ...state.getAll,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.GET_BUSINESSES_SOLD_SUCCESS:
      return {
        ...state,
        getAll: {
          ...state.getAll,
          isLoading: false,
          array: action.payload.data.rows,
          error: null
        }
      }
    case Types.GET_BUSINESSES_SOLD_FAILURE:
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

export const createBusinessSold = businessSold => async dispatch => {
  dispatch({
    type: Types.CREATE_BUSINESS_SOLD_LOADING,
    payload: true
  })
  try {
    const response = await create(businessSold)
    dispatch({
      type: Types.CREATE_BUSINESS_SOLD_SUCCESS,
      payload: response.data
    })
  } catch (error) {
    dispatch({
      type: Types.CREATE_BUSINESS_SOLD_FAILURE,
      payload: error
    })
  }
}

export const getBusinessSold = businessId => async dispatch => {
  dispatch({
    type: Types.GET_BUSINESS_SOLD_LOADING,
    payload: true
  })
  try {
    const businessSold = await get(businessId)
    dispatch({
      type: Types.GET_BUSINESS_SOLD_SUCCESS,
      payload: businessSold
    })
  } catch (error) {
    dispatch({
      type: Types.GET_BUSINESS_SOLD_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const updateBusinessSold = businessSold => async dispatch => {
  dispatch({
    type: Types.UPDATE_BUSINESS_SOLD_LOADING,
    payload: true
  })
  try {
    await update(businessSold)
    dispatch({
      type: Types.UPDATE_BUSINESS_SOLD_SUCCESS
    })
  } catch (error) {
    dispatch({
      type: Types.UPDATE_BUSINESS_SOLD_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const finaliseStageSold = (businessSoldId, businessId) => async dispatch => {
  const onSuccess = response => {
    dispatch({
      type: Types.FINALISE_BUSINESS_SOLD_SUCCESS
    })
    toast.success(response.message)
    return response
  }
  const onError = error => {
    dispatch({
      type: Types.FINALISE_BUSINESS_SOLD_FAILURE,
      payload: error
    })
    return error
  }

  dispatch({
    type: Types.FINALISE_BUSINESS_SOLD_LOADING,
    payload: true
  })

  try {
    const response = await finalise(businessSoldId, businessId)
    return onSuccess(response)
  } catch (error) {
    return onError(error)
  }
}

export const getBuyersBusinessSold = (businessId, showAll) => async dispatch => {
  dispatch({
    type: Types.GET_BUYERS_BUSINESS_SOLD_LOADING,
    payload: true
  })
  try {
    const businessSold = await getBuyersFromBusiness(businessId, showAll)
    dispatch({
      type: Types.GET_BUYERS_BUSINESS_SOLD_SUCCESS,
      payload: businessSold.data.array
    })
  } catch (error) {
    dispatch({
      type: Types.GET_BUYERS_BUSINESS_SOLD_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const getBusinessesSold = objectValues => async dispatch => {
  dispatch({
    type: Types.GET_BUSINESSES_SOLD_LOADING,
    payload: true
  })
  try {
    const businessesSold = await getAll(objectValues)
    dispatch({
      type: Types.GET_BUSINESSES_SOLD_SUCCESS,
      payload: businessesSold
    })
  } catch (error) {
    dispatch({
      type: Types.GET_BUSINESSES_SOLD_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}
