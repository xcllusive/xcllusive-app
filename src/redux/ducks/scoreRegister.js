import { toast } from 'react-toastify'
import { Types as ModalTypes } from './modal'
import { get, create, update, remove } from '../../services/api/scoreRegister'

// Action Types

export const Types = {
  // BUSINESS_REGISTER_SOURCE: 'BUSINESS_REGISTER_SOURCE',
  GET_SCORE_REGISTER_LOADING: 'GET_SCORE_REGISTER_LOADING',
  GET_SCORE_REGISTER_SUCCESS: 'GET_SCORE_REGISTER_SUCCESS',
  GET_SCORE_REGISTER_FAILURE: 'GET_SCORE_REGISTER_FAILURE',
  CREATE_SCORE_REGISTER_LOADING: 'CREATE_SCORE_REGISTER_LOADING',
  CREATE_SCORE_REGISTER_SUCCESS: 'CREATE_SCORE_REGISTER_SUCCESS',
  CREATE_SCORE_REGISTER_FAILURE: 'CREATE_SCORE_REGISTER_FAILURE',
  UPDATE_SCORE_REGISTER_LOADING: 'UPDATE_SCORE_REGISTER_LOADING',
  UPDATE_SCORE_REGISTER_SUCCESS: 'UPDATE_SCORE_REGISTER_SUCCESS',
  UPDATE_SCORE_REGISTER_FAILURE: 'UPDATE_SCORE_REGISTER_FAILURE',
  REMOVE_SCORE_REGISTER_LOADING: 'REMOVE_SCORE_REGISTER_LOADING',
  REMOVE_SCORE_REGISTER_SUCCESS: 'REMOVE_SCORE_REGISTER_SUCCESS',
  REMOVE_SCORE_REGISTER_FAILURE: 'REMOVE_SCORE_REGISTER_FAILURE'
}

const TypesScoreRegister = {
  1: 'Perceived Price from Buyers',
  2: 'Information / Transparency / Momentum',
  3: 'Current Interest',
  4: 'Buyer Perceived Risk'
}

// Reducer

const initialState = {
  get: {
    perceivedPrice: {
      isLoading: true,
      array: [],
      error: null,
      pages: 0,
      activePage: 1
    },
    infoTransMomen: {
      isLoading: true,
      array: [],
      error: null,
      pages: 0,
      activePage: 1
    },
    currentInterest: {
      isLoading: true,
      array: [],
      error: null,
      pages: 0,
      activePage: 1
    },
    perceivedRisk: {
      isLoading: true,
      array: [],
      error: null,
      pages: 0,
      activePage: 1
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
    case Types.GET_SCORE_REGISTER_LOADING:
      return {
        ...state,
        get: {
          ...state.get,
          [action.TypesScoreRegister]: {
            ...state.get[action.TypesScoreRegister],
            isLoading: true,
            error: null
          }
        }
      }
    case Types.GET_SCORE_REGISTER_SUCCESS:
      return {
        ...state,
        get: {
          ...state.get,
          [action.TypesScoreRegister]: {
            ...state.get[action.TypesScoreRegister],
            isLoading: false,
            array: action.payload.data.rows,
            pages: action.payload.itemCount,
            error: null
          }
        }
      }
    case Types.GET_SCORE_REGISTER_FAILURE:
      return {
        ...state,
        get: {
          ...state.get,
          [action.TypesScoreRegister]: {
            ...state.get[action.TypesScoreRegister],
            isLoading: false,
            error: action.payload
          }
        }
      }
    case Types.CREATE_SCORE_REGISTER_LOADING:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: action.payload,
          isCreated: false,
          error: null
        }
      }
    case Types.CREATE_SCORE_REGISTER_SUCCESS:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: false,
          isCreated: true,
          error: null
        }
      }
    case Types.CREATE_SCORE_REGISTER_FAILURE:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: false,
          isCreated: false,
          error: action.payload
        }
      }
    case Types.UPDATE_SCORE_REGISTER_LOADING:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: action.payload,
          isUpdated: false,
          error: null
        }
      }
    case Types.UPDATE_SCORE_REGISTER_SUCCESS:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: false,
          isUpdated: true,
          error: null
        }
      }
    case Types.UPDATE_SCORE_REGISTER_FAILURE:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: false,
          isUpdated: false,
          error: action.payload
        }
      }
    case Types.REMOVE_SCORE_REGISTER_LOADING:
      return {
        ...state,
        delete: {
          ...state.delete,
          isLoading: action.payload,
          isDeleted: false,
          error: null
        }
      }
    case Types.REMOVE_SCORE_REGISTER_SUCCESS:
      return {
        ...state,
        delete: {
          ...state.delete,
          isLoading: false,
          isDeleted: true
        }
      }
    case Types.REMOVE_SCORE_REGISTER_FAILURE:
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

export const getScoreRegister = (
  scoreRegisterType,
  limit = 5,
  page = null
) => async dispatch => {
  dispatch({
    type: Types.GET_SCORE_REGISTER_LOADING
  })
  try {
    const scoreRegister = await get(scoreRegisterType, limit, page)
    dispatch({
      type: Types.GET_SCORE_REGISTER_SUCCESS,
      typeScoreRegister: TypesScoreRegister[scoreRegisterType],
      payload: scoreRegister
    })
  } catch (error) {
    dispatch({
      type: Types.GET_SCORE_REGISTER_FAILURE,
      payload: error
    })
  }
}

export const createScoreRegister = scoreRegister => async dispatch => {
  dispatch({
    type: Types.CREATE_SCORE_REGISTER_LOADING,
    payload: true
  })
  try {
    const response = await create(scoreRegister)
    dispatch({
      type: Types.CREATE_SCORE_REGISTER_SUCCESS
    })
    dispatch({
      type: ModalTypes.MODAL_CLOSE
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

export const updateScoreRegister = scoreRegister => async dispatch => {
  dispatch({
    type: Types.UPDATE_SCORE_REGISTER_LOADING,
    payload: true
  })
  try {
    const response = await update(scoreRegister)
    dispatch({
      type: Types.UPDATE_SCORE_REGISTER_SUCCESS
    })
    toast.success(response.message)
    dispatch({
      type: ModalTypes.MODAL_CLOSE
    })
  } catch (error) {
    dispatch({
      type: Types.UPDATE_SCORE_REGISTER_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const removeScoreRegister = scoreRegister => async dispatch => {
  dispatch({
    type: Types.REMOVE_SCORE_REGISTER_LOADING,
    payload: true
  })
  try {
    const response = await remove(scoreRegister)
    dispatch({
      type: Types.REMOVE_SCORE_REGISTER_SUCCESS
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.REMOVE_SCORE_REGISTER_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}
