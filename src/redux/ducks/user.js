import {
  getAll,
  create
} from '../../services/api/user'

// Action Types

export const Types = {
  GET_USER_LOADING: 'GET_USER_LOADING',
  GET_USER_SUCCESS: 'GET_USER_SUCCESS',
  GET_USER_FAILURE: 'GET_USER_FAILURE',
  CREATE_USER_LOADING: 'CREATE_USER_LOADING',
  CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS'
}

// Reducer

const initialState = {
  error: null,
  isLoading: false,
  users: []
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case Types.GET_USER_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }
    case Types.GET_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: action.payload,
        error: null
      }
    case Types.GET_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    case Types.CREATE_USER_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }
    case Types.CREATE_USER_SUCCESS:
      return {
        ...state,
        userCreated: true,
        isLoading: false,
        error: null
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

const userResponse = array => {
  return {
    type: Types.GET_USER_SUCCESS,
    payload: array
  }
}

const userError = value => {
  return {
    type: Types.GET_USER_FAILURE,
    payload: value
  }
}

export const createUser = user => async dispatch => {
  dispatch(userLoading(true, 'CREATE_USER_LOADING'))
  try {
    await create(user)
    dispatch({type: Types.CREATE_USER_SUCCESS})
  } catch (error) {
    dispatch(userError(error))
  }
}

export const getUsers = (options = false, search = false) => async dispatch => {
  dispatch(userLoading(true, 'GET_USER_LOADING'))
  try {
    const users = await getAll(options, search)
    dispatch(userResponse(users))
  } catch (error) {
    dispatch(userError(error))
  }
}
