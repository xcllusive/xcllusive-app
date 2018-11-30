import { toast } from 'react-toastify'
import { Types as ModalTypes } from './modal'
import { list, create, update, remove } from '../../services/api/buyerRegister'

// Action Types

export const Types = {
  BUYER_REGISTER_SOURCE: 'BUYER_REGISTER_SOURCE',
  GET_BUYER_REGISTER_LOADING: 'GET_BUYER_REGISTER_LOADING',
  GET_BUYER_REGISTER_SUCCESS: 'GET_BUYER_REGISTER_SUCCESS',
  GET_BUYER_REGISTER_FAILURE: 'GET_BUYER_REGISTER_FAILURE',
  CREATE_BUYER_REGISTER_LOADING: 'CREATE_BUYER_REGISTER_LOADING',
  CREATE_BUYER_REGISTER_SUCCESS: 'CREATE_BUYER_REGISTER_SUCCESS',
  CREATE_BUYER_REGISTER_FAILURE: 'CREATE_BUYER_REGISTER_FAILURE',
  UPDATE_BUYER_REGISTER_LOADING: 'UPDATE_BUYER_REGISTER_LOADING',
  UPDATE_BUYER_REGISTER_SUCCESS: 'UPDATE_BUYER_REGISTER_SUCCESS',
  UPDATE_BUYER_REGISTER_FAILURE: 'UPDATE_BUYER_REGISTER_FAILURE',
  REMOVE_BUYER_REGISTER_LOADING: 'REMOVE_BUYER_REGISTER_LOADING',
  REMOVE_BUYER_REGISTER_SUCCESS: 'REMOVE_BUYER_REGISTER_SUCCESS',
  REMOVE_BUYER_REGISTER_FAILURE: 'REMOVE_BUYER_REGISTER_FAILURE'
}

const TypesBuyerRegister = {
  1: 'type'
}

// Reducer

const initialState = {
  get: {
    type: {
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
    case Types.GET_BUYER_REGISTER_LOADING:
      return {
        ...state,
        get: {
          ...state.get,
          [action.typeBuyerRegister]: {
            ...state.get[action.typeBuyerRegister],
            isLoading: true,
            error: null
          }
        }
      }
    case Types.GET_BUYER_REGISTER_SUCCESS:
      return {
        ...state,
        get: {
          ...state.get,
          [action.typeBuyerRegister]: {
            ...state.get[action.typeBuyerRegister],
            isLoading: false,
            array: action.payload.data.rows,
            pages: action.payload.itemCount,
            error: null
          }
        }
      }
    case Types.GET_BUYER_REGISTER_FAILURE:
      return {
        ...state,
        get: {
          ...state.get,
          [action.typeBuyerRegister]: {
            ...state.get[action.typeBuyerRegister],
            isLoading: false,
            error: action.payload
          }
        }
      }
    case Types.CREATE_BUYER_REGISTER_LOADING:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: action.payload,
          isCreated: false,
          error: null
        }
      }
    case Types.CREATE_BUYER_REGISTER_SUCCESS:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: false,
          isCreated: true,
          error: null
        }
      }
    case Types.CREATE_BUYER_REGISTER_FAILURE:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: false,
          isCreated: false,
          error: action.payload
        }
      }
    case Types.UPDATE_BUYER_REGISTER_LOADING:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: action.payload,
          isUpdated: false,
          error: null
        }
      }
    case Types.UPDATE_BUYER_REGISTER_SUCCESS:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: false,
          isUpdated: true,
          error: null
        }
      }
    case Types.UPDATE_BUYER_REGISTER_FAILURE:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: false,
          isUpdated: false,
          error: action.payload
        }
      }
    case Types.REMOVE_BUYER_REGISTER_LOADING:
      return {
        ...state,
        delete: {
          ...state.delete,
          isLoading: action.payload,
          isDeleted: false,
          error: null
        }
      }
    case Types.REMOVE_BUYER_REGISTER_SUCCESS:
      return {
        ...state,
        delete: {
          ...state.delete,
          isLoading: false,
          isDeleted: true
        }
      }
    case Types.REMOVE_BUYER_REGISTER_FAILURE:
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

export const getBuyerRegister = (buyerRegisterType, limit = 50, page = null) => async dispatch => {
  dispatch({
    type: Types.GET_BUYER_REGISTER_LOADING
  })
  try {
    const buyerRegister = await list(buyerRegisterType, limit, page)
    dispatch({
      type: Types.GET_BUYER_REGISTER_SUCCESS,
      typeBuyerRegister: TypesBuyerRegister[buyerRegisterType],
      payload: buyerRegister
    })
  } catch (error) {
    dispatch({
      type: Types.GET_BUYER_REGISTER_FAILURE,
      payload: error
    })
  }
}

export const createBuyerRegister = buyerRegister => async dispatch => {
  dispatch({
    type: Types.CREATE_BUYER_REGISTER_LOADING,
    payload: true
  })
  try {
    const response = await create(buyerRegister)
    dispatch({
      type: Types.CREATE_BUYER_REGISTER_SUCCESS
    })
    dispatch({
      type: ModalTypes.MODAL_CLOSE
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.CREATE_BUYER_REGISTER_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const updateBuyerRegister = buyerRegister => async dispatch => {
  dispatch({
    type: Types.UPDATE_BUYER_REGISTER_LOADING,
    payload: true
  })
  try {
    const response = await update(buyerRegister)
    dispatch({
      type: Types.UPDATE_BUYER_REGISTER_SUCCESS
    })
    toast.success(response.message)
    dispatch({
      type: ModalTypes.MODAL_CLOSE
    })
  } catch (error) {
    dispatch({
      type: Types.UPDATE_BUYER_REGISTER_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}

export const removeBuyerRegister = buyerRegister => async dispatch => {
  dispatch({
    type: Types.REMOVE_BUYER_REGISTER_LOADING,
    payload: true
  })
  try {
    const response = await remove(buyerRegister)
    dispatch({
      type: Types.REMOVE_BUYER_REGISTER_SUCCESS
    })
    toast.success(response.message)
  } catch (error) {
    dispatch({
      type: Types.REMOVE_BUYER_REGISTER_FAILURE,
      payload: error
    })
    toast.error(error)
  }
}
