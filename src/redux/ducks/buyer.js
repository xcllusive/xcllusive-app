import { create, update, list } from '../../services/api/buyer'

// Action Types

export const Types = {
  CREATE_BUYER_LOADING: 'CREATE_BUYER_LOADING',
  CREATE_BUYER_SUCCESS: 'CREATE_BUYER_SUCCESS',
  CREATE_BUYER_FAILURE: 'CREATE_BUYER_FAILURE',
  LIST_BUYER_LOADING: 'LIST_BUYER_LOADING',
  LIST_BUYER_SUCCESS: 'LIST_BUYER_SUCCESS',
  LIST_BUYER_FAILURE: 'LIST_BUYER_FAILURE'
}

// Reducer

const initialState = {
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
  list: {
    array: [],
    isLoading: false,
    error: null
  }
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case Types.CREATE_BUYER_LOADING:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.CREATE_BUYER_SUCCESS:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: false,
          isCreated: true,
          error: null
        }
      }
    case Types.CREATE_BUYER_FAILURE:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: false,
          isCreated: false,
          error: action.payload
        }
      }
    case Types.UPDATE_BUYER_LOADING:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.UPDATE_BUYER_SUCCESS:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: false,
          isUpdated: true,
          error: null
        }
      }
    case Types.UPDATE_BUYER_FAILURE:
      return {
        ...state,
        update: {
          ...state.update,
          isLoading: false,
          isUpdated: false,
          error: action.payload
        }
      }
    case Types.LIST_BUYER_LOADING:
      return {
        ...state,
        list: {
          ...state.list,
          isLoading: action.payload,
          error: null
        }
      }
    case Types.LIST_BUYER_SUCCESS:
      return {
        ...state,
        list: {
          ...state.list,
          isLoading: false,
          array: action.payload,
          error: null
        }
      }
    case Types.LIST_BUYER_FAILURE:
      return {
        ...state,
        list: {
          ...state.list,
          isLoading: false,
          error: action.payload
        }
      }
    default:
      return state
  }
}

// Action Creators
export const buyerLoading = (value, type) => ({
  type: Types[type],
  payload: value
})

export const createBuyer = buyer => async dispatch => {
  dispatch({
    type: Types.CREATE_BUYER_LOADING,
    payload: true
  })
  try {
    await create(buyer)
    dispatch({
      type: Types.CREATE_BUYER_SUCCESS
    })
  } catch (error) {
    dispatch({
      type: Types.CREATE_BUYER_FAILURE,
      payload: error
    })
  }
}

export const updateBuyer = buyer => async dispatch => {
  dispatch({
    type: Types.UPDATE_BUYER_LOADING,
    payload: true
  })
  try {
    await update(buyer)
    dispatch({
      type: Types.UPDATE_BUYER_SUCCESS
    })
  } catch (error) {
    dispatch({
      type: Types.UPDATE_BUYER_FAILURE,
      payload: error
    })
  }
}

export const listBuyer = (search = false) => async dispatch => {
  dispatch({
    type: Types.LIST_BUYER_LOADING,
    payload: true
  })
  try {
    const buyers = await list(search)
    dispatch({
      type: Types.LIST_BUYER_SUCCESS,
      payload: buyers.data
    })
  } catch (error) {
    dispatch({
      type: Types.LIST_BUYER_FAILURE,
      payload: error
    })
  }
}
