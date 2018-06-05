import {
  get, update
} from '../../services/api/systemSettings'
//  import { toast } from 'react-toastify'

// Action Types

export const Types = {
  GET_SYSTEM_SETTINGS_LOADING: 'GET_SYSTEM_SETTINGS_LOADING',
  GET_SYSTEM_SETTINGS_SUCCESS: 'GET_SYSTEM_SETTINGS_SUCCESS',
  GET_SYSTEM_SETTINGS_FAILURE: 'GET_SYSTEM_SETTINGS_FAILURE',
  UPDATE_SYSTEM_SETTINGS_LOADING: 'UPDATE_SYSTEM_SETTINGS_LOADING',
  UPDATE_SYSTEM_SETTINGS_SUCCESS: 'UPDATE_SYSTEM_SETTINGS_SUCCESS',
  UPDATE_SYSTEM_SETTINGS_FAILURE: 'UPDATE_SYSTEM_SETTINGS_FAILURE'
}

// Reducer

const initialState = {
  get: {
    array: [],
    isLoading: false,
    error: null
  },
  update: {
    isLoading: false,
    isUpdated: false,
    error: null,
    systemSettings: {}
  }
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case Types.GET_SYSTEM_SETTINGS_LOADING:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: true
        }
      }
    case Types.GET_SYSTEM_SETTINGS_SUCCESS:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: false,
          array: action.payload
        }
      }
    case Types.GET_SYSTEM_SETTINGS_FAILURE:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.UPDATE_SYSTEM_SETTINGS_LOADING:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: action.payload,
          isUpdated: false,
          error: null
        }
      }
    case Types.UPDATE_SYSTEM_SETTINGS_SUCCESS:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: false,
          isUpdated: true,
          error: null,
          systemSettings: action.payload
        }
      }
    case Types.UPDATE_SYSTEM_SETTINGS_FAILURE:
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

export const getSystemSettings = id => async dispatch => {
  dispatch({
    type: Types.GET_SYSTEM_SETTINGS_LOADING,
    payload: true
  })
  try {
    const systemSettings = await get(id)
    dispatch({
      type: Types.GET_SYSTEM_SETTINGS_SUCCESS,
      payload: systemSettings.data
    })
  } catch (error) {
    dispatch({
      type: Types.GET_SYSTEM_SETTINGS_FAILURE,
      payload: error
    })
  }
}

export const updateSystemSettings = systemSettings => async dispatch => {
  dispatch({
    type: Types.UPDATE_SYSTEM_SETTINGS_LOADING,
    payload: true
  })
  try {
    await update(systemSettings)
    dispatch({
      type: Types.UPDATE_SYSTEM_SETTINGS_SUCCESS,
      payload: systemSettings
    })
  } catch (error) {
    dispatch({
      type: Types.UPDATE_SYSTEM_SETTINGS_FAILURE,
      payload: error
    })
  }
}
