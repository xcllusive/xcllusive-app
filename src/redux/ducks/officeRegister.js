import { toast } from 'react-toastify'
import { Types as ModalTypes } from './modal'
import { list, create, update, remove } from '../../services/api/officeRegister'

// Action Types

export const Types = {
  OFFICE_REGISTER_SOURCE: 'OFFICE_REGISTER_SOURCE',
  GET_OFFICE_REGISTER_LOADING: 'GET_OFFICE_REGISTER_LOADING',
  GET_OFFICE_REGISTER_SUCCESS: 'GET_OFFICE_REGISTER_SUCCESS',
  GET_OFFICE_REGISTER_FAILURE: 'GET_OFFICE_REGISTER_FAILURE',
  CREATE_OFFICE_REGISTER_LOADING: 'CREATE_OFFICE_REGISTER_LOADING',
  CREATE_OFFICE_REGISTER_SUCCESS: 'CREATE_OFFICE_REGISTER_SUCCESS',
  CREATE_OFFICE_REGISTER_FAILURE: 'CREATE_OFFICE_REGISTER_FAILURE',
  UPDATE_OFFICE_REGISTER_LOADING: 'UPDATE_OFFICE_REGISTER_LOADING',
  UPDATE_OFFICE_REGISTER_SUCCESS: 'UPDATE_OFFICE_REGISTER_SUCCESS',
  UPDATE_OFFICE_REGISTER_FAILURE: 'UPDATE_OFFICE_REGISTER_FAILURE',
  REMOVE_OFFICE_REGISTER_LOADING: 'REMOVE_OFFICE_REGISTER_LOADING',
  REMOVE_OFFICE_REGISTER_SUCCESS: 'REMOVE_OFFICE_REGISTER_SUCCESS',
  REMOVE_OFFICE_REGISTER_FAILURE: 'REMOVE_OFFICE_REGISTER_FAILURE'
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
    case Types.GET_OFFICE_REGISTER_LOADING:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: true,
          error: null
        }
      }
    case Types.GET_OFFICE_REGISTER_SUCCESS:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: false,
          array: action.payload.data.rows,
          pages: action.payload.itemCount,
          error: null
        }
      }
    case Types.GET_OFFICE_REGISTER_FAILURE:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.CREATE_OFFICE_REGISTER_LOADING:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: action.payload,
          isCreated: false,
          error: null
        }
      }
    case Types.CREATE_OFFICE_REGISTER_SUCCESS:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: false,
          isCreated: true,
          error: null
        }
      }
    case Types.CREATE_OFFICE_REGISTER_FAILURE:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: false,
          isCreated: false,
          error: action.payload
        }
      }
    case Types.UPDATE_OFFICE_REGISTER_LOADING:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: action.payload,
          isUpdated: false,
          error: null
        }
      }
    case Types.UPDATE_OFFICE_REGISTER_SUCCESS:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: false,
          isUpdated: true,
          error: null
        }
      }
    case Types.UPDATE_OFFICE_REGISTER_FAILURE:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: false,
          isUpdated: false,
          error: action.payload
        }
      }
    case Types.REMOVE_OFFICE_REGISTER_LOADING:
      return {
        ...state,
        delete: {
          ...state.delete,
          isLoading: action.payload,
          isDeleted: false,
          error: null
        }
      }
    case Types.REMOVE_OFFICE_REGISTER_SUCCESS:
      return {
        ...state,
        delete: {
          ...state.delete,
          isLoading: false,
          isDeleted: true
        }
      }
    case Types.REMOVE_OFFICE_REGISTER_FAILURE:
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

export const getOfficeRegister = (limit = 10, page = null) => async dispatch => {
  dispatch({
    type: Types.GET_OFFICE_REGISTER_LOADING
  })
  try {
    const officeRegister = await list(limit, page)
    dispatch({
      type: Types.GET_OFFICE_REGISTER_SUCCESS,
      payload: officeRegister
    })
  } catch (error) {
    dispatch({
      type: Types.GET_OFFICE_REGISTER_FAILURE,
      payload: error
    })
  }
}

export const createOfficeRegister = officeRegister => async dispatch => {
  dispatch({
    type: Types.CREATE_OFFICE_REGISTER_LOADING,
    payload: true
  })
  try {
    const response = await create(officeRegister)
    dispatch({
      type: Types.CREATE_OFFICE_REGISTER_SUCCESS
    })
    dispatch({
      type: ModalTypes.MODAL_CLOSE
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.CREATE_OFFICE_REGISTER_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const updateOfficeRegister = officeRegister => async dispatch => {
  dispatch({
    type: Types.UPDATE_OFFICE_REGISTER_LOADING,
    payload: true
  })
  try {
    const response = await update(officeRegister)
    dispatch({
      type: Types.UPDATE_OFFICE_REGISTER_SUCCESS
    })
    toast.success(response.message)
    dispatch({
      type: ModalTypes.MODAL_CLOSE
    })
  } catch (error) {
    dispatch({
      type: Types.UPDATE_OFFICE_REGISTER_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const removeOfficeRegister = officeRegister => async dispatch => {
  dispatch({
    type: Types.REMOVE_OFFICE_REGISTER_LOADING,
    payload: true
  })
  try {
    const response = await remove(officeRegister)
    dispatch({
      type: Types.REMOVE_OFFICE_REGISTER_SUCCESS
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.REMOVE_OFFICE_REGISTER_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}
