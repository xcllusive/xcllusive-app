import { toast } from 'react-toastify'
import { Types as ModalTypes } from './modal'
import { list, create, update, remove } from '../../services/api/resource'

// Action Types

export const Types = {
  GET_RESOURCE_LOADING: 'GET_RESOURCE_LOADING',
  GET_RESOURCE_SUCCESS: 'GET_RESOURCE_SUCCESS',
  GET_RESOURCE_FAILURE: 'GET_RESOURCE_FAILURE',
  CREATE_RESOURCE_LOADING: 'CREATE_RESOURCE_LOADING',
  CREATE_RESOURCE_SUCCESS: 'CREATE_RESOURCE_SUCCESS',
  CREATE_RESOURCE_FAILURE: 'CREATE_RESOURCE_FAILURE',
  UPDATE_RESOURCE_LOADING: 'UPDATE_RESOURCE_LOADING',
  UPDATE_RESOURCE_SUCCESS: 'UPDATE_RESOURCE_SUCCESS',
  UPDATE_RESOURCE_FAILURE: 'UPDATE_RESOURCE_FAILURE',
  REMOVE_RESOURCE_LOADING: 'REMOVE_RESOURCE_LOADING',
  REMOVE_RESOURCE_SUCCESS: 'REMOVE_RESOURCE_SUCCESS',
  REMOVE_RESOURCE_FAILURE: 'REMOVE_RESOURCE_FAILURE'
}

// Reducer

const initialState = {
  get: {
    isLoading: true,
    array: [],
    error: null,
    pages: 0,
    activePage: 1
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
    case Types.GET_RESOURCE_LOADING:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: true,
          error: null
        }
      }
    case Types.GET_RESOURCE_SUCCESS:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: false,
          array: action.payload.data,
          error: null
        }
      }
    case Types.GET_RESOURCE_FAILURE:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.CREATE_RESOURCE_LOADING:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: action.payload,
          isCreated: false,
          error: null
        }
      }
    case Types.CREATE_RESOURCE_SUCCESS:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: false,
          isCreated: true,
          error: null
        }
      }
    case Types.CREATE_RESOURCE_FAILURE:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: false,
          isCreated: false,
          error: action.payload
        }
      }
    case Types.UPDATE_RESOURCE_LOADING:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: action.payload,
          isUpdated: false,
          error: null
        }
      }
    case Types.UPDATE_RESOURCE_SUCCESS:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: false,
          isUpdated: true,
          error: null
        }
      }
    case Types.UPDATE_RESOURCE_FAILURE:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: false,
          isUpdated: false,
          error: action.payload
        }
      }
    case Types.REMOVE_RESOURCE_LOADING:
      return {
        ...state,
        delete: {
          ...state.delete,
          isLoading: action.payload,
          isDeleted: false,
          error: null
        }
      }
    case Types.REMOVE_RESOURCE_SUCCESS:
      return {
        ...state,
        delete: {
          ...state.delete,
          isLoading: false,
          isDeleted: true
        }
      }
    case Types.REMOVE_RESOURCE_FAILURE:
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

export const getResource = () => async dispatch => {
  dispatch({
    type: Types.GET_RESOURCE_LOADING
  })
  try {
    const resource = await list()
    dispatch({
      type: Types.GET_RESOURCE_SUCCESS,
      payload: resource
    })
  } catch (error) {
    dispatch({
      type: Types.GET_RESOURCE_FAILURE,
      payload: error
    })
  }
}

export const createResource = resource => async dispatch => {
  dispatch({
    type: Types.CREATE_RESOURCE_LOADING,
    payload: true
  })
  try {
    const response = await create(resource)
    dispatch({
      type: Types.CREATE_RESOURCE_SUCCESS
    })
    dispatch({
      type: ModalTypes.MODAL_CLOSE
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.CREATE_RESOURCE_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const updateResource = resource => async dispatch => {
  dispatch({
    type: Types.UPDATE_RESOURCE_LOADING,
    payload: true
  })
  try {
    const response = await update(resource)
    dispatch({
      type: Types.UPDATE_RESOURCE_SUCCESS
    })
    toast.success(response.message)
    dispatch({
      type: ModalTypes.MODAL_CLOSE
    })
  } catch (error) {
    dispatch({
      type: Types.UPDATE_RESOURCE_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const removeResource = resource => async dispatch => {
  dispatch({
    type: Types.REMOVE_RESOURCE_LOADING,
    payload: true
  })
  try {
    const response = await remove(resource)
    dispatch({
      type: Types.REMOVE_RESOURCE_SUCCESS
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.REMOVE_RESOURCE_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}
