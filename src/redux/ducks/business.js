import { get, getAll, create, update,
  createBusinessRegister as createBusinessRegisterAPI,
  reassignBusiness as reassignBusinessAPI,
  getBusinessRegister as getBusinessRegisterAPI
} from '../../services/api/business'
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
  CREATE_BUSINESS_REGISTER_LOADING: 'CREATE_BUSINESS_REGISTER_LOADING',
  CREATE_BUSINESS_REGISTER_SUCCESS: 'CREATE_BUSINESS_REGISTER_SUCCESS',
  CREATE_BUSINESS_REGISTER_FAILURE: 'CREATE_BUSINESS_REGISTER_FAILURE',
  CREATE_REASSIGN_BUSINESS_LOADING: 'CREATE_REASSIGN_BUSINESS_LOADING',
  CREATE_REASSIGN_BUSINESS_SUCCESS: 'CREATE_REASSIGN_BUSINESS_SUCCESS',
  CREATE_REASSIGN_BUSINESS_FAILURE: 'CREATE_REASSIGN_BUSINESS_FAILURE',
  GET_BUSINESS_REGISTER_LOADING: 'GET_BUSINESS_REGISTER_LOADING',
  GET_BUSINESS_REGISTER_SUCCESS: 'GET_BUSINESS_REGISTER_SUCCESS',
  GET_BUSINESS_REGISTER_FAILURE: 'GET_BUSINESS_REGISTER_FAILURE'

}

// Reducer

const initialState = {
  getAll: {
    isLoading: false,
    array: [],
    error: null
  },
  get: {
    isLoading: false,
    object: {},
    sourceOptions: [],
    industryOptions: [],
    error: null
  },
  create: {
    isLoading: false,
    isCreated: false,
    error: null
  },
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
        create: {
          ...state.create,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.CREATE_BUSINESS_SUCCESS:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: false,
          isCreated: true,
          error: null
        }
      }
    case Types.CREATE_BUSINESS_FAILURE:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: false,
          isCreated: false,
          error: action.payload
        }
      }
    case Types.GET_BUSINESSES_LOADING:
      return {
        ...state,
        getAll: {
          ...state.getAll,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.GET_BUSINESSES_SUCCESS:
      return {
        ...state,
        getAll: {
          ...state.getAll,
          isLoading: false,
          array: action.payload,
          error: null
        }
      }
    case Types.GET_BUSINESSES_FAILURE:
      return {
        ...state,
        getAll: {
          ...state.getAll,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.GET_BUSINESS_LOADING:
      return {
        ...state,
        get: {
          ...state.get,
          object: {},
          isLoading: action.payload,
          error: null
        }
      }
    case Types.GET_BUSINESS_SUCCESS:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: false,
          object: action.payload.business,
          sourceOptions: action.payload.sourceList,
          industryOptions: action.payload.industryList,
          error: null
        }
      }
    case Types.GET_BUSINESS_FAILURE:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.UPDATE_BUSINESS_LOADING:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: action.payload,
          error: null
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
    toast.error(error)
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
    toast.error(error)
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

export const createBusinessRegister = businessRegister => async dispatch => {
  dispatch({
    type: Types.CREATE_BUSINESS_REGISTER_LOADING,
    payload: true
  })
  try {
    await createBusinessRegisterAPI(businessRegister)
    dispatch({
      type: Types.CREATE_BUSINESS_REGISTER_SUCCESS
    })
  } catch (error) {
    dispatch({
      type: Types.CREATE_BUSINESS_REGISTER_FAILURE,
      payload: error
    })
  }
}

export const reassignBusiness = reassignBusiness => async dispatch => {
  dispatch({
    type: Types.CREATE_REASSIGN_BUSINESS_LOADING,
    payload: true
  })
  try {
    await reassignBusinessAPI(reassignBusiness)
    dispatch({
      type: Types.CREATE_REASSIGN_BUSINESS_SUCCESS
    })
  } catch (error) {
    dispatch({
      type: Types.CREATE_REASSIGN_BUSINESS_FAILURE,
      payload: error
    })
  }
}

export const getBusinessRegister = id => async dispatch => {
  dispatch({
    type: Types.GET_BUSINESS_REGISTER_LOADING,
    payload: true
  })
  try {
    const business = await getBusinessRegisterAPI(id)
    dispatch({
      type: Types.GET_BUSINESS_REGISTER_SUCCESS,
      payload: business
    })
  } catch (error) {
    dispatch({
      type: Types.GET_BUSINESS_REGISTER_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}
