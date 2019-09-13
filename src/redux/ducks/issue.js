import { toast } from 'react-toastify'
import { Types as ModalTypes } from './modal'
import { list, create, update, remove } from '../../services/api/issue'

// Action Types

export const Types = {
  GET_ISSUE_LOADING: 'GET_ISSUE_LOADING',
  GET_ISSUE_SUCCESS: 'GET_ISSUE_SUCCESS',
  GET_ISSUE_FAILURE: 'GET_ISSUE_FAILURE',
  CREATE_ISSUE_LOADING: 'CREATE_ISSUE_LOADING',
  CREATE_ISSUE_SUCCESS: 'CREATE_ISSUE_SUCCESS',
  CREATE_ISSUE_FAILURE: 'CREATE_ISSUE_FAILURE',
  UPDATE_ISSUE_LOADING: 'UPDATE_ISSUE_LOADING',
  UPDATE_ISSUE_SUCCESS: 'UPDATE_ISSUE_SUCCESS',
  UPDATE_ISSUE_FAILURE: 'UPDATE_ISSUE_FAILURE',
  REMOVE_ISSUE_LOADING: 'REMOVE_ISSUE_LOADING',
  REMOVE_ISSUE_SUCCESS: 'REMOVE_ISSUE_SUCCESS',
  REMOVE_ISSUE_FAILURE: 'REMOVE_ISSUE_FAILURE'
}

// Reducer

const initialState = {
  get: {
    isLoading: true,
    array: [],
    issuesAvailable: [],
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
    case Types.GET_ISSUE_LOADING:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: true,
          error: null
        }
      }
    case Types.GET_ISSUE_SUCCESS:
      return {
        ...state,
        get: {
          isLoading: false,
          array: action.payload.data ? action.payload.data.rows : action.payload.data,
          pages: action.payload.itemCount,
          issuesAvailable: action.payload.issuesAvailable,
          error: null
        }
      }
    case Types.GET_ISSUE_FAILURE:
      return {
        ...state,
        get: {
          isLoading: false,
          error: action.payload
        }
      }
    case Types.CREATE_ISSUE_LOADING:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: action.payload,
          isCreated: false,
          error: null
        }
      }
    case Types.CREATE_ISSUE_SUCCESS:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: false,
          isCreated: true,
          error: null
        }
      }
    case Types.CREATE_ISSUE_FAILURE:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: false,
          isCreated: false,
          error: action.payload
        }
      }
    case Types.UPDATE_ISSUE_LOADING:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: action.payload,
          isUpdated: false,
          error: null
        }
      }
    case Types.UPDATE_ISSUE_SUCCESS:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: false,
          isUpdated: true,
          error: null
        }
      }
    case Types.UPDATE_ISSUE_FAILURE:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: false,
          isUpdated: false,
          error: action.payload
        }
      }
    case Types.REMOVE_ISSUE_LOADING:
      return {
        ...state,
        delete: {
          ...state.delete,
          isLoading: action.payload,
          isDeleted: false,
          error: null
        }
      }
    case Types.REMOVE_ISSUE_SUCCESS:
      return {
        ...state,
        delete: {
          ...state.delete,
          isLoading: false,
          isDeleted: true
        }
      }
    case Types.REMOVE_ISSUE_FAILURE:
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

export const listIssue = (limit = 5, page = null, listIssue = false) => async dispatch => {
  dispatch({
    type: Types.GET_ISSUE_LOADING
  })
  try {
    const issue = await list(limit, page, listIssue)
    dispatch({
      type: Types.GET_ISSUE_SUCCESS,
      payload: issue
    })
  } catch (error) {
    dispatch({
      type: Types.GET_ISSUE_FAILURE,
      payload: error
    })
  }
}

export const createIssue = issue => async dispatch => {
  dispatch({
    type: Types.CREATE_ISSUE_LOADING,
    payload: true
  })
  try {
    const response = await create(issue)
    dispatch({
      type: Types.CREATE_ISSUE_SUCCESS
    })
    dispatch({
      type: ModalTypes.MODAL_CLOSE
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.CREATE_ISSUE_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const updateIssue = issue => async dispatch => {
  dispatch({
    type: Types.UPDATE_ISSUE_LOADING,
    payload: true
  })
  try {
    const response = await update(issue)
    dispatch({
      type: Types.UPDATE_ISSUE_SUCCESS
    })
    toast.success(response.message)
    dispatch({
      type: ModalTypes.MODAL_CLOSE
    })
  } catch (error) {
    dispatch({
      type: Types.UPDATE_ISSUE_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const removeIssue = issue => async dispatch => {
  dispatch({
    type: Types.REMOVE_ISSUE_LOADING,
    payload: true
  })
  try {
    const response = await remove(issue)
    dispatch({
      type: Types.REMOVE_ISSUE_SUCCESS
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.REMOVE_ISSUE_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}
