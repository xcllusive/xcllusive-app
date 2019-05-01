import { login as loginApi, loginWithToken as loginWithTokenApi, logoutApi } from '../../services/api/auth'
import setAuthorizationHeader from '../../utils/setAuthorizationHeader'

// Action Types

export const Types = {
  AUTH_REQUEST: 'AUTH_REQUEST',
  AUTH_SUCCESS: 'AUTH_SUCCESS',
  AUTH_FAILURE: 'AUTH_FAILURE',
  AUTH_CLEAN_ERROR: 'AUTH_CLEAN_ERROR',
  AUTH_LOGOUT: 'AUTH_LOGOUT',
  AUTH_LOADING: 'AUTH_LOADING',
  AUTH_APP_LOADING: 'AUTH_APP_LOADING'
}

// Reducer

const initialState = {
  error: null,
  user: null,
  isAuthenticated: false,
  isAppLoading: true,
  isLoading: false
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case Types.AUTH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: {
          ...action.payload,
          userObj: action.payload,
          roles: JSON.parse(action.payload.roles)
        },
        error: null,
        isAuthenticated: true,
        isAppLoading: false
      }
    case Types.AUTH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        error: action.payload,
        isAppLoading: false
      }
    case Types.AUTH_CLEAN_ERROR:
      return {
        ...state,
        error: null
      }
    case Types.AUTH_LOGOUT:
      return {
        ...initialState,
        isAppLoading: false,
        error: action.payload
      }
    case Types.AUTH_APP_LOADING:
      return {
        ...state,
        isAppLoading: action.payload
      }
    case Types.AUTH_LOADING:
      return {
        ...state,
        isLoading: action.payload,
        error: null
      }
    default:
      return state
  }
}

// Action Creators

function loginError (error) {
  return {
    type: Types.AUTH_FAILURE,
    payload: error
  }
}

export const loginLoading = value => ({
  type: Types.AUTH_LOADING,
  payload: value
})

export const loginAppLoading = value => ({
  type: Types.AUTH_APP_LOADING,
  payload: value
})

export const loginSuccess = obj => ({
  type: Types.AUTH_SUCCESS,
  payload: obj
})

export const userLogout = error => ({
  type: Types.AUTH_LOGOUT,
  payload: error
})

export const login = (email, password) => async dispatch => {
  dispatch(loginLoading(true))
  try {
    const response = await loginApi(email, password)
    window.localStorage.xcllusiveJWT = response.accessToken
    setAuthorizationHeader(response.accessToken)
    dispatch(loginSuccess(response.user))
  } catch (error) {
    dispatch(loginError(error.message))
  }
}

export const loginWithToken = () => async dispatch => {
  try {
    const response = await loginWithTokenApi()
    dispatch(loginSuccess(response.user))
  } catch (error) {
    window.localStorage.removeItem('xcllusiveJWT')
    setAuthorizationHeader()
    dispatch(loginError(null))
  }
}

export const logout = (user, error = null) => async dispatch => {
  try {
    await logoutApi(user)
    window.localStorage.removeItem('xcllusiveJWT')
    setAuthorizationHeader()
    dispatch(userLogout(error))
  } catch (error) {
    dispatch(loginError(null))
  }
}
