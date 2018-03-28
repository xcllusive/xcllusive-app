import { toast } from 'react-toastify'
import { Types as ModalTypes } from './modal'
import { get, create, update, remove } from '../../services/api/businessRegister'

// Action Types

export const Types = {
  GET_BUSINESS_REGISTER_LOADING: 'GET_BUSINESS_REGISTER_LOADING',
  GET_BUSINESS_REGISTER_SUCCESS: 'GET_BUSINESS_REGISTER_SUCCESS',
  GET_BUSINESS_REGISTER_FAILURE: 'GET_BUSINESS_REGISTER_FAILURE',
  CREATE_BUSINESS_REGISTER_LOADING: 'CREATE_BUSINESS_REGISTER_LOADING',
  CREATE_BUSINESS_REGISTER_SUCCESS: 'CREATE_BUSINESS_REGISTER_SUCCESS',
  CREATE_BUSINESS_REGISTER_FAILURE: 'CREATE_BUSINESS_REGISTER_FAILURE',
  UPDATE_BUSINESS_REGISTER_LOADING: 'UPDATE_BUSINESS_REGISTER_LOADING',
  UPDATE_BUSINESS_REGISTER_SUCCESS: 'UPDATE_BUSINESS_REGISTER_SUCCESS',
  UPDATE_BUSINESS_REGISTER_FAILURE: 'UPDATE_BUSINESS_REGISTER_FAILURE',
  REMOVE_BUSINESS_REGISTER_LOADING: 'REMOVE_BUSINESS_REGISTER_LOADING',
  REMOVE_BUSINESS_REGISTER_SUCCESS: 'REMOVE_BUSINESS_REGISTER_SUCCESS',
  REMOVE_BUSINESS_REGISTER_FAILURE: 'REMOVE_BUSINESS_REGISTER_FAILURE'
}

// Reducer

const initialState = {
  get: {
    source: {
      isLoading: true,
      array: [],
      error: null
    }
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
  },
  delete: {
    isLoading: false,
    isDeleted: false,
    error: null
  }
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case Types.GET_BUSINESS_REGISTER_LOADING:
      return {
        ...state,
        get: {
          ...state.get,
          source: {
            ...state.get.source,
            isLoading: true,
            error: null
          }
        }
      }
    case Types.GET_BUSINESS_REGISTER_SUCCESS:
      return {
        ...state,
        get: {
          ...state.get,
          source: {
            ...state.get.source,
            isLoading: false,
            array: action.payload
          }
        }
      }
    case Types.GET_BUSINESS_REGISTER_FAILURE:
      return {
        ...state,
        get: {
          ...state.get,
          source: {
            ...state.get.source,
            isLoading: false,
            error: action.payload
          }
        }
      }
    case Types.CREATE_BUSINESS_REGISTER_LOADING:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: action.payload,
          isCreated: false,
          error: null
        }
      }
    case Types.CREATE_BUSINESS_REGISTER_SUCCESS:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: false,
          isCreated: true,
          error: null
        }
      }
    case Types.CREATE_BUSINESS_REGISTER_FAILURE:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: false,
          isCreated: false,
          error: action.payload
        }
      }
    case Types.UPDATE_BUSINESS_REGISTER_LOADING:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: action.payload,
          isUpdated: false,
          error: null
        }
      }
    case Types.UPDATE_BUSINESS_REGISTER_SUCCESS:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: false,
          isUpdated: true,
          error: null
        }
      }
    case Types.UPDATE_BUSINESS_REGISTER_FAILURE:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: false,
          isUpdated: false,
          error: action.payload
        }
      }
    case Types.REMOVE_BUSINESS_REGISTER_LOADING:
      return {
        ...state,
        delete: {
          ...state.delete,
          isLoading: action.payload,
          isDeleted: false,
          error: null
        }
      }
    case Types.REMOVE_BUSINESS_REGISTER_SUCCESS:
      return {
        ...state,
        delete: {
          ...state.delete,
          isLoading: false,
          isDeleted: true
        }
      }
    case Types.REMOVE_BUSINESS_REGISTER_FAILURE:
      return {
        ...state,
        delete: {
          ...state.delete,
          isLoading: false,
          error: action.payload
        }
      }
    default:
      return state
  }
}

// Action Creators

export const getBusinessRegister = id => async dispatch => {
  dispatch({
    type: Types.GET_BUSINESS_REGISTER_LOADING
  })
  try {
    const businessRegister = await get(id)
    dispatch({
      type: Types.GET_BUSINESS_REGISTER_SUCCESS,
      payload: businessRegister
    })
  } catch (error) {
    dispatch({
      type: Types.GET_BUSINESS_REGISTER_FAILURE,
      payload: error
    })
  }
}

export const createBusinessRegister = businessRegister => async dispatch => {
  dispatch({
    type: Types.CREATE_BUSINESS_REGISTER_LOADING,
    payload: true
  })
  try {
    const response = await create(businessRegister)
    dispatch({
      type: Types.CREATE_BUSINESS_REGISTER_SUCCESS
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.CREATE_BUSINESS_REGISTER_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const updateBusinessRegister = businessRegister => async dispatch => {
  dispatch({
    type: Types.UPDATE_BUSINESS_REGISTER_LOADING,
    payload: true
  })
  try {
    const response = await update(businessRegister)
    dispatch({
      type: Types.UPDATE_BUSINESS_REGISTER_SUCCESS
    })
    toast.success(response.message)
    dispatch({
      type: ModalTypes.MODAL_CLOSE
    })
  } catch (error) {
    dispatch({
      type: Types.UPDATE_BUSINESS_REGISTER_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const removeBusinessRegister = businessRegister => async dispatch => {
  dispatch({
    type: Types.REMOVE_BUSINESS_REGISTER_LOADING,
    payload: true
  })
  try {
    const response = await remove(businessRegister)
    dispatch({
      type: Types.REMOVE_BUSINESS_REGISTER_SUCCESS
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.REMOVE_BUSINESS_REGISTER_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}
