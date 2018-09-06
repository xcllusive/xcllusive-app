import { toast } from 'react-toastify'
import { Types as ModalTypes } from './modal'
import {
  list,
  create,
  update,
  remove
} from '../../services/api/appraisalRegister'

// Action Types

export const Types = {
  GET_APPRAISAL_REGISTER_LOADING: 'GET_APPRAISAL_REGISTER_LOADING',
  GET_APPRAISAL_REGISTER_SUCCESS: 'GET_APPRAISAL_REGISTER_SUCCESS',
  GET_APPRAISAL_REGISTER_FAILURE: 'GET_APPRAISAL_REGISTER_FAILURE',
  CREATE_APPRAISAL_REGISTER_LOADING: 'CREATE_APPRAISAL_REGISTER_LOADING',
  CREATE_APPRAISAL_REGISTER_SUCCESS: 'CREATE_APPRAISAL_REGISTER_SUCCESS',
  CREATE_APPRAISAL_REGISTER_FAILURE: 'CREATE_APPRAISAL_REGISTER_FAILURE',
  UPDATE_APPRAISAL_REGISTER_LOADING: 'UPDATE_APPRAISAL_REGISTER_LOADING',
  UPDATE_APPRAISAL_REGISTER_SUCCESS: 'UPDATE_APPRAISAL_REGISTER_SUCCESS',
  UPDATE_APPRAISAL_REGISTER_FAILURE: 'UPDATE_APPRAISAL_REGISTER_FAILURE',
  REMOVE_APPRAISAL_REGISTER_LOADING: 'REMOVE_APPRAISAL_REGISTER_LOADING',
  REMOVE_APPRAISAL_REGISTER_SUCCESS: 'REMOVE_APPRAISAL_REGISTER_SUCCESS',
  REMOVE_APPRAISAL_REGISTER_FAILURE: 'REMOVE_APPRAISAL_REGISTER_FAILURE'
}

// Reducer

const initialState = {
  get: {
    financialInfoSource: {
      isLoading: true,
      array: [],
      error: null,
      pages: 0,
      activePage: 1
    },
    array: []
  },
  create: {
    isLoading: false,
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
    case Types.GET_APPRAISAL_REGISTER_LOADING:
      return {
        ...state,
        get: {
          ...state.get,
          [action.appraisalRegisterType]: {
            ...state.get[action.appraisalRegisterType],
            isLoading: true,
            error: null
          }
        }
      }
    case Types.GET_APPRAISAL_REGISTER_SUCCESS:
      return {
        ...state,
        get: {
          ...state.get,
          [action.appraisalRegisterType]: {
            ...state.get[action.appraisalRegisterType],
            isLoading: false,
            array: action.payload.data.rows,
            pages: action.payload.itemCount,
            error: null
          }
        }
      }
    case Types.GET_APPRAISAL_REGISTER_FAILURE:
      return {
        ...state,
        get: {
          ...state.get,
          [action.appraisalRegisterType]: {
            ...state.get[action.appraisalRegisterType],
            isLoading: false,
            error: action.payload
          }
        }
      }
    case Types.CREATE_APPRAISAL_REGISTER_LOADING:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.CREATE_APPRAISAL_REGISTER_SUCCESS:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: false,
          error: null
        },
        get: {
          ...state.get,
          [action.appraisalRegisterType]: {
            ...state.get[action.appraisalRegisterType],
            isLoading: false,
            error: action.payload,
            array: state.get[action.appraisalRegisterType].array.concat(
              action.payload
            )
          }
        }
      }
    case Types.CREATE_APPRAISAL_REGISTER_FAILURE:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: false,
          error: action.payload
        }
      }
    case Types.UPDATE_APPRAISAL_REGISTER_LOADING:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: action.payload,
          isUpdated: false,
          error: null
        }
      }
    case Types.UPDATE_APPRAISAL_REGISTER_SUCCESS:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: false,
          isUpdated: true,
          error: null
        }
      }
    case Types.UPDATE_APPRAISAL_REGISTER_FAILURE:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: false,
          isUpdated: false,
          error: action.payload
        }
      }
    case Types.REMOVE_APPRAISAL_REGISTER_LOADING:
      return {
        ...state,
        delete: {
          ...state.delete,
          isLoading: action.payload,
          isDeleted: false,
          error: null
        }
      }
    case Types.REMOVE_APPRAISAL_REGISTER_SUCCESS:
      return {
        ...state,
        delete: {
          ...state.delete,
          isLoading: false,
          isDeleted: true
        }
      }
    case Types.REMOVE_APPRAISAL_REGISTER_FAILURE:
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

export const listAppraisalRegister = (
  appraisalRegisterType,
  limit = null,
  page = null
) => async dispatch => {
  dispatch({
    type: Types.GET_APPRAISAL_REGISTER_LOADING
  })
  try {
    const appraisalRegister = await list(appraisalRegisterType, limit, page)
    dispatch({
      type: Types.GET_APPRAISAL_REGISTER_SUCCESS,
      appraisalRegisterType,
      payload: appraisalRegister
    })
  } catch (error) {
    dispatch({
      type: Types.GET_APPRAISAL_REGISTER_FAILURE,
      payload: error
    })
  }
}

export const createAppraisalRegister = appraisalRegister => async dispatch => {
  dispatch({
    type: Types.CREATE_APPRAISAL_REGISTER_LOADING,
    payload: true
  })
  try {
    const response = await create(appraisalRegister)
    dispatch({
      type: Types.CREATE_APPRAISAL_REGISTER_SUCCESS,
      payload: response.data,
      appraisalRegisterType: appraisalRegister.type
    })
    dispatch({
      type: ModalTypes.MODAL_CLOSE
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.CREATE_APPRAISAL_REGISTER_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const updateAppraisalRegister = appraisalRegister => async dispatch => {
  dispatch({
    type: Types.UPDATE_APPRAISAL_REGISTER_LOADING,
    payload: true
  })
  try {
    const response = await update(appraisalRegister)
    dispatch({
      type: Types.UPDATE_APPRAISAL_REGISTER_SUCCESS
    })
    toast.success(response.message)
    dispatch({
      type: ModalTypes.MODAL_CLOSE
    })
  } catch (error) {
    dispatch({
      type: Types.UPDATE_APPRAISAL_REGISTER_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const removeAppraisalRegister = appraisalRegister => async dispatch => {
  dispatch({
    type: Types.REMOVE_APPRAISAL_REGISTER_LOADING,
    payload: true
  })
  try {
    const response = await remove(appraisalRegister)
    dispatch({
      type: Types.REMOVE_APPRAISAL_REGISTER_SUCCESS
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.REMOVE_APPRAISAL_REGISTER_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}
