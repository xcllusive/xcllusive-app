import { getAll, create, update, getLogged } from '../../services/api/user'
import { toast } from 'react-toastify'

import { Types as TypesModal } from './modal'

// Action Types

export const Types = {
  GET_USER_LOADING: 'GET_USER_LOADING',
  GET_USER_SUCCESS: 'GET_USER_SUCCESS',
  GET_USER_FAILURE: 'GET_USER_FAILURE',
  CREATE_USER_LOADING: 'CREATE_USER_LOADING',
  CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
  CREATE_USER_FAILURE: 'CREATE_USER_FAILURE',
  UPDATE_USER_LOADING: 'UPDATE_USER_LOADING',
  UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
  UPDATE_USER_FAILURE: 'UPDATE_USER_FAILURE',
  GET_USER_LOGGED_LOADING: 'GET_USER_LOGGED_LOADING',
  GET_USER_LOGGED_SUCCESS: 'GET_USER_LOGGED_SUCCESS',
  GET_USER_LOGGED_FAILURE: 'GET_USER_LOGGED_FAILURE'
}

// Reducer

const initialState = {
  get: {
    isLoading: false,
    array: [],
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
  },
  getLogged: {
    isLoading: false,
    object: null,
    error: null
  }
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case Types.GET_USER_LOADING:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: action.payload
        }
      }
    case Types.GET_USER_SUCCESS:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: false,
          array: action.payload,
          error: null
        }
      }
    case Types.GET_USER_FAILURE:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.CREATE_USER_LOADING:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: action.payload,
          isCreated: false
        }
      }
    case Types.CREATE_USER_SUCCESS:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: false,
          isCreated: true,
          error: null
        },
        get: {
          ...state.get,
          array: state.get.array.concat(action.payload)
        }
      }
    case Types.CREATE_USER_FAILURE:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: false,
          isCreated: false,
          error: action.payload
        }
      }
    case Types.UPDATE_USER_LOADING:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: action.payload,
          isUpdated: false
        }
      }
    case Types.UPDATE_USER_SUCCESS:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: false,
          isUpdated: true
        }
      }
    case Types.UPDATE_USER_FAILURE:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: false,
          isUpdated: false,
          error: action.payload
        }
      }
    case Types.GET_USER_LOGGED_LOADING:
      return {
        ...state,
        getLogged: {
          ...state.getLogged,
          isLoading: action.payload,
          error: false
        }
      }
    case Types.GET_USER_LOGGED_SUCCESS:
      return {
        ...state,
        getLogged: {
          ...state.getLogged,
          isLoading: false,
          object: action.payload,
          error: null
        }
      }
    case Types.GET_USER_LOGGED_FAILURE:
      return {
        ...state,
        getLogged: {
          ...state.getLogged,
          isLoading: false,
          error: action.payload
        }
      }
    default:
      return state
  }
}

// Action Creators

export const userLoading = (value, type) => {
  return {
    type: Types[type],
    payload: value
  }
}

export const createUser = user => async dispatch => {
  dispatch(userLoading(true, 'CREATE_USER_LOADING'))
  try {
    const resUser = await create(user)
    dispatch({ type: Types.CREATE_USER_SUCCESS, payload: resUser.data })
    dispatch({ type: TypesModal.MODAL_CLOSE })
    toast.success(resUser.message)
  } catch (error) {
    dispatch({
      type: Types.CREATE_USER_FAILURE,
      payload: error.message
    })
    toast.error(error.message)
  }
}

export const updateUser = user => async dispatch => {
  dispatch({
    type: Types.UPDATE_USER_LOADING,
    payload: true
  })
  try {
    await update(user)
    dispatch({ type: Types.UPDATE_USER_SUCCESS })
    dispatch({ type: TypesModal.MODAL_CLOSE })
    toast.success('User updated with success')
  } catch (error) {
    dispatch({
      type: Types.UPDATE_USER_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const getUsers = (options = false, search = false) => async dispatch => {
  dispatch(userLoading(true, 'GET_USER_LOADING'))
  try {
    const users = await getAll(options, search)
    dispatch({
      type: Types.GET_USER_SUCCESS,
      payload: users
    })
  } catch (error) {
    dispatch({
      type: Types.GET_USER_FAILURE,
      payload: error
    })
  }
}

export const getUserLogged = (id = false) => async dispatch => {
  dispatch({
    type: Types.GET_USER_LOGGED_LOADING,
    payload: true
  })
  try {
    const user = await getLogged(id)
    dispatch({
      type: Types.GET_USER_LOGGED_SUCCESS,
      payload: user.data
    })
  } catch (error) {
    dispatch({
      type: Types.GET_USER_LOGGED_FAILURE,
      payload: error
    })
  }
}
