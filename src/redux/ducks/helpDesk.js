import { toast } from 'react-toastify'
import { Types as ModalTypes } from './modal'
import { list, create, update, remove } from '../../services/api/helpDesk'

// Action Types

export const Types = {
  GET_HELP_DESK_LOADING: 'GET_HELP_DESK_LOADING',
  GET_HELP_DESK_SUCCESS: 'GET_HELP_DESK_SUCCESS',
  GET_HELP_DESK_FAILURE: 'GET_HELP_DESK_FAILURE',
  CREATE_HELP_DESK_LOADING: 'CREATE_HELP_DESK_LOADING',
  CREATE_HELP_DESK_SUCCESS: 'CREATE_HELP_DESK_SUCCESS',
  CREATE_HELP_DESK_FAILURE: 'CREATE_HELP_DESK_FAILURE',
  UPDATE_HELP_DESK_LOADING: 'UPDATE_HELP_DESK_LOADING',
  UPDATE_HELP_DESK_SUCCESS: 'UPDATE_HELP_DESK_SUCCESS',
  UPDATE_HELP_DESK_FAILURE: 'UPDATE_HELP_DESK_FAILURE',
  REMOVE_HELP_DESK_LOADING: 'REMOVE_HELP_DESK_LOADING',
  REMOVE_HELP_DESK_SUCCESS: 'REMOVE_HELP_DESK_SUCCESS',
  REMOVE_HELP_DESK_FAILURE: 'REMOVE_HELP_DESK_FAILURE'
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
    case Types.GET_HELP_DESK_LOADING:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: true,
          error: null
        }
      }
    case Types.GET_HELP_DESK_SUCCESS:
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
    case Types.GET_HELP_DESK_FAILURE:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.CREATE_HELP_DESK_LOADING:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: action.payload,
          isCreated: false,
          error: null
        }
      }
    case Types.CREATE_HELP_DESK_SUCCESS:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: false,
          isCreated: true,
          error: null
        }
      }
    case Types.CREATE_HELP_DESK_FAILURE:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: false,
          isCreated: false,
          error: action.payload
        }
      }
    case Types.UPDATE_HELP_DESK_LOADING:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: action.payload,
          isUpdated: false,
          error: null
        }
      }
    case Types.UPDATE_HELP_DESK_SUCCESS:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: false,
          isUpdated: true,
          error: null
        }
      }
    case Types.UPDATE_HELP_DESK_FAILURE:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: false,
          isUpdated: false,
          error: action.payload
        }
      }
    case Types.REMOVE_HELP_DESK_LOADING:
      return {
        ...state,
        delete: {
          ...state.delete,
          isLoading: action.payload,
          isDeleted: false,
          error: null
        }
      }
    case Types.REMOVE_HELP_DESK_SUCCESS:
      return {
        ...state,
        delete: {
          ...state.delete,
          isLoading: false,
          isDeleted: true
        }
      }
    case Types.REMOVE_HELP_DESK_FAILURE:
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

export const getHelpDesk = (limit = 10, page = null) => async dispatch => {
  dispatch({
    type: Types.GET_HELP_DESK_LOADING
  })
  try {
    const helpDesk = await list(limit, page)
    dispatch({
      type: Types.GET_HELP_DESK_SUCCESS,
      payload: helpDesk
    })
  } catch (error) {
    dispatch({
      type: Types.GET_HELP_DESK_FAILURE,
      payload: error
    })
  }
}

export const createHelpDesk = helpDesk => async dispatch => {
  dispatch({
    type: Types.CREATE_HELP_DESK_LOADING,
    payload: true
  })
  try {
    const response = await create(helpDesk)
    dispatch({
      type: Types.CREATE_HELP_DESK_SUCCESS
    })
    dispatch({
      type: ModalTypes.MODAL_CLOSE
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.CREATE_HELP_DESK_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const updateHelpDesk = helpDesk => async dispatch => {
  dispatch({
    type: Types.UPDATE_HELP_DESK_LOADING,
    payload: true
  })
  try {
    const response = await update(helpDesk)
    dispatch({
      type: Types.UPDATE_HELP_DESK_SUCCESS
    })
    toast.success(response.message)
    dispatch({
      type: ModalTypes.MODAL_CLOSE
    })
  } catch (error) {
    dispatch({
      type: Types.UPDATE_HELP_DESK_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const removeHelpDesk = helpDesk => async dispatch => {
  dispatch({
    type: Types.REMOVE_HELP_DESK_LOADING,
    payload: true
  })
  try {
    const response = await remove(helpDesk)
    dispatch({
      type: Types.REMOVE_HELP_DESK_SUCCESS
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.REMOVE_HELP_DESK_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}
